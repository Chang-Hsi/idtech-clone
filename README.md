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

## 目前 API 串接進度（Products）

目前已進入實作階段，流程如下：

- 在需要 catalog 資料的頁面進入時 dispatch `loadProductsFromApi()`
  - 例如：`/products`、`/products/collections/:collectionSlug`、`/products/:productSlug`、`/use-cases/:slug`
- `catalog` 使用 `createAsyncThunk` 呼叫 `GET /api/products`
- `GET /api/products` 採用統一 envelope：
  - `code`: `0` 代表成功，非 `0` 代表業務錯誤
  - `message`: 後端訊息
  - `data`: 實際資料（目前含 `collections`、`productsPage`）
- API 成功時：以 `slug` 對齊，將後端欄位覆蓋到既有本地 product（保留原本頁面需要的 detail/media 欄位）
- API 失敗時：維持本地 data 作為 fallback，不阻斷頁面渲染

目前用途：先驗證「按頁載入 API」的行為可被明確觀察（Network 可直接看到每次進頁請求），並確認 Redux 資料流可平滑切換來源，再擴到 `collections`、`resources/articles`。

## 下一步：API 具體策略（按頁載入 + 過渡到 RTK Query）

### 按頁載入策略（目前到 RTK Query 前）

- 所有 API 請求都由頁面進入時觸發，不在 `main.jsx` 做全域預載。
- 每個頁面都需呈現 `loading / error / success` 狀態，便於展示 API 串接成效。
- API 失敗時保留 fallback（本地 data）確保頁面可用。

### 為什麼採用按頁載入

- Demo/作品展示時，能直接看到每次進頁的 API 請求與狀態切換。
- 首屏不會因全域預載而被額外請求拖慢。
- 方便逐頁驗證 API 行為與錯誤處理。

### RTK Query 過渡步驟

1. 新增 `catalogApi`（RTK Query）先接 `products`。
2. 保留既有 selectors，讓頁面先維持現有渲染邏輯。
3. 將 `collections` 併入 RTK Query，減少手動 thunk/merge 邏輯。
4. `resources/articles`、`careers` 改為頁面層 query hook（按頁抓取）。
5. 最後收斂舊的 `createAsyncThunk` 路徑，只保留必要 fallback。

### API 目標分層（建議）

- `GET /api/products`（按頁載入，回傳 products-page 所需聚合資料）
- `GET /api/collections`（後續可拆分）
- `GET /api/resources/articles`（列表）
- `GET /api/resources/articles/:slug`（按頁）
- `GET /api/careers/jobs`（列表）
- `GET /api/careers/jobs/:slug`（按頁）

### API 回傳規範（前後端對齊）

成功（HTTP 2xx）：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

失敗（HTTP 4xx/5xx）：

```json
{
  "code": 1001,
  "message": "request invalid",
  "error": {}
}
```

原則：

- 仍使用正確 HTTP status（不要把錯誤都包成 200）
- 前端先判斷 HTTP status，再判斷 `code`
- `data` 欄位必須語意明確，不放測試殘留資料

## 為什麼仍保留 `createEntityAdapter` + `createSlice`

- `createSlice`：維持 catalog 狀態與 reducer 定義集中管理
- `createEntityAdapter`：維持 products 的 `ids + entities` 標準化結構與 selectors
- `createAsyncThunk`：負責非同步 API 請求與 loading/error 狀態管理

這樣的組合可以讓我們先安全接上第一支 API，再逐步擴充到完整後端資料來源。

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
