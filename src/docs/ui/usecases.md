## Use Cases UI 企劃（v1）

本文件記錄目前已完成的 Use Cases 主頁規劃與實作對齊內容。  
`UseCasesDetail` 尚未開工，本文件暫不描述 detail UI。

---

## 1. 命名與路由調整

### 1.1 命名修正

- 原本 `SolutionsPage / SolutionDetailPage` 命名不精準
- 已改為：
  - `UseCasesPage`
  - `UseCasesDetailPage`

### 1.2 Router 調整

- `path: 'use-cases'`
- `path: 'use-cases/:slug'`

---

## 2. 頁面結構（已完成）

`src/pages/UseCases/UseCasesPage.jsx` 採用拼接式 page，僅負責組裝區塊：

1. `UseCasesHeroSection`
2. `UseCasesGridSection`

---

## 3. 元件目錄規劃

已建立：

- `src/components/usecases/UseCasesHeroSection.jsx`
- `src/components/usecases/UseCasesGridSection.jsx`
- `src/components/usecases/detail/`（先建立資料夾，UI 後續）

---

## 4. Hero 區塊設定（已完成）

### 4.1 視覺風格

`UseCasesHeroSection` 已對齊 `ProductsHeroSection`，統一品牌風格：

- 黑底
- 綠色小標
- 大標題 + 說明文字
- 中間綠色分隔線

### 4.2 動畫效果

使用 `useInViewOnce` + `index.css` 動畫 class：

- 小標：`fade-left-in`（delay 80ms）
- 標題：`fade-left-in`（delay 220ms）
- 內文：`fade-left-in`（delay 360ms）

---

## 5. Grid 區塊設定（已完成）

### 5.1 資料來源

- 使用 `src/data/home/homeUseCases.js`

### 5.2 UI 風格

`UseCasesGridSection` 已對齊 `ProductsCollectionsGridSection`：

- 卡片固定高度（`h-[320px]`）
- 圖片填滿 + hover 放大（`scale-125`）
- 黑色遮罩層
- 中央置中白色標題

### 5.3 進場動畫

使用 `useInViewOnce` 觸發卡片逐一進場：

- class：`zoom-in-title`
- stagger：`animationDelay: index * 120ms`
- 提早觸發設定：
  - `threshold: 0.01`
  - `rootMargin: '0px 0px 20% 0px'`

---

## 6. 後續（未開工）

### 6.1 頁面責任

- `UseCasesDetailPage` 與其他 page 一致，僅負責拼接區塊，不承載複雜 UI 細節。

預計拼接順序：

1. `UseCaseDetailHeroSection`
2. `UseCaseDetailIntroSection`
3. `UseCaseDetailFeaturedProductsSection`

### 6.2 區塊規劃（v1）

#### A. Hero

- 風格參考 `ProductDetailHeroSection`
- 黑底、主標、副標、描述、CTA（如有）
- 進場沿用 `useInViewOnce` + `index.css` 既有動畫 class

#### B. Intro（交錯圖文）

- 內容為多行段落（rows）
- 版型規則：
  - 第 1 行：左圖右文
  - 第 2 行：左文右圖
  - 之後依序交錯

#### C. Featured Products

- 白色背景
- Grid 卡片列表
- 卡片無邊框
- 卡片顯示：產品標題、產品說明
- 點擊導向對應產品頁：`/products/:productSlug`

### 6.3 資料關聯策略（本次決議）

為了保持邏輯清晰、避免回頭大改既有產品資料，採用：

- 在 `data/usecases` 單向定義 use case 與產品關聯
- 不回改 `products` 既有資料結構新增 `useCase` 屬性（暫不做雙向關聯）

#### 建議資料模型（`data/usecases`）

每筆 use case 建議至少包含：

- `slug`
- `hero`（title/subtitle/description/background）
- `introRows`（交錯圖文資料）
- `featuredProductSlugs`（此 use case 關聯的產品 slug 陣列）

示意：

```js
{
  slug: 'unattended',
  hero: { ... },
  introRows: [
    { imageUrl: '...', title: '...', desc: '...' },
    { imageUrl: '...', title: '...', desc: '...' },
  ],
  featuredProductSlugs: ['unattended', 'emv-kernel', 'oem']
}
```

### 6.4 Featured Products 如何取資料

- 以 `featuredProductSlugs` 去 Redux catalog products 查對應產品
- 卡片跳轉一律使用產品自身 `slug`
- 即：`to: /products/${product.slug}`

此策略可確保：

- Use case 與產品關聯集中管理
- 跳轉路徑一致且穩定
- 未來若改 API，僅需替換資料來源，不需重寫頁面邏輯

### 6.5 待辦

- `components/usecases/detail/*` 區塊拆分實作
- 詳細頁動畫與 RWD 完整調校
