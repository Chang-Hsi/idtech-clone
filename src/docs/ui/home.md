下面是一份可直接存成 `src/docs/pages/home.md` 的文件（符合你目前的首頁企劃 + 我補齊的官網對照內容），並且把「沒有圖片就用灰格留空」寫成**統一規則**（含 Tailwind class 範本）。

---

```md
# Home Page 規格與執行指南（home.md）

> 檔案位置：/src/docs/pages/home.md  
> 對應頁面：/src/pages/Home/HomePage.jsx  
> 目的：用靜態資料先完成官網風格的首頁資訊架構與互動，後續再替換為 API（後端 v2）

---

## 0. 開發原則

### 0.1 HomePage 的責任
- **只負責**：拼接區塊、讀取靜態資料、傳 props、（v2 再接 API）
- **不負責**：寫大量 UI 結構（UI 放在 components/home）

### 0.2 靜態資料放哪裡
- 首頁展示資料（輪播、use cases、featured products、news、表單欄位配置）**不放 Redux**
- 建議放在：
  - `/src/data/home/homeHero.js`
  - `/src/data/home/homeUseCases.js`
  - `/src/data/home/homeFeaturedProducts.js`
  - `/src/data/home/homeNews.js`
  - `/src/data/home/homeLeadForm.js`

### 0.3 缺圖處理（統一規則：沒有圖片就用灰格留空）
所有區塊若需要圖片，但資料缺少 `imageUrl` 或載入失敗，一律顯示灰格 placeholder。

**Placeholder UI 規範（Tailwind）**
- 容器固定比例：`aspect-[16/9]`（或依區塊需求）
- 背景：`bg-zinc-700/40`
- 邊框：`border border-white/10`
- 內容置中：`flex items-center justify-center`
- 文字：`text-white/40 text-sm`

範例 class：
- `className="aspect-[16/9] w-full rounded-sm border border-white/10 bg-zinc-700/40 flex items-center justify-center text-white/40 text-sm"`

---

## 1. 專案結構（Home 相關）

建議新增：
```

src/
  pages/
    Home/
      HomePage.jsx
  components/
    home/
      HeroCarousel.jsx
      UseCasesSection.jsx
      FeaturedProductsSection.jsx
      GetInTouchBanner.jsx
      AboutSection.jsx
      NewsSection.jsx
      LeadFormSection.jsx
  data/
    home/
      homeHero.js
      homeUseCases.js
      homeFeaturedProducts.js
      homeNews.js
      homeLeadForm.js

```

---

## 2. 首頁區塊總覽（由上到下）

### Section 1：HeroCarousel（100vh）
- 高度：`min-h-screen`（或 `h-screen`）
- 內容：輪播圖 + 文案 + CTA
- 互動：
  - 輪播切換（可先做自動輪播，或先做手動切換）
  - 每張 slide 出現後，文字分段動畫滑入（不同方向 + 延遲）

**建議的 slide 資料結構**
- `id`
- `title`（主標）
- `desc`（副標/描述）
- `primaryCta`：`{ label, to }`
- `secondaryCta`：`{ label, to }`（可選）
- `imageUrl`（可選，若無則用灰格留空）
- `textAlign`（可選：left/center）

**動畫規範（v1 不用外部動畫套件）**
- 用 class 切換做 transition：
  - title / desc / cta 分別有不同初始位移與 opacity
  - slide active 後加上進場 class

---

### Section 2：UseCasesSection（py-[6rem]）
- 高度：由內容撐開
- 外層 padding：`py-[6rem]`
- 內容建議：
  - 標題（例如：Accelerate Your Payments）
  - 副標描述
  - Use Case 卡片列表（6~8 張）

**卡片資料結構（建議）**
- `id`
- `title`
- `desc`（可短）
- `to`：導向 `/use-cases` 或 `/use-cases/:slug`
- `imageUrl`（可選，缺圖用灰格）

> 路由規範：Use Cases 走 `/use-cases`（alias solutions）

---

### Section 3：FeaturedProductsSection（py-[6rem]）
- 高度：由內容撐開
- 外層 padding：`py-[6rem]`
- 內容建議：
  - 標題：Featured Products
  - 4 張產品卡（v1 固定 4 張即可）
  - 區塊底部 CTA：導向 `/products`

**卡片資料結構（建議）**
- `id`
- `name`
- `desc`
- `to`：`/products/:slug`（或 v1 先導到 `/products`）
- `imageUrl`（可選，缺圖用灰格）

---

### Section 4：GetInTouchBanner（背景圖 + 置中文字 + 綠色按鈕）
- 高度：由內容撐開
- 外層：不需要 `py-[6rem]`
- UI：
  - 一張背景圖（缺圖用灰格）
  - 中央文字：`Get in touch!`
  - 綠色按鈕：`Let's Talk` → `/contact`

