# Products 規劃（v1）

## 1. 目標

- 做出「產品入口 Hub → 系列/平台集合頁 → 產品內頁」的完整資訊架構
- 內容不搬運原站文案/圖片，使用自寫描述 + 示意圖/替代圖
- 面試可展示：路由設計、資料模型、Redux 資料流、SEO、測試、效能

---

## 2. 頁型與路由

### 2.1 Products Hub（導覽入口）

- 路由：`/products`
- 用途：提供所有「集合入口」與「快速導覽」
- 區塊：
  - Hero（Products）
  - Collections grid（參考 Header 的 Products 子項目）
  - CTA（Full Catalog / Contact）

### 2.2 Collection（平台/系列集合頁）

- 路由：`/products/collections/:collectionSlug`
- 範例：`/products/collections/neo-3`
- 用途：敘事型外頁 + 精選產品清單
- 區塊（建議固定順序）：
  1. Hero（主標 + 副標 + 圖）
  2. Intro（1 段文字）
  3. Value Props（3~5 點）
  4. Featured Products（卡片清單，點擊進產品內頁）
  5. Resources / Downloads（brochure/whitepaper mock links）
  6. CTA（Contact / Request Help）

### 2.3 Product Detail（產品內頁）

- 路由：`/products/:productSlug`
- 用途：統一模板呈現產品資訊
- 區塊（以資料驅動顯示/隱藏）：
  1. Hero（產品名 + tagline + 主圖）
  2. Intro（段落 + bullets）
  3. Downloads（datasheet / KB）
  4. Use Cases / Industries（tags 或圖示）
  5. Specs（表格）
  6. Key Features（清單）
  7. Related Products（同 collection / 同 useCase）
  8. CTA Form（Tell me more）

### 2.4 路由設計原則

- Collection 與 Product 不可共用同一層動態 segment，避免衝突
- 以語意前綴解耦：`collections/:collectionSlug` 與 `:productSlug`
- 無效 slug 一律導向 `NotFound`

---

## 3. 資料模型（建議 JS module + mock）

> 建議使用 JS module（非純 JSON），才能直接 import 靜態資產，避免部署路徑問題。

### 3.1 products（產品）

欄位建議：

- id
- slug # productSlug
- name
- tagline
- shortDescription
- bullets: []
- collectionSlugs: [] # e.g. ["neo-3", "mobile-payment"]
- useCases: [] # e.g. ["parking", "vending"]
- downloads: { datasheetUrl, kbUrl }
- media: { heroImageUrl, gallery: [] }
- specs: [{ key, value }]
- features: []
- relatedSlugs: [] # 可選：手動指定更精準

### 3.2 collections（集合/平台）

- slug # collectionSlug
- name
- heroTitle
- heroSubtitle
- intro
- valueProps: []
- featuredSlugs: [] # 精選產品順序
- resources: [{ title, url }]
- seo: { title, description }

### 3.3 資料存放建議

- `src/data/products/products.js`
- `src/data/products/collections.js`
- 若要分檔可用：`src/data/products/collections/<slug>.js`

---

## 4. Redux / 資料流

### 4.1 catalogSlice

- productsById / productIds（建議 `createEntityAdapter`）
- collectionsBySlug
- status: idle/loading/success/error
- selectors:
  - selectProductBySlug(state, productSlug)
  - selectCollectionBySlug(state, collectionSlug)
  - selectProductsByCollection(state, collectionSlug)
  - selectRelatedProducts(state, productSlug)

### 4.2 uiSlice

- headerVariant（首頁透明/內頁固定）
- mobileNavOpen
- toastQueue

### 4.3 URL 與 Redux 職責切分

- URL 管：路由 slug、排序、篩選 query
- Redux 管：跨頁共享 catalog/compare/loading 狀態
- 元件 local state 管：單頁互動（accordion、tab、hover）

---

## 5. SEO

- Hub / Collection / Product 都要有動態 title/description/canonical
- 產出 sitemap.xml（至少包含 hub、collections、products）
- robots.txt（允許索引）

---

## 6. 測試

- Unit：selectors、filter、slug 工具
- Component：ProductCard、Collection Hero、Featured list、Specs table
- E2E：
  - /products → /products/collections/:collectionSlug → /products/:productSlug → related products
  - 404

---

## 7. 效能

- 路由 lazy load
- 圖片 lazy
- bundle analyze
- Lighthouse 截圖存檔

---

## 8. 實作優先順序（建議）

1. 路由骨架：Hub / Collection / Product
2. data mock + selectors（先不做 API）
3. Products Hub（可用）
4. Collection Page（可用）
5. Product Detail（可用）
6. SEO + 測試 + 效能收尾
