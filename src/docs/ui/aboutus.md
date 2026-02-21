# About Us 頁面企劃（IDT-6，落地更新）

## 1. 目標與現況
- 路由：`/company/about-us`
- Page 組裝：`src/pages/Company/AboutUsPage.jsx`
- 區塊順序：Hero -> Intro -> Highlights -> Innovation Timeline -> Connect Info
- 前台資料來源以 API 為主，靜態檔為 fallback（避免 API 異常導致白屏）。

## 2. 前後台整體落地做法

### 2.1 前台（idtech-clone）
- `AboutUsPage` 只負責拼接與觸發載入。
- 透過 Redux `catalogSlice` 呼叫 `loadAboutUsPageFromApi()` 載入資料。
- API：`/api/company/about-us`（`src/api/catalogApi.js`）。
- 若 API 失敗，回退 `src/data/company/aboutUs.js` 既有內容。

### 2.2 後端（idtech-clone-api）
- 提供 About Us page payload，結構含：
  - `hero`
  - `intro`
  - `highlights[]`
  - `innovationTimeline.items[]`
  - `connectInfo.offices[]`
- `innovationTimeline.items[].year` 使用 decade 字串（如 `1990s`, `2000s`, `2010s`, `2020s`）。

### 2.3 後台（idtech-clone-backstage）
- 編輯頁：`src/components/pages/company/AboutUsPageEditor.jsx`
- 已導入 schema-driven 驗證（依 backstage README 的機制）：
  - `useFormValidation`
  - `validateSchema / validateSchemaField`
  - 專屬 schema：`src/components/pages/company/AboutUsPageEditor.schema.js`
- Save 前做整頁驗證，錯誤顯示摘要。

## 3. 後台 UI/UX 落地（本次更新）

### 3.1 Intro / Highlights
- `Image URL` 後新增 `Background Preview`。
- 預覽狀態支援：空值 / 載入中 / 載入失敗 / 成功。

### 3.2 Innovation Timeline
- 類表格式列表（橫向欄位 + 分隔線）取代舊 inline 表單。
- 每列操作：Drag / Edit / Delete。
- `Add`、`Edit` 改為彈窗流程。
- `Year / Decade` 使用 `DropdownSelect`，只提供 decade 選項：
  - `1990s`, `2000s`, `2010s`, `2020s`（上限為當前 decade）。
- 保留拖曳排序限制，避免年代順序錯亂；移除 `Auto Sort by Year` 按鈕。

### 3.3 Offices
- 改為類表格式列表（欄位摘要 + 分隔線）。
- 每列操作：Drag / Edit / Delete。
- `Add`、`Edit` 改為彈窗編輯（不再 inline 改欄位）。
- 彈窗含基本欄位驗證與 href 格式檢查。

## 4. 前台時間軸顯示落地
- 檔案：`src/components/company/aboutus/AboutUsInnovationTimelineSection.jsx`
- 問題：資料筆數增加時，中軸線未延長。
- 修正：時間軸容器改為 `w-max min-w-[156rem]`，使主線寬度可隨內容延展。
- 結果：新增 timeline item 時，中軸線與節點可同步延長。

## 5. 驗收標準（更新版）
- `/company/about-us` 五大區塊正常顯示。
- 前台可成功讀取 API，API 異常時可 fallback。
- 後台可新增/編輯/刪除/拖曳 Timeline 與 Offices。
- Timeline 年代輸入只能透過 decade 下拉選單。
- 前台時間軸新增資料後主線不截斷。
