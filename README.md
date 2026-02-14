# ID TECH-Style Website (React + Redux + Tailwind)

> A portfolio-oriented static website project inspired by ID TECH’s official website structure.
> Built to practice React architecture, Redux state management, routing design, SEO basics, testing strategy, and performance optimization.

---

# 🎯 Project Goal

This project is designed to:

* Recreate a **corporate-level product website structure**
* Practice **React + Redux Toolkit** in a real-world scenario
* Implement clean routing architecture
* Apply SEO fundamentals
* Add testing and performance optimization
* Serve as an interview-ready portfolio project

⚠️ All content and images are self-written or placeholder-based to avoid copyright issues.

---

# 🧱 Tech Stack

* React (Vite)
* React Router v6
* Redux Toolkit
* Tailwind CSS
* Vitest + Testing Library
* Playwright (E2E)
* Lighthouse / Web Vitals

---

# 🚀 1. Project Setup

## Create Project

```bash
npm create vite@latest idtech-clone -- --template react
cd idtech-clone
npm install
```

## Install Dependencies

```bash
npm install react-router-dom @reduxjs/toolkit react-redux
npm install -D tailwindcss postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D playwright
npm install -D eslint
```

## Initialize Tailwind

```bash
npm i -D tailwindcss @tailwindcss/cli @tailwindcss/postcss postcss
```

### 需注意，這裡改為v4版本指令，無需額外建立 tailwind.config.js
### 根目錄 postcss.config.js
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### src/index.css

```css
@import "tailwindcss";
```

Start development:

```bash
npm run dev
```

---

# 🗺️ 2. Sitemap Design

Designed to reflect a professional product website structure.

```
/
|-- /Home
|-- /products
|     |-- /products/:slug (產品詳細頁：例如 VP3300、SecureMag…)
|
|-- /solutions
|     |-- /solutions/unattended
|     |-- /solutions/mobile
|     |-- /solutions/countertop
|     |-- /solutions/oem
|
|-- /software-services 
|
|-- /support （Support hub：KB、Product Updates、Request Help、Contact）
|     |-- /support/knowledge-base （可做成「導向/列表頁」）
|     |-- /support/product-updates
|     |-- /support/request-help
|
|-- /resources
|     |-- /resources/case-studies
|     |-- /resources/whitepapers （例如 unattended whitepaper）
|     |-- /resources/press-releases
|
|-- /company
|     |-- /company/about-us（Mission/Vision）
|     |-- /company/careers （可先做靜態頁）
|
|-- /contact （全球聯絡資訊）
|-- /privacy-policy （法務頁）
|-- /*NotFound
```

---

# 📁 3. Project Structure

```
src/
  app/
    store.js
    rootReducer.js

  routes/
    router.jsx
    routeConfig.js

  pages/
    Home/
    Products/
    Solutions/
    SoftwareServices/
    Support/
    Resources/
    Company/
    Contact/
    Legal/
    NotFound/

  components/
    layout/
    ui/
    seo/

  features/
    catalog/
    ui/
    compare/
    search/

  data/
    products.json
    solutions.json
    resources.json

  hooks/
  utils/
  styles/
```

---

# 🧠 4. Redux Architecture Design

Redux is used for **cross-page shared state**, not for trivial local UI state.

## UI Slice

Global UI states:

* theme (light/dark)
* mobile navigation toggle
* header variant
* toast system

## Catalog Slice

* products list
* loading status
* filters
* sorting
* pagination

Used in:

* `/products`
* `/products/:slug`

## Compare Slice

* compareIds array
* cross-page product comparison system

## Search Slice

* global search query
* search results
* recent searches

---

# 🖥️ 5. Data Strategy

Phase 1:

* Use local JSON under `/data`

Phase 2 (optional):

* json-server
* Express API
* Contact form backend
* Device/product API simulation

---

# 🧪 6. Testing Strategy

## Unit Testing (Vitest)

* slug utilities
* filter logic
* format helpers

## Component Testing

* ProductCard
* FilterPanel
* Header search

## E2E Testing (Playwright)

Test scenarios:

* Navigate Home → Products → Detail
* Add to compare
* State persistence
* 404 route

---

# ⚡ 7. Performance Optimization

* Route-based lazy loading
* React.lazy + Suspense
* Image lazy loading
* Lighthouse audit
* Bundle size analysis
* Web Vitals logging

---

# 🔍 8. SEO Strategy

Each page includes:

* Dynamic `<title>`
* Meta description
* OpenGraph tags
* Canonical links

Static files:

* robots.txt
* sitemap.xml

---

# 🎨 9. UI/UX Enhancements

Implemented without UI libraries:

* Product filtering
* Sorting system
* Comparison drawer
* FAQ accordion
* Sticky product spec panel
* Responsive mobile navigation

---

# 📊 10. Deliverables (Portfolio Ready)

This project demonstrates:

* Clear sitemap design
* Modular router architecture
* Structured Redux state tree
* Testing coverage
* Performance audit results
* SEO implementation

---

# 💡 Why This Project Matters

This project simulates:

* Real-world B2B product website structure
* Scalable React architecture
* State management beyond toy examples
* Interview-ready engineering depth

---

# 🎬 11. 統一動畫系統說明（index.css + Hook）

## A. `src/index.css`：統一定義動畫效果

目前專案把入場動畫集中在 `src/index.css`，包含：

* `zoom-in-title`
* `slide-left-in` / `slide-right-in` / `slide-up-in` / `slide-down-in`
* `fade-left-in` / `fade-right-in` / `fade-up-in` / `fade-down-in`

這些 class 都吃同一組 CSS 變數，讓每個組件可用 `style` 局部調整：

* `--anim-distance`：位移幅度
* `--anim-duration`：動畫時間
* `--anim-delay`：延遲時間（可做 stagger）
* `--anim-ease`：速度曲線
* `--zoom-start` / `--zoom-duration`：給 zoom 動畫用

元件使用方式（範例）：

```jsx
<article
  className="fade-down-in"
  style={{
    '--anim-distance': '56px',
    '--anim-duration': '850ms',
    '--anim-delay': `${index * 180}ms`,
  }}
>
  ...
</article>
```

另外，`@media (prefers-reduced-motion: reduce)` 已統一關閉動畫，確保可及性。

## B. `src/hooks/useInViewOnce.js`：進入視圖後只播放一次

為了避免頁面一載入就把動畫跑完，專案新增 `useInViewOnce`：

* 基於 `IntersectionObserver`
* 元件未進入視窗前：維持 `opacity-0`
* 進入視窗後：切換成動畫 class（例如 `slide-right-in`）
* 播放後 `unobserve`，因此只觸發一次

Hook 回傳：

* `ref`：綁在 section 或容器上
* `isInView`：是否已進入視圖（且已觸發）

元件整合範例：

```jsx
const { ref, isInView } = useInViewOnce()

<section ref={ref}>
  <h2 className={isInView ? 'zoom-in-title' : 'opacity-0'}>...</h2>
</section>
```

目前已套用在首頁非輪播動畫組件（如 `FeaturedProductsSection`、`UseCasesSection`、`AboutSection`），達成「進入視圖才開始、且只播放一次」的一致行為。
