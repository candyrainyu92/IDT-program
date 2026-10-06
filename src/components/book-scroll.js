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
  --w: min(422px, 37vw, 56vh);
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
  height: 80vh;
  min-height: 600px;
  max-height: 840px;
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
  transform-origin: 0 50%;
  transform: translate(0%, -50%) rotateZ(0deg) scale(1.255);
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
:host([mode="projects"]) .base {
  background: #7ca878;
  box-shadow: 2px 4px 0 #688f64, 5px 8px 0 #1e1e1e, 12px 24px 35px #0005;
}
.leaf {
  inset: 2px 3px 4px 1px;
  background: linear-gradient(90deg, #d7d5d0 0%, #f6f5f2 4%, #fff 14%, #fff 95%, #efeeeb);
  box-shadow: 1px 2px 0 #d7d6d0, 2px 4px 0 #f0eee8, 3px 6px 0 #bdbbb4;
  transform: translateZ(-1px);
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.book.is-open .leaf {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  background: #FFFFFF;
  overflow: hidden;
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
:host([mode="projects"]) .front {
  background-size: 100% 100%;
  background-position: center;
  box-shadow: inset -2px 0 3px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1);
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
  background: #FFFFFF;
  transform: rotateY(180deg) translateZ(1px);
  border-radius: 9px 2px 2px 9px;
  box-shadow: inset 0 0 1px #d6d2c5, 0 10px 25px #0002;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.book.is-open .back {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  background: #FFFFFF;
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
/* Left Page (.back face inside flipped cover) Styles in Rose #C58997 */
.back-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10% 11% 9% 11%;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: auto;
  cursor: default;
}
.back-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.back-title {
  color: #C58997;
  font-family: Impact, 'Arial Black', sans-serif;
  font-size: clamp(22px, 3.4vw, 40px);
  line-height: 1.05;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  text-align: left;
}
.back-divider {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #C58997 50%, rgba(197, 137, 151, 0.2) 100%);
  margin-top: 6px;
  margin-bottom: clamp(6px, 1.2vh, 10px);
  border-radius: 1px;
}
.back-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: clamp(12px, 1.8vw, 22px);
  row-gap: clamp(13px, 1.9vw, 22px);
  padding: 4px 6px 8px 6px;
  width: 100%;
  box-sizing: border-box;
}
.square-card {
  aspect-ratio: 1 / 1.05;
  background: #FCF7F9;
  border: 2px solid #C58997;
  border-radius: clamp(7px, 1vw, 11px);
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  box-sizing: border-box;
  box-shadow: 0 3px 10px rgba(197, 137, 151, 0.22);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.2s ease, background 0.2s ease;
  position: relative;
  overflow: hidden;
}
.square-card:nth-child(1) {
  transform: rotate(-2.6deg) translate(-1px, -1px);
  transform-origin: 30% 50%;
}
.square-card:nth-child(2) {
  transform: rotate(2.4deg) translate(1px, -2px);
  transform-origin: 70% 40%;
}
.square-card:nth-child(3) {
  transform: rotate(1.8deg) translate(-2px, 1px);
  transform-origin: 40% 60%;
}
.square-card:nth-child(4) {
  transform: rotate(-2.5deg) translate(2px, 2px);
  transform-origin: 60% 50%;
}
.square-card:hover {
  background: #FAF0F3;
  border-color: #8c3f52;
  transform: rotate(0deg) translateY(-5px) scale(1.04) !important;
  box-shadow: 0 10px 24px rgba(140, 63, 82, 0.35);
  z-index: 10;
}
.square-card.active {
  background: #FAF0F3;
  border-color: #8c3f52;
  box-shadow: 0 4px 14px rgba(140, 63, 82, 0.28);
}

/* Document First-Page Screenshot / Cover */
.square-cover {
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #F8F9FA;
  padding: clamp(4px, 0.6vw, 6px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid rgba(197, 137, 151, 0.35);
}

.mini-page {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: clamp(4px, 0.55vw, 6px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5px;
  overflow: hidden;
}

/* Page 1: Worksheet */
.mini-ws-title {
  font-family: Georgia, Cambria, serif;
  font-size: clamp(6.5px, 0.75vw, 8.5px);
  font-weight: 800;
  color: #1D2440;
  line-height: 1.15;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-ws-instruct {
  background: #FEF3C7;
  border: 0.5px solid #FDE68A;
  border-radius: 2px;
  padding: 1.5px 3px;
  font-size: clamp(4.5px, 0.55vw, 6px);
  color: #92400E;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-ws-sec {
  display: flex;
  align-items: flex-start;
  gap: 3px;
  margin-top: 1px;
}
.mini-num-badge {
  width: clamp(8px, 1vw, 11px);
  height: clamp(8px, 1vw, 11px);
  border-radius: 50%;
  background: #1D2440;
  color: #FFFFFF;
  font-size: clamp(5px, 0.55vw, 6.5px);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.mini-ws-sec-text {
  font-size: clamp(5px, 0.58vw, 6.8px);
  font-weight: 700;
  color: #1E293B;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mini-ws-box {
  background: #F1F5F9;
  border-left: 2px solid #C58997;
  padding: 1px 3px;
  font-size: clamp(4.5px, 0.52vw, 5.8px);
  color: #475569;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Page 2: Data Analysis Plan */
.mini-da-tag {
  font-family: monospace, sans-serif;
  font-size: clamp(4.5px, 0.52vw, 6px);
  font-weight: 800;
  color: #C58997;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.mini-da-title {
  font-family: Georgia, Cambria, serif;
  font-size: clamp(7px, 0.8vw, 9px);
  font-weight: 800;
  color: #1D2440;
  line-height: 1.1;
}
.mini-da-sub {
  font-size: clamp(4.5px, 0.52vw, 5.8px);
  color: #64748B;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 1.5px;
}
.mini-da-header {
  font-family: Georgia, Cambria, serif;
  font-size: clamp(5.5px, 0.65vw, 7.5px);
  font-weight: 700;
  color: #1D2440;
  line-height: 1.1;
}
.mini-da-p {
  font-size: clamp(4.5px, 0.52vw, 5.8px);
  color: #334155;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.mini-da-box {
  background: #F8FAFC;
  border: 0.5px solid #E2E8F0;
  border-radius: 2px;
  padding: 1.5px 3px;
  font-size: clamp(4.5px, 0.5vw, 5.6px);
  font-weight: 600;
  color: #1D2440;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Page 3: Final Report (RCT Manuscript) */
.mini-paper-abstract {
  background: #1D2440;
  border-radius: 3px;
  padding: 2.5px 4px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 1.5px;
}
.mini-abs-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1px;
}
.mini-abs-tag {
  font-size: clamp(4.5px, 0.52vw, 6px);
  font-weight: 800;
  color: #FF9BB4;
  text-transform: uppercase;
}
.mini-abs-p {
  font-size: clamp(4.2px, 0.5vw, 5.6px);
  color: #E2E8F0;
  line-height: 1.15;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.mini-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  text-align: center;
}
.mini-stat-box {
  background: #F8FAFC;
  border: 0.5px solid #CBD5E1;
  border-radius: 2px;
  padding: 1px;
}
.mini-stat-val {
  font-family: monospace, sans-serif;
  font-size: clamp(5px, 0.58vw, 6.8px);
  font-weight: 800;
  color: #1D2440;
  line-height: 1;
}
.mini-paper-intro {
  font-family: Georgia, Cambria, serif;
  font-size: clamp(5.5px, 0.65vw, 7.5px);
  font-weight: 700;
  color: #1D2440;
  border-bottom: 0.5px solid #E2E8F0;
  padding-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Page 4: Slide Deck Presentation (16:9 Thumbnail) */
.mini-slide {
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 3px;
  padding: clamp(3px, 0.5vw, 5px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.mini-slide-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #CBD5E1;
  padding-bottom: 1.5px;
}
.mini-slide-badge {
  font-family: monospace, sans-serif;
  font-size: clamp(4.5px, 0.52vw, 5.8px);
  font-weight: 800;
  color: #C58997;
  text-transform: uppercase;
}
.mini-slide-center {
  text-align: center;
  padding: 1px 0;
  display: flex;
  flex-direction: column;
  gap: 1.5px;
}
.mini-slide-title {
  font-family: Georgia, Cambria, serif;
  font-size: clamp(6px, 0.72vw, 8.2px);
  font-weight: 800;
  color: #1D2440;
  line-height: 1.15;
}
.mini-slide-author {
  font-size: clamp(4.5px, 0.5vw, 5.8px);
  color: #64748B;
  font-weight: 600;
}
.mini-slide-footer {
  font-size: clamp(4.2px, 0.48vw, 5.4px);
  color: #94A3B8;
  font-family: monospace;
  text-align: center;
  border-top: 0.5px solid #E2E8F0;
  padding-top: 1px;
}

/* Bottom Dedicated Title Area */
.square-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: clamp(4px, 0.6vh, 6px) clamp(6px, 0.8vw, 9px);
  background: #FCF7F9;
  box-sizing: border-box;
}
.square-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(8px, 0.9vw, 11px);
  font-weight: 800;
  color: #8c3f52;
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.square-arrow {
  font-size: clamp(9px, 1vw, 12px);
  font-weight: 900;
  color: #C58997;
  opacity: 0.9;
  transition: transform 0.2s ease, opacity 0.2s ease;
  flex-shrink: 0;
  margin-left: 4px;
}
.square-card:hover .square-arrow {
  opacity: 1;
  color: #8c3f52;
  transform: translate(2px, -2px);
}
.square-card-all {
  background: #FCF7F9;
  border: 2px solid #C58997;
}

/* Right Page (.leaf) Styles in White Background with Rose #C58997 text */
.leaf-tag {
  color: #C58997;
  opacity: 0.95;
  font-family: monospace;
  font-size: clamp(7.5px, 0.85vw, 9.5px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}
.leaf-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.leaf-title {
  color: #C58997;
  font-family: Impact, 'Arial Black', -apple-system, sans-serif;
  font-size: clamp(14px, 1.6vw, 19px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-top: 2px;
}
.leaf-hint {
  color: #C58997;
  opacity: 0.85;
  font-family: monospace, sans-serif;
  font-size: clamp(8px, 0.9vw, 11px);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}
.leaf-hint:hover {
  opacity: 1;
  transform: scale(1.05);
}
.leaf-divider {
  width: 100%;
  height: 2px;
  background: #C58997;
  margin-top: 6px;
  margin-bottom: clamp(6px, 1.2vh, 10px);
  border-radius: 1px;
}
.leaf-detail-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(6px, 1vh, 10px);
  padding: clamp(4px, 0.8vh, 8px) 0;
  box-sizing: border-box;
}
.detail-category-badge {
  display: inline-block;
  font-family: monospace;
  font-size: clamp(7.5px, 0.8vw, 9.5px);
  font-weight: 700;
  color: #C58997;
  background: rgba(197, 137, 151, 0.08);
  border: 1px solid #C58997;
  padding: 2px 7px;
  border-radius: 9999px;
  width: fit-content;
  text-transform: uppercase;
}
.detail-summary {
  color: #C58997;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(8.5px, 0.95vw, 11px);
  line-height: 1.4;
  font-weight: 600;
  margin: 0;
}
.detail-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.detail-pill {
  font-family: monospace;
  font-size: clamp(7px, 0.75vw, 8.5px);
  padding: 1.5px 5px;
  background: rgba(197, 137, 151, 0.06);
  border: 1px solid rgba(197, 137, 151, 0.4);
  border-radius: 4px;
  color: #C58997;
  font-weight: 600;
}
.detail-impact {
  background: rgba(197, 137, 151, 0.05);
  border: 1px solid rgba(197, 137, 151, 0.25);
  border-left: 3.5px solid #C58997;
  padding: clamp(4px, 0.8vh, 7px) clamp(6px, 1vw, 10px);
  border-radius: 0 6px 6px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(7.5px, 0.85vw, 10px);
  color: #C58997;
  font-weight: 600;
  line-height: 1.35;
}
.detail-open-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: clamp(7px, 1.1vh, 10px) clamp(12px, 1.6vw, 18px);
  background: #C58997;
  color: #FFFFFF !important;
  text-decoration: none;
  border: none;
  border-radius: 9999px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(8.5px, 0.95vw, 11px);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  box-shadow: 0 4px 14px rgba(197, 137, 151, 0.4);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 2px;
}
.detail-open-btn:hover {
  background: #b57786;
  transform: translateY(-1.5px) scale(1.02);
  box-shadow: 0 6px 18px rgba(197, 137, 151, 0.55);
}
.detail-open-btn .btn-arrow {
  font-size: 1.1em;
  transition: transform 0.2s ease;
}
.detail-open-btn:hover .btn-arrow {
  transform: translate(2px, -2px);
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

/* Mode Projects: Inside book font & border colors #709A02 */
:host([mode="projects"]) .back-title {
  color: #709A02;
}
:host([mode="projects"]) .back-divider {
  background: linear-gradient(90deg, #709A02 50%, rgba(112, 154, 2, 0.2) 100%);
}
:host([mode="projects"]) .square-card {
  background: #FCFDF8;
  border: 2px solid #709A02;
  box-shadow: 0 3px 10px rgba(112, 154, 2, 0.2);
}
:host([mode="projects"]) .square-card:hover {
  background: #F4F8E8;
  border-color: #709A02;
  box-shadow: 0 10px 24px rgba(112, 154, 2, 0.35);
}
:host([mode="projects"]) .square-card.active {
  background: #F4F8E8;
  border-color: #709A02;
  box-shadow: 0 4px 14px rgba(112, 154, 2, 0.3);
}
:host([mode="projects"]) .square-cover {
  border-bottom: 1.5px solid #709A02;
}
:host([mode="projects"]) .mini-page {
  border: 1px solid rgba(112, 154, 2, 0.35);
}
:host([mode="projects"]) .mini-da-tag {
  color: #709A02;
}
:host([mode="projects"]) .mini-slide {
  border: 1px solid rgba(112, 154, 2, 0.35);
}
:host([mode="projects"]) .mini-slide-top {
  border-bottom: 0.5px solid rgba(112, 154, 2, 0.3);
}
:host([mode="projects"]) .mini-slide-badge {
  color: #709A02;
}
:host([mode="projects"]) .mini-slide-footer {
  border-top: 0.5px solid rgba(112, 154, 2, 0.3);
}
:host([mode="projects"]) .square-bottom-bar {
  background: #FCFDF8;
}
:host([mode="projects"]) .square-card:hover .square-bottom-bar,
:host([mode="projects"]) .square-card.active .square-bottom-bar {
  background: #F4F8E8;
}
:host([mode="projects"]) .square-title {
  color: #709A02;
}
:host([mode="projects"]) .square-arrow {
  color: #709A02;
}
:host([mode="projects"]) .square-card:hover .square-title,
:host([mode="projects"]) .square-card.active .square-title {
  color: #709A02;
}
:host([mode="projects"]) .square-card:hover .square-arrow,
:host([mode="projects"]) .square-card.active .square-arrow {
  color: #709A02;
}
:host([mode="projects"]) .square-card-all {
  border: 2px solid #709A02;
  background: #FCFDF8;
}
:host([mode="projects"]) .leaf-tag {
  color: #709A02;
}
:host([mode="projects"]) .leaf-title {
  color: #709A02;
}
:host([mode="projects"]) .leaf-hint {
  color: #709A02;
}
:host([mode="projects"]) .leaf-divider {
  background: #709A02;
}
:host([mode="projects"]) .detail-category-badge {
  color: #709A02;
  border: 1.5px solid #709A02;
  background: rgba(112, 154, 2, 0.08);
}
:host([mode="projects"]) .detail-summary {
  color: #709A02;
}
:host([mode="projects"]) .detail-pill {
  color: #709A02;
  border: 1px solid #709A02;
  background: rgba(112, 154, 2, 0.08);
}
:host([mode="projects"]) .detail-impact {
  border: 1px solid #709A02;
  border-left: 3.5px solid #709A02;
  color: #709A02;
  background: rgba(112, 154, 2, 0.06);
}
:host([mode="projects"]) .detail-impact strong {
  color: #709A02;
}
:host([mode="projects"]) .leaf-detail-box {
  justify-content: flex-start;
  gap: clamp(8px, 1.4vh, 14px);
}
:host([mode="projects"]) .detail-open-btn {
  display: none !important;
}
:host([mode="projects"]) .leaf-author {
  color: #709A02;
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
              <div class="leaf-tag">PROJECT DETAIL</div>
              <div class="leaf-title-row">
                <div class="leaf-title" id="leaf-preview-title">Adaptive Clinical Decision</div>
                <div class="leaf-hint" title="Click to close">✕ Close</div>
              </div>
              <div class="leaf-divider"></div>
            </div>
            <div class="leaf-detail-box">
              <div class="detail-category-badge" id="leaf-preview-category">Healthcare &amp; Simulation</div>
              <p class="detail-summary" id="leaf-preview-summary">
                Designed an asynchronous branching scenario curriculum for nursing practitioners to diagnose complex pediatric cases under time constraints.
              </p>
              <div class="detail-tags-row" id="leaf-preview-tags">
                <span class="detail-pill">Branching Scenarios</span>
                <span class="detail-pill">xAPI Tracking</span>
                <span class="detail-pill">Cognitive Load</span>
              </div>
              <div class="detail-impact" id="leaf-preview-impact">
                <strong>Impact:</strong> 38% increase in diagnostic accuracy, 45% reduction in completion time.
              </div>
              <button class="detail-open-btn" id="leaf-open-full-btn" type="button">
                <span>View Full Documents</span> <span class="btn-arrow">↗</span>
              </button>
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
          <div class="face back">
            <div class="back-content">
              <div class="back-header">
                <div class="back-title">My Project</div>
                <div class="back-divider"></div>
              </div>
              <div class="back-gallery-grid">
                <div class="square-card active" data-project="letter" title="Proposal Worksheet">
                  <div class="square-cover">
                    <div class="mini-page">
                      <div class="mini-ws-title">Research Proposal Worksheet</div>
                      <div class="mini-ws-instruct">Instructions: Use this worksheet to guide...</div>
                      <div class="mini-ws-sec">
                        <span class="mini-num-badge">1</span>
                        <span class="mini-ws-sec-text">Title: Proposed research study?</span>
                      </div>
                      <div class="mini-ws-box">Activity: Brainstorm 3-5 titles...</div>
                      <div class="mini-ws-sec">
                        <span class="mini-num-badge">2</span>
                        <span class="mini-ws-sec-text">Introduction: Topic &amp; Context</span>
                      </div>
                    </div>
                  </div>
                  <div class="square-bottom-bar">
                    <span class="square-title">Proposal Worksheet</span>
                    <span class="square-arrow">↗</span>
                  </div>
                </div>

                <div class="square-card" data-project="methodology" title="Data Analysis Plan">
                  <div class="square-cover">
                    <div class="mini-page">
                      <div class="mini-da-tag">Quantitative Protocol</div>
                      <div class="mini-da-title">Data Analysis Plan</div>
                      <div class="mini-da-sub">AI Feedback &amp; ESL Writing Study</div>
                      <div class="mini-da-header">Overview</div>
                      <div class="mini-da-p">Describes data analysis plan examining AI-generated feedback for ESL writing...</div>
                      <div class="mini-da-box">Stage 1: Descriptive Statistics (M, SD)</div>
                    </div>
                  </div>
                  <div class="square-bottom-bar">
                    <span class="square-title">Data Analysis Plan</span>
                    <span class="square-arrow">↗</span>
                  </div>
                </div>

                <div class="square-card" data-project="evidence" title="Final Research Report">
                  <div class="square-cover">
                    <div class="mini-page">
                      <div class="mini-paper-abstract">
                        <div class="mini-abs-head">
                          <span class="mini-abs-tag">Executive Abstract</span>
                          <span style="font-size: clamp(4px, 0.48vw, 5.2px); opacity: 0.8;">N=800 RCT</span>
                        </div>
                        <div class="mini-abs-p">AI feedback vs instructor feedback across 16 online cohorts (Adjusted M=13.52, d=0.68, p&lt;.001)...</div>
                      </div>
                      <div class="mini-stat-grid">
                        <div class="mini-stat-box"><div class="mini-stat-val">800</div></div>
                        <div class="mini-stat-box"><div class="mini-stat-val" style="color: #2563EB;">+18.6%</div></div>
                        <div class="mini-stat-box"><div class="mini-stat-val" style="color: #059669;">2.4x</div></div>
                        <div class="mini-stat-box"><div class="mini-stat-val" style="color: #7C3AED;">d=0.86</div></div>
                      </div>
                      <div class="mini-paper-intro">1. Introduction &amp; Background</div>
                    </div>
                  </div>
                  <div class="square-bottom-bar">
                    <span class="square-title">Final Research Report</span>
                    <span class="square-arrow">↗</span>
                  </div>
                </div>

                <div class="square-card square-card-all" data-project="letter-all" title="Presentation Slides">
                  <div class="square-cover">
                    <div class="mini-slide">
                      <div class="mini-slide-top">
                        <span class="mini-slide-badge">Slide 1 of 11</span>
                        <span style="font-size: clamp(4px, 0.48vw, 5.2px); color: #94A3B8;">Presentation</span>
                      </div>
                      <div class="mini-slide-center">
                        <div class="mini-slide-title">AI Feedback in ESL Writing</div>
                        <div class="mini-slide-author">Yu Liu • ETEC 6430</div>
                      </div>
                      <div class="mini-slide-footer">CSUSB Educational Technology</div>
                    </div>
                  </div>
                  <div class="square-bottom-bar">
                    <span class="square-title">Presentation Slides</span>
                    <span class="square-arrow">↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rings" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</main>`;

const PROJECT_DETAILS = {
  'interactive-microlearning': {
    title: 'Client & Topic Report + Model Selection',
    category: 'QiYao EdTech • K-12 English Grammar E-Learning',
    summary: 'Comprehensive Client & Topic Report addressing Mr. Zhao’s English department performance gap, paired with Milestone 2: Comparative Model Selection (Backward Design + Gagné’s Nine Events hybrid).',
    tags: ['Client Report', 'Model Selection', 'Backward Design', 'Gagné Nine Events', 'Performance Gap'],
    impact: 'Impact: 2 Embedded Documents: Problem Diagnosis, Learner Analysis & Hybrid Instructional Architecture.'
  },
  'gamified-onboarding': {
    title: 'Analysis Report',
    category: 'QiYao EdTech • Systematic ID Foundation',
    summary: 'A comprehensive analytical foundation decomposing the 5-step instructional hierarchy, subordinate skills, entry behaviors validation, learner characteristics (Grades 2–5), and contextual constraints.',
    tags: ['Analysis Report', 'Skill Hierarchy', 'Entry Behaviors', 'Misconceptions', 'Notion Context'],
    impact: 'Impact: Decomposed 5-step procedural hierarchy, validated 4 entry behaviors & 5 cognitive misconceptions.'
  },
  'accessible-stem': {
    title: 'Design Report (Objectives, Assessment & Flow)',
    category: 'QiYao EdTech • Systematic ID Design Specification',
    summary: 'Mager B/C/Cr performance objectives, formative & summative assessment alignment, 4-phase cognitive instructional flow, and evidence-based reasoning matrix.',
    tags: ['Performance Objectives', 'Assessment Alignment', '4-Phase Flow', 'Gagné Nine Events', 'Evidence Matrix'],
    impact: 'Impact: 6 criterion-referenced objectives, authentic transfer paragraph assessment & 4-phase cognitive load sequence.'
  },
  'all': {
    title: 'ETEC 6440 Presentation Slides',
    category: 'QiYao EdTech • Executive Project Presentation',
    summary: 'Designing for Grammar Transfer: 11-slide executive presentation covering performance gap diagnosis, hybrid instructional design (Backward Design + Gagné), and Notion implementation.',
    tags: ['Presentation Slides', 'ETEC 6440', 'Grammar Transfer', 'Scaffolding', 'Notion Delivery'],
    impact: 'Impact: 11-slide executive deck with high-resolution visual scaffolds, hybrid model synthesis, and implementation architecture.'
  }
};

const RESEARCH_DETAILS = {
  'letter': {
    title: 'Research Proposal Worksheet',
    category: 'Research & Evaluation Artifact',
    summary: 'Official research proposal worksheet detailing instructional inquiry, study design, PICOT questions, and literature synthesis.',
    tags: ['Worksheet', 'Proposal', 'Research Framework'],
    impact: 'Impact: Structured 9-dimension inquiry framework guiding instructional empirical study design.'
  },
  'methodology': {
    title: 'Data Analysis Plan',
    category: 'Statistical Analysis & Methods',
    summary: 'Comprehensive data analysis plan examining whether AI-generated feedback improves ESL learners’ writing performance, covering ANCOVA models, assumption diagnostics, and software tools.',
    tags: ['Data Analysis', 'ANCOVA', 'Statistical Methods'],
    impact: 'Impact: Rigorous quantitative validation architecture with Jamovi, JASP, and automated NLP metrics.'
  },
  'evidence': {
    title: 'Final Report (RCT Manuscript)',
    category: 'Empirical Research Study',
    summary: 'Complete empirical manuscript investigating the effect of AI-generated feedback on ESL learners’ writing performance via a 4-week Randomized Controlled Trial (RCT, N = 800).',
    tags: ['Final Report', 'RCT Study', '800 Participants', 'ANCOVA'],
    impact: 'Impact: Established significant writing gains (+18.6% vs +9.5%, d = 0.68) with pronounced moderation for intermediate learners.'
  },
  'letter-all': {
    title: 'Research Slide Deck (PPT)',
    category: 'Conference & Thesis Presentation',
    summary: 'Complete 11-slide research presentation examining the effect of AI-generated feedback on ESL writing performance, RCT methodology, cognitive mechanisms, and strategic deployment.',
    tags: ['Slide Deck', '11 Slides', 'ETEC 6430', 'CSUSB'],
    impact: 'Impact: Defended research presentation synthesizing empirical findings from 800-learner trial.'
  }
};

export class BookScroll extends HTMLElement {
  static get observedAttributes() {
    return ['open-width', 'background', 'cover-src', 'title', 'author', 'text-color', 'is-open', 'paragraph1', 'paragraph2', 'mode'];
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

    // Click on title/hint inside leaf to close
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

    this.bindGalleryInteractions();
  }

  bindGalleryInteractions() {
    const isResearchMode = this.getAttribute('mode') === 'letter' || this.getAttribute('mode') === 'research';
    const dataSet = isResearchMode ? RESEARCH_DETAILS : PROJECT_DETAILS;
    let activeProjectId = isResearchMode ? 'letter' : 'interactive-microlearning';

    const updatePreview = (projectId) => {
      const data = dataSet[projectId] || dataSet[activeProjectId] || Object.values(dataSet)[0];
      activeProjectId = projectId;

      const titleEl = this.$('#leaf-preview-title');
      const catEl = this.$('#leaf-preview-category');
      const sumEl = this.$('#leaf-preview-summary');
      const impactEl = this.$('#leaf-preview-impact');
      const tagsEl = this.$('#leaf-preview-tags');

      if (titleEl) titleEl.textContent = data.title;
      if (catEl) catEl.textContent = data.category;
      if (sumEl) sumEl.textContent = data.summary;
      if (impactEl) impactEl.innerHTML = `<strong>Impact:</strong> ${data.impact.replace(/^Impact:\s*/, '')}`;
      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="detail-pill">${t}</span>`).join('');
      }

      const allCards = this.shadowRoot.querySelectorAll('.square-card');
      allCards.forEach(c => {
        if (c.getAttribute('data-project') === projectId) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
    };

    updatePreview(activeProjectId);

    // Square gallery card clicks and hover
    const squareCards = this.shadowRoot.querySelectorAll('.square-card');
    squareCards.forEach(card => {
      const project = card.getAttribute('data-project') || activeProjectId;
      
      card.addEventListener('mouseenter', () => {
        updatePreview(project);
      });

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        updatePreview(project);
        this.dispatchEvent(new CustomEvent('galleryclick', {
          detail: { project },
          bubbles: true,
          composed: true
        }));
      });
    });

    const openFullBtn = this.$('#leaf-open-full-btn');
    if (openFullBtn) {
      openFullBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('galleryclick', {
          detail: { project: activeProjectId },
          bubbles: true,
          composed: true
        }));
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

    const coverTitle = this.$('.cover-title');
    if (coverTitle) coverTitle.textContent = title;

    const backTitle = this.$('.back-title');
    if (backTitle) backTitle.textContent = title;

    const coverAuthor = this.$('.cover-author');
    if (coverAuthor) coverAuthor.textContent = author;

    const p1El = this.$('.leaf-p1');
    const p2El = this.$('.leaf-p2');
    if (this.hasAttribute('paragraph1') && p1El) {
      p1El.textContent = this.getAttribute('paragraph1');
    }
    if (this.hasAttribute('paragraph2') && p2El) {
      p2El.textContent = this.getAttribute('paragraph2');
    }

    const isResearchMode = this.getAttribute('mode') === 'letter' || this.getAttribute('mode') === 'research';
    const grid = this.$('.back-gallery-grid');
    if (grid) {
      if (isResearchMode) {
        grid.innerHTML = `
          <div class="square-card active" data-project="letter" title="Proposal Worksheet">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-ws-title">Research Proposal Worksheet</div>
                <div class="mini-ws-instruct">Instructions: Use this worksheet to guide...</div>
                <div class="mini-ws-sec">
                  <span class="mini-num-badge">1</span>
                  <span class="mini-ws-sec-text">Title: Proposed research study?</span>
                </div>
                <div class="mini-ws-box">Activity: Brainstorm 3-5 titles...</div>
                <div class="mini-ws-sec">
                  <span class="mini-num-badge">2</span>
                  <span class="mini-ws-sec-text">Introduction: Topic &amp; Context</span>
                </div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Proposal Worksheet</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card" data-project="methodology" title="Data Analysis Plan">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-da-tag">Quantitative Protocol</div>
                <div class="mini-da-title">Data Analysis Plan</div>
                <div class="mini-da-sub">AI Feedback &amp; ESL Writing Study</div>
                <div class="mini-da-header">Overview</div>
                <div class="mini-da-p">Describes data analysis plan examining AI-generated feedback for ESL writing...</div>
                <div class="mini-da-box">Stage 1: Descriptive Statistics (M, SD)</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Data Analysis Plan</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card" data-project="evidence" title="Final Research Report">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-paper-abstract">
                  <div class="mini-abs-head">
                    <span class="mini-abs-tag">Executive Abstract</span>
                    <span style="font-size: clamp(4px, 0.48vw, 5.2px); opacity: 0.8;">N=800 RCT</span>
                  </div>
                  <div class="mini-abs-p">AI feedback vs instructor feedback across 16 online cohorts (Adjusted M=13.52, d=0.68, p&lt;.001)...</div>
                </div>
                <div class="mini-stat-grid">
                  <div class="mini-stat-box"><div class="mini-stat-val">800</div></div>
                  <div class="mini-stat-box"><div class="mini-stat-val" style="color: #2563EB;">+18.6%</div></div>
                  <div class="mini-stat-box"><div class="mini-stat-val" style="color: #059669;">2.4x</div></div>
                  <div class="mini-stat-box"><div class="mini-stat-val" style="color: #7C3AED;">d=0.86</div></div>
                </div>
                <div class="mini-paper-intro">1. Introduction &amp; Background</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Final Research Report</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card square-card-all" data-project="letter-all" title="Presentation Slides">
            <div class="square-cover">
              <div class="mini-slide">
                <div class="mini-slide-top">
                  <span class="mini-slide-badge">Slide 1 of 11</span>
                  <span style="font-size: clamp(4px, 0.48vw, 5.2px); color: #94A3B8;">Presentation</span>
                </div>
                <div class="mini-slide-center">
                  <div class="mini-slide-title">AI Feedback in ESL Writing</div>
                  <div class="mini-slide-author">Yu Liu • ETEC 6430</div>
                </div>
                <div class="mini-slide-footer">CSUSB Educational Technology</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Presentation Slides</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>
        `;
      } else {
        grid.innerHTML = `
          <div class="square-card active" data-project="interactive-microlearning" title="Client &amp; Topic Report + Model Selection">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-da-tag">2 Documents Embedded</div>
                <div class="mini-da-title">Client &amp; Topic Report</div>
                <div class="mini-da-sub">Milestone 2: Model Selection</div>
                <div class="mini-da-header">QiYao EdTech • Mr. Zhao</div>
                <div class="mini-da-p">Instructional problem diagnosis, learner description, Backward Design &amp; Gagné Nine Events hybrid...</div>
                <div class="mini-da-box">2 Documents Embedded ↗</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Client &amp; Model Report</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card" data-project="gamified-onboarding" title="Analysis Report">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-da-tag">Analysis Deliverable</div>
                <div class="mini-da-title">Analysis Report</div>
                <div class="mini-da-sub">Goals, Skills &amp; Learners</div>
                <div class="mini-da-header">5 Major Performance Steps</div>
                <div class="mini-da-p">Entry skills validation, Grades 2–5 learner profiles, 5 key misconceptions &amp; Notion context...</div>
                <div class="mini-da-box">Full Report Embedded ↗</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Analysis Report</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card" data-project="accessible-stem" title="Design Report (Objectives, Assessment & Flow)">
            <div class="square-cover">
              <div class="mini-page">
                <div class="mini-da-tag">Design Specification</div>
                <div class="mini-da-title">Design Report</div>
                <div class="mini-da-sub">Objectives &amp; Assessment Flow</div>
                <div class="mini-da-header">6 Mager Objectives (B/C/Cr)</div>
                <div class="mini-da-p">Authentic assessment alignment, 4-phase Gagné flow, and evidence-based decision matrix...</div>
                <div class="mini-da-box">Full Report Embedded ↗</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Design Report</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>

          <div class="square-card square-card-all" data-project="all" title="ETEC 6440 Presentation Slides">
            <div class="square-cover">
              <div class="mini-slide">
                <div class="mini-slide-top">
                  <span class="mini-slide-badge">Slide 1 of 11</span>
                  <span style="font-size: clamp(4px, 0.48vw, 5.2px); color: #709A02; font-weight: 700;">PPTX Presentation</span>
                </div>
                <div class="mini-slide-center">
                  <div class="mini-slide-title">Designing for Grammar Transfer</div>
                  <div class="mini-slide-author">Yu Liu • ETEC 6440</div>
                </div>
                <div class="mini-slide-footer">CSUSB • QiYao EdTech</div>
              </div>
            </div>
            <div class="square-bottom-bar">
              <span class="square-title">Presentation Slides</span>
              <span class="square-arrow">↗</span>
            </div>
          </div>
        `;
      }
    }

    const leafTag = this.$('.leaf-tag');
    if (leafTag) {
      leafTag.textContent = isResearchMode ? 'RESEARCH ATTACHMENT' : 'PROJECT DETAIL';
    }

    this.bindGalleryInteractions();

    if (this.hasAttribute('is-open')) {
      this.isOpen = this.getAttribute('is-open') === 'true';
    }
    this.updateState();
  }
}

if (!customElements.get('book-scroll')) {
  customElements.define('book-scroll', BookScroll);
}
