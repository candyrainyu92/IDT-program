/**
 * Click-to-open Interactive 3D Notebook Component.
 * Shadow DOM encapsulates local styles and 3D geometry.
 */
const template = document.createElement('template');
template.innerHTML = `<style>
:host {
  color-scheme: dark;
  --bg: transparent;
  --paper: #fff;
  --w: min(290px, 24vw, 44vh);
  --text-color: #691B1F;
  display: block;
  font-family: Arial, "PingFang SC", sans-serif;
  color: #e9e5db;
  width: 100%;
  position: relative;
  z-index: 10;
  transition: all 0.7s cubic-bezier(0.25, 1, 0.4, 1);
}
:host([is-open]) {
  --w: min(390px, 34vw, 52vh);
  z-index: 50;
}
* {
  box-sizing: border-box;
}
.sequence {
  height: 58vh;
  min-height: 440px;
  max-height: 600px;
  position: relative;
  width: 100%;
  overflow: visible;
  transition: height 0.7s cubic-bezier(0.25, 1, 0.4, 1);
}
:host([is-open]) .sequence {
  height: 75vh;
  min-height: 560px;
  max-height: 800px;
}
.viewport {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: visible;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene {
  position: absolute;
  inset: 0;
  perspective: 2200px;
  perspective-origin: 50% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.book {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--w);
  aspect-ratio: 1196/1522;
  transform-style: preserve-3d;
  will-change: transform;
  transform: translate(-50%, -50%) rotateZ(-2.5deg) scale(1);
  transition: transform 1.25s cubic-bezier(0.25, 1, 0.4, 1);
  cursor: pointer;
  opacity: 1;
}
.book.is-open {
  transform: translate(0%, -50%) rotateZ(0deg) scale(1.16);
}
.base, .leaf, .cover, .face {
  position: absolute;
  inset: 0;
  border-radius: 2px 9px 9px 2px;
  transform-style: preserve-3d;
}
.base {
  background: #d7c477;
  transform: translateZ(-5px);
  box-shadow: 2px 4px 0 #b2a574, 5px 8px 0 #1e1e1e, 12px 24px 35px #0005;
}
.leaf {
  inset: 2px 3px 4px 1px;
  background: linear-gradient(90deg, #d7d5d0 0%, #f6f5f2 4%, #fff 14%, #fff 95%, #efeeeb);
  box-shadow: 1px 2px 0 #d7d6d0, 2px 4px 0 #f0eee8, 3px 6px 0 #bdbbb4;
  transform: translateZ(-1px);
}
.leaf:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 1px #aaa5;
}
.cover {
  transform-origin: 0 50%;
  transform: rotateY(0deg);
  will-change: transform;
  transition: transform 1.25s cubic-bezier(0.25, 1, 0.4, 1);
}
.book.is-open .cover {
  transform: rotateY(-178deg);
}
.face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}
.front {
  background-size: 121.906% 108.804%;
  background-position: 60.305% 43.284%;
  background-repeat: no-repeat;
  transform: translateZ(1px);
  box-shadow: inset -2px 0 3px #9e885033, 0 0 1px #e0cc91;
}
.front:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #65542a33, transparent 7%, transparent 88%, #fff1);
  opacity: 0;
  transition: opacity 1.25s cubic-bezier(0.25, 1, 0.4, 1);
}
.book.is-open .front:after {
  opacity: 0.65;
}
.back {
  background: linear-gradient(90deg, #fff 80%, #f7f6f2 95%, #dedbd2);
  transform: rotateY(180deg) translateZ(1px);
  border-radius: 9px 2px 2px 9px;
  box-shadow: inset 0 0 1px #d6d2c5, 0 10px 25px #0002;
}
.rings {
  position: absolute;
  inset: 0;
  transform: translateZ(7px);
  pointer-events: none;
  transform-style: preserve-3d;
}
.ring {
  position: absolute;
  left: -4.7%;
  width: 9%;
  height: 1.55%;
  border-radius: 50%;
  border: 2px solid #9b916b;
  background: linear-gradient(180deg, #fff8, transparent 30%, #342e2170 60%, #d6cba76b);
  box-shadow: 0 2px 2px #0007, inset 0 1px 1px #f1e4ba;
  transform: translateZ(3px);
}
.ring:after {
  content: "";
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
  height: 100%;
  border-radius: 50%;
  background: #524b37;
  box-shadow: 1px 0 1px #ffedb9;
}
.cover-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20% 12% 14% 18%;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
}
.cover-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cover-title {
  color: var(--text-color, #691B1F);
  font-family: Impact, 'Arial Black', sans-serif;
  font-size: clamp(22px, 3.8vw, 44px);
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  transition: transform 0.25s ease, opacity 0.25s ease;
  display: inline-block;
}
.cover-title:hover {
  transform: scale(1.04);
  opacity: 0.85;
}
.cover-hint {
  color: var(--text-color, #691B1F);
  opacity: 0.75;
  font-family: monospace, sans-serif;
  font-size: clamp(10px, 1.2vw, 13px);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 8px;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.cover-title:hover + .cover-hint,
.cover-hint:hover {
  opacity: 1;
  transform: translateX(3px);
}
.cover-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.cover-author {
  color: var(--text-color, #691B1F);
  font-family: Impact, 'Arial Black', 'PingFang SC', sans-serif;
  font-size: clamp(14px, 2.2vw, 24px);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.leaf-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 13% 11% 10% 15%;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
}
.leaf-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.leaf-tag {
  color: var(--text-color, #691B1F);
  opacity: 0.9;
  font-family: monospace;
  font-size: clamp(8px, 1vw, 11px);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.leaf-title {
  color: var(--text-color, #691B1F);
  font-family: Impact, 'Arial Black', sans-serif;
  font-size: clamp(16px, 2.6vw, 32px);
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  transition: transform 0.25s ease, opacity 0.25s ease;
  display: inline-block;
}
.leaf-title:hover {
  transform: scale(1.03);
  opacity: 0.85;
}
.leaf-hint {
  color: var(--text-color, #691B1F);
  opacity: 0.6;
  font-family: monospace, sans-serif;
  font-size: clamp(8px, 0.9vw, 10px);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 2px;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s ease;
}
.leaf-hint:hover {
  opacity: 1;
}
.leaf-divider {
  width: 100%;
  height: 1.5px;
  background: var(--text-color, #691B1F);
  opacity: 0.35;
  margin-top: 6px;
  border-radius: 1px;
}
.leaf-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(8px, 1.4vh, 16px);
  padding: clamp(6px, 1vh, 12px) 0;
  overflow: hidden;
}
.leaf-paragraph {
  color: var(--text-color, #691B1F);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(8.5px, 1vw, 12px);
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0;
  text-align: left;
  opacity: 0.95;
}
.leaf-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.leaf-author {
  color: var(--text-color, #691B1F);
  font-family: Impact, 'Arial Black', 'PingFang SC', sans-serif;
  font-size: clamp(12px, 1.6vw, 18px);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
@media (max-width: 1024px) {
  :host { 
    --w: min(250px, 32vw, 40vh); 
  }
  :host([is-open]) {
    --w: min(350px, 42vw, 48vh);
  }
  .book {
    transform: translate(-50%, -50%) rotateZ(-2.5deg) scale(1);
  }
  .book.is-open {
    transform: translate(0%, -50%) rotateZ(0deg) scale(1.1);
  }
  .sequence { height: 55vh; min-height: 420px; }
  :host([is-open]) .sequence { height: 68vh; min-height: 500px; }
}
@media (max-width: 640px) {
  :host { 
    --w: min(210px, 44vw, 36vh); 
  }
  :host([is-open]) {
    --w: min(44vw, 38vh, 230px);
  }
  .book {
    transform: translate(-50%, -50%) rotateZ(-2.5deg) scale(1);
  }
  .book.is-open {
    transform: translate(0%, -50%) rotateZ(0deg) scale(1.05);
  }
  .sequence { height: 50vh; min-height: 360px; }
  :host([is-open]) .sequence { height: 60vh; min-height: 420px; }
}
@media (prefers-reduced-motion: reduce) {
  .book, .cover, .front:after { transition-duration: 0.01s !important; }
}
</style>
<main class="sequence" aria-label="Interactive 3D notebook">
  <section class="viewport">
    <div class="scene">
      <div class="book" role="button" tabindex="0" aria-label="Notebook: Click My Project to open">
        <div class="base"></div>
        <div class="leaf">
          <div class="leaf-content">
            <div class="leaf-header">
              <div class="leaf-tag">RESEARCH JOURNAL</div>
              <div class="leaf-title" title="Click to close">My Project</div>
              <div class="leaf-hint">Click to close ✕</div>
              <div class="leaf-divider"></div>
            </div>
            <div class="leaf-body">
              <p class="leaf-paragraph leaf-p1">
                Experience can help me recognize possible explanations, but even a reasonable explanation is still an assumption until it is examined through evidence.
              </p>
              <p class="leaf-paragraph leaf-p2">
                For me, research is not separate from design, and it strengthens the decisions behind the design. In my future practice as an instructional designer, I want to bring this research mindset into the design process.
              </p>
            </div>
            <div class="leaf-footer">
              <div class="leaf-author">Yu Liu</div>
            </div>
          </div>
        </div>
        <div class="cover">
          <div class="face front">
            <div class="cover-content">
              <div class="cover-header">
                <div class="cover-title" title="Click to open">My Project</div>
                <div class="cover-hint">Click to open ↗</div>
              </div>
              <div class="cover-footer">
                <div class="cover-author">Yu Liu</div>
              </div>
            </div>
          </div>
          <div class="face back"></div>
        </div>
        <div class="rings" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</main>`;

