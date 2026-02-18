# NEXA-Style Website (React + Redux + Tailwind)

> A portfolio-oriented static website project inspired by NEXA’s official website structure.
> Built to practice React architecture, Redux state management, routing design, SEO basics, testing strategy, and performance optimization.

---

# 🎯 Project Goal

This project is designed to:

- Recreate a **corporate-level product website structure**
- Practice **React + Redux Toolkit** in a real-world scenario
- Implement clean routing architecture
- Apply SEO fundamentals
- Add testing and performance optimization
- Serve as an interview-ready portfolio project

⚠️ All content and images are self-written or placeholder-based to avoid copyright issues.

---

# 🧱 Tech Stack

- React (Vite)
- React Router v6
- Redux Toolkit
- Tailwind CSS
- Vitest + Testing Library
- Playwright (E2E)
- Lighthouse / Web Vitals

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
@import 'tailwindcss';
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

# 🔎 2.1 SEO v1 Plan (Current)

To align with the current project state, SEO v1 will include:

- `robots.txt`
- `sitemap.xml`
- Per-page base meta:
  - `title`
  - `description`
  - `canonical`
  - Open Graph basic tags

## GitHub Pages Notes

- Current site URL: `https://chang-hsi.github.io/idtech-clone/`
- Current Vite production `base`: `/idtech-clone/`
- SPA fallback is handled by `public/404.html` + redirect restore logic in `src/main.jsx`

## Sitemap Inclusion Rules (v1)

- Include static pages (`/`, `/products`, `/use-cases`, `/resources`, `/company`, etc.)
- Include dynamic detail routes from local data:
  - products (`/products/:productSlug`)
  - product collections (`/products/collections/:collectionSlug`)
  - use cases (`/use-cases/:slug`)
  - resources articles (`/resources/:articleSlug`)
  - careers detail (`/company/careers/:jobSlug`)
- Exclude temporary/testing paths

## Non-Goals (v1)

- SSR migration
- Full schema.org coverage
- `hreflang` multilingual SEO

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

- theme (light/dark)
- mobile navigation toggle
- header variant
- toast system

## Catalog Slice

- products list
- loading status
- filters
- sorting
- pagination

Used in:

- `/products`
- `/products/:slug`

## Compare Slice

- compareIds array
- cross-page product comparison system

## Search Slice

- global search query
- search results
- recent searches

## 為什麼目前還會 `import data` 靜態資料？

目前 `catalogSlice` 會從 `src/data/products/*.js` 讀入初始資料，這樣做是刻意的：

- 文案與內容好維護：產品敘述、規格、圖片路徑集中在 data 檔，可由非前端角色協作調整。
- 前端頁面先完整開發：在沒有後端 API 前，先把路由、元件、狀態流都打通。
- 方便未來切 API：元件只讀 selector，不直接耦合 data 檔，來源可從「本地 data」平滑切換成「遠端 API」。

## 未來要串接 API 的建議做法（Redux 方向）

建議採用 Redux Toolkit 官方路線：

- 第一階段：`createAsyncThunk` + `extraReducers`
  - 在 `catalog` feature 內新增 async thunk 請求 API。
  - 成功後更新 `state`（或 dispatch `setCatalogData`）。
- 進階階段：RTK Query（更推薦）
  - 直接在 Redux 生態內處理快取、loading、error、重抓策略。
  - 元件改用 query hooks 讀資料，維持清晰資料流。

## `import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'` 是做什麼？

可以理解為：引入 Redux Toolkit 提供的「建立 slice 與管理資料集合」工具。

- `createSlice`
  - 用來定義一個 Redux 模組（name / initialState / reducers）。
  - 會自動幫你產生 action creators 與 reducer。
- `createEntityAdapter`
  - 用來管理「列表型資料」（例如 products）。
  - 內部會把資料標準化成 `{ ids, entities }`，查詢與更新效率較好。
  - 也會幫你產生常用 selectors（如 selectAll、selectById）。

所以它不是「只是在 import Redux 本體」，而是載入 RTK 的高階工具，讓 Redux 寫法更簡潔且可維護。

---

# 🗂️ 12. Jira 與 GitHub（入門）

Jira 可以理解成「有流程與自動化能力的任務看板系統」。

## Jira 是什麼

- 用來管理需求、任務、Bug、版本進度
- 常見層級：
  - Epic（大功能）
  - Story / Task（開發項目）
  - Bug（缺陷）
- 常見狀態：
  - To Do
  - In Progress
  - In Review
  - Done

## 與 Google Sheet 的差異

- Sheet：自由但全靠人工維護
- Jira：可定義流程規則、責任人、優先級、Sprint、報表，適合團隊協作

## Jira 與 GitHub 可以連動嗎？

可以，且實務上很常見。

常見連動方式：

- Commit / PR 關聯 Jira issue
  - 在 branch、commit、PR 標題加入 Jira key（例如 `IDT-42`）
