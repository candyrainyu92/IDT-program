/** Native WebGL paper tear. No dependencies or global styles. */
export async function createPaperTear(container, config={}) {
 if(!(container instanceof HTMLElement))throw new TypeError('PaperTear: container must be an HTMLElement');
 const options={image:new URL('./torn.jpg',import.meta.url).href,color:'#1D2440',background:'#2b2b2b',edgeOpacity:.9,start:1,end:.12,maxDpr:2,mode:'scroll',...config};
 const clamp=x=>Math.max(0,Math.min(1,x));
 const parseColor=s=>{if(!/^#[0-9a-f]{6}$/i.test(s))throw new TypeError('Use #RRGGBB colors');return [1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255)};
 const color=parseColor(options.color),background=parseColor(options.background);
 if(!(options.start>options.end)||!Number.isFinite(options.start)||!Number.isFinite(options.end))throw new RangeError('start must be greater than end');
 if(!['scroll','manual'].includes(options.mode))throw new TypeError('mode must be scroll or manual');
 if(!Number.isFinite(options.edgeOpacity)||options.edgeOpacity<0||options.edgeOpacity>1)throw new RangeError('edgeOpacity must be 0–1');
 if(!Number.isFinite(options.maxDpr)||options.maxDpr<=0)throw new RangeError('maxDpr must be positive');
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.style.cssText='display:block;width:100%;height:100%;pointer-events:none';container.append(canvas);
 const gl=canvas.getContext('webgl',{antialias:true,alpha:false});
 if(!gl){canvas.remove();throw new Error('PaperTear: WebGL unavailable');}
 let destroyed=false,lost=false,raf=0,visible=true,ro,io;
 const shaders=[],textures=[],cleanups=[];
 function listen(el,name,handler){el.addEventListener(name,handler,{passive:true});cleanups.push(()=>el.removeEventListener(name,handler));}
 function destroy(){if(destroyed)return;destroyed=true;cancelAnimationFrame(raf);ro?.disconnect();io?.disconnect();cleanups.forEach(fn=>fn());textures.forEach(t=>gl.deleteTexture(t));shaders.forEach(t=>gl.deleteShader(t));gl.getExtension('WEBGL_lose_context')?.loseContext();canvas.remove();}
 function fail(message){throw new Error('PaperTear: '+message)}
 try {
const vs=`precision highp float; precision highp int; attribute vec2 aUV; uniform sampler2D uEdge; uniform float uProgress,uMouse,uAspect,uSlope,uRatio; uniform int uPass; varying vec2 vUV; varying vec3 vNormal; varying float vHeight;
void main(){vUV=aUV;float edge=texture2D(uEdge,vec2(aUV.x,0.5)).r;float y=mix(edge,2.5,aUV.y);float x=aUV.x;float z=0.;vec3 n=vec3(0.,0.,1.);if(uPass==0){y=aUV.y*2.5;vUV.y=y;}else{float p=uProgress;float front=1.04-p*1.7;float r=(0.052+0.028*sin(p*3.14159))*(1.+uMouse*.08);// Work in image-space distances so the fold follows the actual diagonal seam.
float ratio=uRatio;
vec2 dir=normalize(vec2(1.0,uSlope));
float fx=clamp(front,0.0,1.0);
float fy=texture2D(uEdge,vec2(fx,0.5)).r*ratio+(front-fx)*uSlope;
vec2 anchor=vec2(front,fy);
vec2 q=vec2(x,y*ratio);
float d=max(dot(q-anchor,dir),0.0);
float theta=min(d/r,3.14159);
if(d>0.0){float bent=r*sin(theta);z=r*(1.0-cos(theta));
if(d>r*3.14159){float tail=d-r*3.14159;float lift=0.25+0.65*p;bent-=tail*cos(lift);z+=tail*sin(lift);}
q+=dir*(bent-d);
x=q.x;y=q.y/ratio;
n=vec3(dir.x*sin(theta),-dir.y*sin(theta),cos(theta));}
y+=z*.08;}

vNormal=n;vHeight=z;float sx=1.0;float sy=uAspect/(1.0/uRatio);if(sy>1.){sx=1./sy;sy=1.;}vec2 pos=vec2((x*2.-1.)*sx,(1.-y*2.)*sy);if(uPass==2){pos.x+=z*.12*sx;pos.y-=z*.40*sy;}gl_Position=vec4(pos, uPass==0?0.95:0.5-z*.5,1.);}`;
const fs=`precision highp float; precision highp int;uniform sampler2D uImage,uEdge;uniform int uPass;uniform float uProgress,uSlope,uRatio,uEdgeOpacity;uniform vec3 uColor,uBackground;varying vec2 vUV;varying vec3 vNormal;varying float vHeight;
void main(){if(uPass==0){vec4 tex=texture2D(uImage,vUV);vec3 blue=uColor;if(tex.b>tex.r*1.25 && tex.r<0.3)tex.rgb=blue;else if(max(max(tex.r,tex.g),tex.b)<.4)tex.rgb=uBackground;float front=1.04-uProgress*1.7;float ratio=uRatio;float fx=clamp(front,0.,1.);float fy=texture2D(uEdge,vec2(fx,.5)).r*ratio+(front-fx)*uSlope;float along=dot(vec2(vUV.x,vUV.y*ratio)-vec2(front,fy),normalize(vec2(1.,uSlope)));float reveal=smoothstep(0.,0.008,along);gl_FragColor=vec4(mix(blue,tex.rgb,reveal),1.);return;}if(uPass==2){gl_FragColor=vec4(0.,0.,0.,.22*exp(-vHeight*3.)*smoothstep(0.0,0.025,vHeight));return;}vec3 n=normalize(vNormal);float light=.56+.44*abs(dot(n,normalize(vec3(-.5,-.3,1.))));vec3 navy=uColor;vec3 back=vec3(1.0);vec3 c=gl_FrontFacing?navy*mix(1.0,.8+.2*light,smoothstep(0.0,0.025,vHeight)):back*light;// The moving edge uses the same source coordinates as the stationary torn band.
// The fold itself mirrors these coordinates on the visible back face.
vec2 bounds=texture2D(uEdge,vec2(vUV.x,.5)).rg;
float sourceY=mix(bounds.x,2.5,vUV.y);
float band=(1.-smoothstep(bounds.y-.003,bounds.y+.003,sourceY))*smoothstep(0.,.018,vHeight);
vec3 fibers=texture2D(uImage,vec2(vUV.x,clamp(sourceY,bounds.x+.002,bounds.y-.002))).rgb;
float grain=dot(fibers,vec3(.299,.587,.114));
vec3 thinWhite=vec3(.78+.22*grain)*light;
c=mix(c,thinWhite,band);
float alpha=mix(1.,uEdgeOpacity,band);
gl_FragColor=vec4(c,alpha);}`;
function shader(t,s){const o=gl.createShader(t);shaders.push(o);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))fail(gl.getShaderInfoLog(o));return o}const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))fail(gl.getProgramInfoLog(program));gl.useProgram(program);
const uniforms={};for(const n of ['uImage','uEdge','uProgress','uMouse','uAspect','uPass','uSlope','uRatio','uColor','uBackground','uEdgeOpacity'])uniforms[n]=gl.getUniformLocation(program,n);const attr=gl.getAttribLocation(program,'aUV');
const cols=240,rows=56,vertices=[],indices=[];for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++)vertices.push(i/cols,j/rows);for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){let a=j*(cols+1)+i,b=a+cols+1;indices.push(a,b,a+1,a+1,b,b+1)}const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
function texture(unit,source){gl.activeTexture(gl.TEXTURE0+unit);let t=gl.createTexture();textures.push(t);gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t}
let p=0,target=0,mouse=0,mx=0,prev=0,mode=options.mode,ratio=.4376,seamRight=.10;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function syncProgress(){if(mode!=='scroll')return;const rect=container.getBoundingClientRect();const ih=Math.min(rect.height,rect.width*ratio);const y=rect.top+(rect.height-ih)/2+ih*seamRight;target=clamp((innerHeight*options.start-y)/(innerHeight*(options.start-options.end)));}
function resize(){if(destroyed)return;const rect=container.getBoundingClientRect(),d=Math.min(devicePixelRatio,options.maxDpr);canvas.width=Math.max(1,Math.round(rect.width*d));canvas.height=Math.max(1,Math.round(rect.height*d));gl.viewport(0,0,canvas.width,canvas.height);gl.uniform1f(uniforms.uAspect,rect.width/Math.max(1,rect.height));syncProgress();}
const image=new Image();image.crossOrigin='anonymous';
await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('PaperTear: image failed to load: '+options.image));image.src=options.image;});
if(destroyed)throw new Error('PaperTear: initialization cancelled');
ratio=image.height/image.width;
gl.uniform1f(uniforms.uRatio,ratio);gl.uniform3fv(uniforms.uColor,color);gl.uniform3fv(uniforms.uBackground,background);gl.uniform1f(uniforms.uEdgeOpacity,options.edgeOpacity);
{let c=document.createElement('canvas');c.width=image.width;c.height=image.height;let cx=c.getContext('2d',{willReadFrequently:true});cx.drawImage(image,0,0);let data=cx.getImageData(0,0,c.width,c.height).data;const tops=[],bottoms=[];for(let x=0;x<c.width;x++){let top=-1,bottom=-1;for(let y=0;y<c.height;y++){let k=(y*c.width+x)*4;if(data[k]>105&&data[k+1]>105&&data[k+2]>105){if(top<0)top=y;bottom=y}}tops.push(top<0?c.height*.5:top);bottoms.push(bottom<0?c.height*.55:bottom)}
// Fit the seam direction from all sampled edge points, in physical image coordinates.
let sxSum=0,sySum=0,sxx=0,sxy=0;for(let i=0;i<tops.length;i++){let x=i/(tops.length-1),y= tops[i]/c.width;sxSum+=x;sySum+=y;sxx+=x*x;sxy+=x*y;}let count=tops.length;gl.uniform1f(uniforms.uSlope,(count*sxy-sxSum*sySum)/(count*sxx-sxSum*sxSum));
// Extract the actual irregular silhouette and paper fibers from the supplied JPG.
const ec=document.createElement('canvas');ec.width=c.width;ec.height=1;let ex=ec.getContext('2d'),ed=ex.createImageData(c.width,1);for(let x=0;x<c.width;x++){let v=tops[x]/c.height*255;ed.data.set([v,bottoms[x]/c.height*255,v,255],x*4)}ex.putImageData(ed,0,0);
texture(0,image);texture(2,ec);gl.uniform1i(uniforms.uImage,0);gl.uniform1i(uniforms.uEdge,2);seamRight=tops[tops.length-1]/c.height;resize();}
function frame(t){if(destroyed||lost)return;raf=requestAnimationFrame(frame);syncProgress();if(!visible)return;let dt=Math.min((t-prev)/1000,.04);prev=t;p+=(target-p)*(reduced?1:1-Math.exp(-dt*11));mouse+=(mx-mouse)*.08;gl.clearColor(...color,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform1f(uniforms.uProgress,p);gl.uniform1f(uniforms.uMouse,mouse);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.uniform1i(uniforms.uPass,0);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);if(p<.999){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.uniform1i(uniforms.uPass,2);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.enable(gl.DEPTH_TEST);gl.uniform1i(uniforms.uPass,1);gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0)}if(options.onProgress)options.onProgress(p)}

listen(window,'resize',resize);
listen(window,'scroll',syncProgress);
listen(container,'pointermove',e=>{const r=container.getBoundingClientRect();mx=clamp((e.clientX-r.left)/Math.max(1,r.width))*2-1;});
listen(container,'pointerleave',()=>{mx=0;});
const onLost=e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);options.onError?.(new Error('WebGL context lost; destroy and recreate the component.'));};
canvas.addEventListener('webglcontextlost',onLost);cleanups.push(()=>canvas.removeEventListener('webglcontextlost',onLost));
ro=new ResizeObserver(resize);ro.observe(container);
io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});io.observe(container);
cleanups.push(()=>{gl.deleteBuffer(vb);gl.deleteBuffer(ib);gl.deleteProgram(program);});
raf=requestAnimationFrame(frame);
return {destroy,refresh:resize,getProgress:()=>p,setProgress(value){if(!Number.isFinite(value))throw new TypeError('progress must be finite');mode='manual';target=clamp(value);},useScroll(){mode='scroll';syncProgress();}};
 } catch(error){destroy();throw error;}
}
