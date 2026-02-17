# Resources 頁面企劃（v1）

## 1. 目標
- 建立文章列表頁（Resources Hub）與文章內頁（Article Detail）。
- 架構延續現有專案慣例：`pages` 只負責拼接，UI 區塊放 `components`，資料放 `src/data/resources/`。
- 支援文章中英文切換（點擊切換）。

## 2. Header 規則
- `Resources` 第一個導航維持內部路由：`/resources`。
- 第二個導航改名 `Blog`，外部新分頁：`https://chang-hsi.github.io/my-blog/`。
- 其他 `Resources` 子項移除。

## 3. 路由規劃
- `/resources`：文章清單主頁（ResourcesPage）。
- `/resources/:articleSlug`：文章內頁（ResourceArticlePage）。

## 4. 頁面與元件分工

### 4.1 `pages/Resources/ResourcesPage.jsx`
- 只做拼接：
  - `ResourcesHeroSection`
  - `ResourcesGridSection`

### 4.2 `pages/Resources/ResourceArticlePage.jsx`
- 只做拼接：
  - `ResourceArticleHeroSection`（可先與內文合併，v1 簡化）
  - `ResourceArticleContentSection`

### 4.3 `components/resources/`
- `ResourcesHeroSection.jsx`：Banner（風格參考 `UseCaseDetailHeroSection`）。
- `ResourcesGridSection.jsx`：文章卡片清單（風格參考 `UseCaseDetailFeaturedProductsSection`）。

### 4.4 `components/resources/detail/`
- `ResourceArticleContentSection.jsx`：渲染文章內容與語言切換按鈕。

## 5. 資料放置與模型（不新增 Redux）

### 5.1 資料位置
- `src/data/resources/articles.js`（只放 metadata）
- `src/content/resources/*.md`（實際文章內容）

### 5.2 建議資料結構（v1）
```js
export const resourceArticles = [
  {
    slug: 'developing-for-emv-part-1',
    coverImageUrl: '/src/assets/resources/emv-part-1.jpg',
    publishedAt: '2026-02-17',
    category: 'EMV',
    translations: {
      en: {
        title: 'Developing for EMV, Part I',
        excerpt: '...',
        markdownPath: '/src/content/resources/developing-for-emv-part-1.en.md',
      },
      zh: {
        title: 'EMV 開發（上）',
        excerpt: '...',
        markdownPath: '/src/content/resources/developing-for-emv-part-1.zh.md',
      },
    },
  },
]
```

### 5.3 Markdown 策略
- 每篇文章使用兩份檔案：`.en.md` 與 `.zh.md`。
- 文章內容與 React 元件分離，便於長文維護與版本比對。
- 內頁依 `lang` 選擇對應 markdown 檔並渲染。

## 6. 中英文切換方案（建議）

### 6.1 v1 做法（推薦）
- 使用 query string 控制語言：`?lang=zh` / `?lang=en`。
- 預設語言：`zh`。
- 使用者點擊切換按鈕後：
  - 更新 URL query（可分享同語言連結）
  - 寫入 `localStorage`（下次進站沿用）

### 6.2 為什麼用 query + localStorage
- URL 可分享、可回到同語言文章。
- 不需新增 Redux，就能保持狀態可追蹤。
- 後續若要升級 i18n 套件或多語 SEO，改造成本低。

## 7. 實作步驟（IDT-4）
1. 調整 Header 的 Resources 子選單（Resources + Blog）。
2. 建立 `src/data/resources/articles.js`（metadata）與 `src/content/resources/*.md`（文章內容），先放 3 篇文章假資料（中英各一份）。
3. 完成 `ResourcesPage`：Hero + Grid，卡片點擊進 `/resources/:articleSlug`。
4. 建立 `ResourceArticlePage` 與 `ResourceArticleContentSection`。
5. 實作語言切換（`lang` query + localStorage）。
6. 補齊 404 fallback（slug 找不到時顯示 Not Found）。

## 8. Redux 是否需要
- 目前不需要新增 Resources 專用 Redux。
- 原因：目前是靜態內容、無複雜跨頁寫入狀態、無 API 載入壓力。
- 需要 Redux/RTK Query 的時機：要接 API、做分頁搜尋篩選、或多頁共享查詢狀態。

## 9. Prev / Next 導航實作思路
目標：在文章底部提供「上一頁 / 下一頁」切換，且保留目前語言（`lang`）。

### 9.1 核心前提
- `resourceArticles` 本身就是有順序的陣列。
- 文章路由為 `/resources/:articleSlug`。
- 當前文章 slug 來自 `useParams()`。

### 9.2 計算流程
1. 用 `findIndex` 找目前文章在陣列中的位置：
```js
const currentIndex = resourceArticles.findIndex((item) => item.slug === articleSlug)
```
2. 如果 `currentIndex > 0`，上一頁存在，取 `currentIndex - 1`。
3. 如果 `currentIndex < resourceArticles.length - 1`，下一頁存在，取 `currentIndex + 1`。
4. 不存在時給 `null`（第一篇沒有 Prev，最後一篇沒有 Next）。

### 9.3 保留語言參數
- 目前語言由 query 取得（例如 `?lang=zh`）。
- 組 href 時把語言帶上：
```js
const withLang = (slug) => `/resources/${slug}?lang=${activeLang}`
```
- 這樣從 Part I 切到 Part II 時，語言不會跳回預設值。

### 9.4 元件責任分工
- `ResourceArticlePage.jsx`：負責算 `prevArticle` / `nextArticle` 與 `href`。
- `ResourceArticleContentSection.jsx`：只負責 UI 渲染（左箭頭 Prev、右箭頭 Next、disabled 狀態）。

### 9.5 邊界情境
- `slug` 找不到：顯示 `Article Not Found`。
- 第一篇：Prev 顯示 disabled 樣式。
- 最後一篇：Next 顯示 disabled 樣式。
- 指定語言不存在：fallback 到 `zh`（或預設語言）。