export class BookScroll extends HTMLElement {
  static get observedAttributes() {
    return ['open-width', 'background', 'cover-src', 'title', 'author', 'text-color', 'is-open', 'paragraph1', 'paragraph2'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.$ = s => this.shadowRoot.querySelector(s);
    this.isOpen = false;
    this.toggleBook = this.toggleBook.bind(this);

    const rings = this.$('.rings');
    if (rings) {
      for (let i = 0; i < 17; i++) {
        const ring = document.createElement('i');
        ring.className = 'ring';
        ring.style.top = (5 + i * 5.55) + '%';
        rings.append(ring);
      }
    }
  }

  connectedCallback() {
    this.applyOptions();

    // Click on "My Project" title on cover to open directly
    const coverTitle = this.$('.cover-title');
    if (coverTitle) {
      coverTitle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleBook(true);
      });
    }

    const coverHint = this.$('.cover-hint');
    if (coverHint) {
      coverHint.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleBook(true);
      });
    }

    // Click on "My Project" inside leaf to close
    const leafTitle = this.$('.leaf-title');
    if (leafTitle) {
      leafTitle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleBook(false);
      });
    }

    const leafHint = this.$('.leaf-hint');
    if (leafHint) {
      leafHint.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleBook(false);
      });
    }

    // Clicking anywhere on the book toggles open/close
    const book = this.$('.book');
    if (book) {
      book.addEventListener('click', () => {
        this.toggleBook();
      });
      book.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleBook();
        }
      });
    }
  }

  toggleBook(forceState) {
    if (typeof forceState === 'boolean') {
      this.isOpen = forceState;
    } else {
      this.isOpen = !this.isOpen;
    }
    this.updateState();
    this.dispatchEvent(new CustomEvent('booktoggle', {
      detail: { isOpen: this.isOpen },
      bubbles: true,
      composed: true
    }));
  }

  updateState() {
    const book = this.$('.book');
    if (!book) return;
    if (this.isOpen) {
      book.classList.add('is-open');
      book.setAttribute('aria-expanded', 'true');
      this.setAttribute('is-open', 'true');
    } else {
      book.classList.remove('is-open');
      book.setAttribute('aria-expanded', 'false');
      this.removeAttribute('is-open');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'is-open') {
      this.isOpen = newValue === 'true' || newValue === '';
      this.updateState();
      return;
    }
    if (this.isConnected) {
      this.applyOptions();
    }
  }

  applyOptions() {
    const bg = this.getAttribute('background') || '#2B2B2B';
    this.style.setProperty('--bg', bg);

    const image = this.getAttribute('cover-src') || new URL('./book.jpg', import.meta.url).href;
    const front = this.$('.front');
    if (front) {
      front.style.backgroundImage = `url(${JSON.stringify(image)})`;
    }

    const title = this.getAttribute('title') || 'My Project';
    const author = this.getAttribute('author') || 'Yu Liu';
    const textColor = this.getAttribute('text-color') || '#691B1F';
    this.style.setProperty('--text-color', textColor);

    for (const el of this.shadowRoot.querySelectorAll('.cover-title, .leaf-title')) {
      el.textContent = title;
    }
    for (const el of this.shadowRoot.querySelectorAll('.cover-author, .leaf-author')) {
      el.textContent = author;
    }

    const p1El = this.$('.leaf-p1');
    const p2El = this.$('.leaf-p2');
    if (this.hasAttribute('paragraph1') && p1El) {
      p1El.textContent = this.getAttribute('paragraph1');
    }
    if (this.hasAttribute('paragraph2') && p2El) {
      p2El.textContent = this.getAttribute('paragraph2');
    }

    if (this.hasAttribute('is-open')) {
      this.isOpen = this.getAttribute('is-open') === 'true';
    }
    this.updateState();
  }
}

if (!customElements.get('book-scroll')) {
  customElements.define('book-scroll', BookScroll);
}