- Jira 顯示開發紀錄
  - 可看到對應分支、commit、PR、合併狀態
- 自動更新 issue 狀態（可選）
  - 例如 PR merge 後，自動把 issue 從 `In Review` 改成 `Done`

## 實務命名建議（可直接套用）

- Branch：`feature/IDT-42-usecases-detail-page`
- Commit：`IDT-42 build use case detail sections`
- PR Title：`IDT-42: Build UseCasesDetailPage skeleton`

這樣 Jira 與 GitHub 會更容易自動關聯，追蹤成本也最低。

## 具體操作流程（一步一步）

以下以 `IDT-1` 為例：

1. 在 Jira 建立一張 issue  
   - 例如：`IDT-1 把專案與 Jira/GitHub 整合並補 README`

2. 在本機建立分支（分支名帶 Jira key）

```bash
git checkout -b feature/IDT-1-jira-github-link
```

3. 完成程式碼修改後提交（commit 訊息帶 Jira key）

```bash
git add README.md
git commit -m "IDT-1 add Jira and GitHub integration notes to README"
```

4. 推送分支到 GitHub

```bash
git push -u origin feature/IDT-1-jira-github-link
```

5. 到 GitHub Repository 首頁點 `Compare & pull request`

6. 建立 PR 時，Title 一定要帶 Jira key  
   - 例：`IDT-1: Add Jira and GitHub integration notes to README`

7. 建立 PR 後回 Jira 打開 `IDT-1` 詳細頁  
   - 在右側 `開發` 區塊可看到：
     - 分支（Branch）
     - 提交（Commit）
     - 提取要求（Pull Request）

8. （可選）Merge PR 後回 Jira 再看一次  
   - PR 狀態會從 `OPEN` 變成已合併，形成完整任務追蹤鏈。

---

# 🖥️ 5. Data Strategy

Phase 1:

- Use local JSON under `/data`

Phase 2 (optional):

- json-server
- Express API
- Contact form backend
- Device/product API simulation

---

# 🧪 6. Testing Strategy

## Unit Testing (Vitest)

- slug utilities
- filter logic
- format helpers

## Component Testing

- ProductCard
- FilterPanel
- Header search

## E2E Testing (Playwright)

Test scenarios:

- Navigate Home → Products → Detail
- Add to compare
- State persistence
- 404 route

---

# ⚡ 7. Performance Optimization

- Route-based lazy loading
- React.lazy + Suspense
- Image lazy loading
- Lighthouse audit
- Bundle size analysis
- Web Vitals logging

---

# 🔍 8. SEO Strategy

Each page includes:

- Dynamic `<title>`
- Meta description
- OpenGraph tags
- Canonical links

Static files:

- robots.txt
- sitemap.xml

---

# 🎨 9. UI/UX Enhancements

Implemented without UI libraries:

- Product filtering
- Sorting system
- Comparison drawer
- FAQ accordion
- Sticky product spec panel
- Responsive mobile navigation

---

# 📊 10. Deliverables (Portfolio Ready)

This project demonstrates:

- Clear sitemap design
- Modular router architecture
- Structured Redux state tree
- Testing coverage
- Performance audit results
- SEO implementation

---

# 💡 Why This Project Matters

This project simulates:

- Real-world B2B product website structure
- Scalable React architecture
- State management beyond toy examples
- Interview-ready engineering depth

---

# 🎬 11. 統一動畫系統說明（index.css + Hook）

## A. `src/index.css`：統一定義動畫效果

目前專案把入場動畫集中在 `src/index.css`，包含：

- `zoom-in-title`
- `slide-left-in` / `slide-right-in` / `slide-up-in` / `slide-down-in`
- `fade-left-in` / `fade-right-in` / `fade-up-in` / `fade-down-in`

這些 class 都吃同一組 CSS 變數，讓每個組件可用 `style` 局部調整：

- `--anim-distance`：位移幅度
- `--anim-duration`：動畫時間
- `--anim-delay`：延遲時間（可做 stagger）
- `--anim-ease`：速度曲線
- `--zoom-start` / `--zoom-duration`：給 zoom 動畫用

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

- 基於 `IntersectionObserver`
- 元件未進入視窗前：維持 `opacity-0`
- 進入視窗後：切換成動畫 class（例如 `slide-right-in`）
- 播放後 `unobserve`，因此只觸發一次

Hook 回傳：

- `ref`：綁在 section 或容器上
- `isInView`：是否已進入視圖（且已觸發）

元件整合範例：

```jsx
const { ref, isInView } = useInViewOnce()

<section ref={ref}>
  <h2 className={isInView ? 'zoom-in-title' : 'opacity-0'}>...</h2>
</section>
```

目前已套用在首頁非輪播動畫組件（如 `FeaturedProductsSection`、`UseCasesSection`、`AboutSection`），達成「進入視圖才開始、且只播放一次」的一致行為。