**規範**
- 背景圖：`bg-cover bg-center`
- 若沒圖：整段使用灰格 placeholder（同 0.3 規範），仍顯示文字與按鈕

---

### Section 5：AboutSection（py-[6rem]）
- 高度：由內容撐開
- 外層 padding：`py-[6rem]`
- 內容建議：
  - 標題：Why partner with us?（或 About Us）
  - 一段品牌/服務價值敘述
  - 3~4 個賣點（可搭配 icon）
  - 圖片（可選，缺圖用灰格）

**賣點資料結構（建議）**
- `id`
- `title`
- `desc`
- `iconName`（v1 先用文字或 emoji，也可用 icon library）

---

### Section 6：NewsSection（py-[6rem]）
- 高度：由內容撐開
- 外層 padding：`py-[6rem]`
- 內容建議：
  - 標題：News
  - 3 張卡片（含 title / excerpt / date / read more）
  - `Read More` 可導向 `/resources/press-releases`（或 `/resources`）

**卡片資料結構（建議）**
- `id`
- `title`
- `excerpt`
- `date`（字串即可）
- `to`
- `imageUrl`（可選，缺圖用灰格）

---

### Section 7：LeadFormSection（py-[6rem]）
- 高度：由內容撐開
- 外層 padding：`py-[6rem]`
- 功能：發送訊息（v1 只做前端驗證 + console.log，不接後端）
- 欄位建議（v1 可先做基本版）：
  - First Name
  - Last Name
  - Email
  - Company（可選）
  - Phone（可選）
  - Region（select）
  - Message / Comments（textarea）
  - Submit

**驗證規範（v1）**
- 必填：First Name、Last Name、Email、Region、Message
- Email 格式檢查
- Submit 行為：
  - 驗證通過：`console.log(payload)` + 顯示成功提示（先用簡單文字即可）

---

## 3. 與 Header Search 規格相容（/?s=keyword）

Header 已規劃 Search 送出到：
- `/?s=keyword`

首頁需相容：
- HomePage 讀取 query `s`
- 若 `s` 存在：
  - v1 建議顯示一個「Search Results 區塊」或「Nothing Found」
  - 可以先簡單做：永遠顯示 `Nothing Found`（等你把資料完善再做搜尋）

> 目標：讓面試展示時，Search 行為是完整閉環（URL 有變化、頁面有反饋）。

---

## 4. UI 統一規範（v1）

### 4.1 容器寬度
- 建議統一用：`max-w-7xl mx-auto px-6`
- 各 section 內都包同一層 container（保持對齊）

### 4.2 色彩與 hover
- 主色（綠）：`#7DC242`
- 深色底：Header 同系統色（例如 `#1F2328`、`#2B3036`）
- 卡片 hover：邊框或文字變綠即可

### 4.3 不做 mobile
- v1 只做 Desktop
- 可先在 layout 上加 `lg:` 為主的樣式
- mobile 後續另開 v2 文件

---

## 5. 完成標準（Done Criteria）
- 7 個區塊都存在，順序與 spacing 符合規劃
- 缺圖時會顯示灰格 placeholder（不破版）
- CTA 跳轉正確：
  - Hero CTA（若有）
  - Featured Products → `/products`
  - Get in touch → `/contact`
- `/?s=` 能觸發首頁顯示「Search 結果區塊 / Nothing Found」

---
```
