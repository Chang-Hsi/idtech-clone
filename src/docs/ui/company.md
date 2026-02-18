# Company 頁面企劃（IDT-6）

## 1. 頁面目標

- 建立 Company 主頁（`/company`）。
- `CompanyPage` 僅負責拼接區塊。
- 版型與動畫風格對齊 UseCases。

## 2. 路由規則

- 入口頁：`/company`
- 卡片導向內部頁面：
  - `/company/about-us`
  - `/company/careers`

## 3. 頁面組成

### 3.1 `pages/Company/CompanyPage.jsx`

- 只做拼接：
  - `CompanyHeroSection`
  - `CompanyGridSection`

### 3.2 `components/company/CompanyHeroSection.jsx`

- UI 參考：`UseCasesHeroSection`
- 動畫：與 UseCases 相同（`fade-left-in`）
- 內容：
  - 小標（COMPANY）
  - 主標
  - 簡介文案

### 3.3 `components/company/CompanyGridSection.jsx`

- UI 參考：`UseCasesGridSection`
- 動畫：與 UseCases 相同（`zoom-in-title` + stagger）
- 卡片內容：
  - 背景圖（缺圖使用灰格）
  - 標題
  - 簡介
- 點擊行為：
  - `to` 有值：導向內部路由
  - `to` 缺失：導向 `#`

## 4. 資料來源規範

- 資料檔：`src/data/company/company.js`（本任務內建立）
- `components/company/*` 不寫死文案，統一從 data 讀取。

## 5. RWD 規範

- Hero：沿用 UseCases 響應式字級。
- Grid：
  - `grid-cols-1`（mobile）
  - `sm:grid-cols-2`
  - `lg:grid-cols-3`（若卡片數量擴充時可直接撐開）
- 圖片比例：建議沿用 `aspect-[16/10]`。

## 6. 動畫規範

- 使用既有 `useInViewOnce`。
- Hero 文案：`fade-left-in`。
- Grid 卡片：`zoom-in-title` + `animationDelay` 漸進進場。
- 保持「進入視圖後執行一次」原則。

## 7. SEO / 文案層

- 建議頁面 SEO：
  - `title`: `Company | IDTECH Clone`
  - `description`: `Explore company overview, team values, and career opportunities.`
- Hero 文案建議：
  - `eyebrow`: `COMPANY`
  - `title`: `Build with a Team Focused on Payment Excellence`
  - `description`: `Learn who we are, how we work, and why enterprise teams choose us for long-term payment programs.`

## 8. 驗收條件

- `/company` 可正常顯示 Hero + Grid。
- 卡片點擊可正確導向 `/company/about-us`、`/company/careers`。
- `to` 缺失卡片可安全導向 `#`（不報錯）。
- 動畫與 UseCases 風格一致。
- 手機與桌機版面正常。
