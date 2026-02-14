# Header 規格與執行指南（ID TECH 風格）

> 文件位置：/src/docs/ui/header.md  
> 範圍：Desktop only（v1 不做 mobile header）  
> 目標：做出與 ID TECH 官網相同風格的 Header（導覽 + 下拉 + 搜尋條 + 首頁特有的收合行為）

---

## 1. 視覺結構（Layout）

### 1.1 區塊分佈（Flex）
- 左側：Logo（點擊回首頁 `/`）
- 右側：主導覽選單（五項）
  - Products
  - Use Cases
  - Support
  - Resources
  - Company
- 最右側操作區：
  - Contact（描邊按鈕）
  - Search（放大鏡 icon）

> 版面規則：全程使用 Flex，不使用 Grid。

---

## 2. 導覽與路由對應（Router Map）

### 2.1 主選單路由（以本專案規格）
- Products → `/products`
- Use Cases → `/use-cases`（**alias 到** `/solutions`）
- Support → `/support`
- Resources → `/resources`
- Company → `/company`
- Contact（按鈕）→ `/contact`
- Search（icon）→ 展開搜尋條（見第 4 節）

### 2.2 Products Dropdown（統一導到 /products + query）
Products 下拉選單（Desktop hover）項目如下（先做靜態清單，後續可用資料檔生成）：
- Full Product Catalog → `/products`
- NEO 3 Platform of Products → `/products?category=neo3`
- EMV Common Kernel → `/products?category=emv-kernel`
- Unattended Payment Solutions → `/products?category=unattended`
- Mobile Payment Devices → `/products?category=mobile`
- Countertop Solutions → `/products?category=countertop`
- OEM Payment Products → `/products?category=oem`
- Legacy Products → `/products?category=legacy`
- Software Services → `/products?category=software-services`

> 規則：Products dropdown **不做獨立頁**，全部統一到 `/products`，透過 query 變化來切分類別。

---

## 3. 互動行為（Hover / Active / Dropdown）

### 3.1 主選單 hover 行為（Desktop）
- 滑鼠移入主選單項目時：
  - 該項目文字變為綠色
  - 顯示對應的 dropdown（若該項目有 dropdown）
- dropdown 項目 hover：
  - 文字變為綠色
- 滑鼠移出導覽區域 / 點擊頁面其他區域：
  - dropdown 關閉

### 3.2 Contact 按鈕
- 預設：白色描邊、白字（深色背景）
- hover：字/框變綠色
- click：導向 `/contact`

### 3.3 Active 狀態（目前頁面高亮）
- 當目前路由屬於某主選單時，該主選單保持 active 樣式（綠字或等價呈現）
- 對應規則：
  - `/products` 與 `/products/:slug` → Products active
  - `/solutions/*` 或 `/use-cases/*` → Use Cases active
  - `/support/*` → Support active
  - `/resources/*` → Resources active
  - `/company/*` → Company active
  - `/contact` → Contact active（按鈕呈 active）

---

## 4. Search（搜尋圖標 → 展開搜尋條）

### 4.1 行為描述
- 點擊 Search icon：
  - Header 下方展開搜尋條（全寬、深灰底）
  - 左側 placeholder：`Search...`
  - 右側提供 close（X）關閉
- 送出搜尋（Enter 或點擊 icon）：
  - URL 變成 `/?s=keyword`（仿原站）

### 4.2 本專案策略（仿原站 URL）
- 搜尋結果頁採用：`/?s=keyword`
- 表現形式：
  - 可以由 HomePage（或獨立 SearchResults 組件）判斷 `s` query 是否存在來顯示結果區塊
  - 若無結果：顯示 `Nothing Found` 區塊（仿截圖樣式）

> 注意：這裡是前端站內搜尋框架（mock data filter），不是爬官網資料。

---

## 5. 滾動行為（Scroll：縮小 + 首頁收合）

### 5.1 共用規則：Compact（所有頁都會縮小）
- scroll 往下超過門檻後：
  - Header 高度變矮
  - 內部元素（logo/字級/padding）縮小一點點
- 建議門檻：固定像素 threshold（例如 80px）

### 5.2 首頁專屬：Hide on scroll down（只有首頁會收起）
- 只有在首頁（path === `/`）：
  - 往下滑動、且超過更高門檻時（例如 160px）：
    - Header slide up 完全收起（translateY(-100%)）
  - 往上滑動時：
    - Header slide down 顯示回來

### 5.3 非首頁：不收起
- 非首頁路由：
  - 只做 compact（變矮）
  - 不做 slide up 收起

### 5.4 Search 條與 Header 隱藏的關係
- Header 被收起時（只會發生在首頁）：
  - **Search 條不強制關閉**（維持你要求的行為）

---

## 6. Icon 方案（不手刻 SVG）

建議擇一：
- `lucide-react`（線條一致、簡潔）
- 或 `react-icons`

> v1 建議直接用 `lucide-react` 的 Search / X icon。

---

## 7. 狀態管理（Redux vs Local State）

### 7.1 建議放 Redux（全站 UI 狀態）
- `isSearchOpen`：搜尋條是否展開
- `searchKeyword`：搜尋輸入（可選）
- `header.isCompact`（可選，不一定要放 Redux）
- `header.isHidden`（只首頁用；可選）

> 如果你想保持簡單：scroll 狀態放 Header local state 即可；搜尋是否展開可放 Redux（因為它是全站共用操作）。

### 7.2 建議用 local state（暫態狀態）
- `activeDropdownKey`：目前 hover 的主選單 key
- dropdown 開關（由 activeDropdownKey 推導）

---

## 8. 測試清單（最低要做）
- render：Logo / nav / Contact / Search 存在
- hover Products：dropdown 出現；移出消失
- 點擊 Contact：導到 `/contact`
- 點擊 Search icon：search bar 出現；點 X 關閉
- submit search：URL 變成 `/?s=xxx`
- scroll（首頁）：compact 生效、再往下 hidden 生效、往上顯示回來
- scroll（非首頁）：只 compact，不 hidden

---

## 9. Done Criteria（完成標準）
- hover 綠色 + dropdown 行為一致
- Contact hover/active/跳轉正常
- Search 條展開/關閉/送出 URL 正常
- scroll 行為符合：全頁 compact、首頁才 hide/show
