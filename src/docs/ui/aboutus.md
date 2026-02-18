# About Us 頁面企劃（IDT-6）

## 1. 頁面目標
- 建立 `AboutUsPage`（路由：`/company/about-us`）。
- `AboutUsPage.jsx` 僅負責拼接，不放資料與細節 UI。
- 延續既有架構：`pages` 拼接、`components` 呈現、`data` 管內容。

## 2. 區塊結構（固定順序）
1. Hero
2. Who We Are（Intro）
3. Highlights（Mission / Innovation）
4. Innovation Timeline
5. Where to Find Us（Connect Info）

## 3. 建議目錄

### 3.1 Page
- `src/pages/Company/AboutUsPage.jsx`

### 3.2 Components
- `src/components/company/aboutus/AboutUsHeroSection.jsx`
- `src/components/company/aboutus/AboutUsIntroSection.jsx`
- `src/components/company/aboutus/AboutUsHighlightsSection.jsx`
- `src/components/company/aboutus/AboutUsInnovationTimelineSection.jsx`
- `src/components/company/aboutus/AboutUsConnectInfoSection.jsx`

### 3.3 Data
- `src/data/company/aboutUs.js`

## 4. 資料模型（落地版）
```js
export const aboutUsPageContent = {
  hero: {
    eyebrow: 'ABOUT US',
    title: '...',
    subtitle: '...',
    description: '...',
    imageUrl: '...',
  },
  intro: {
    title: 'Who We Are',
    paragraphs: ['...', '...'],
    imageUrl: '...',
  },
  highlights: [
    { id: 'mission', eyebrow: 'MISSION STATEMENT', title: '...', imageUrl: '...' },
    { id: 'innovation', eyebrow: 'COMPANY INNOVATION', title: '...', imageUrl: '...' },
  ],
  innovationTimeline: {
    title: 'INNOVATION',
    items: [
      { year: '2017', title: '...', description: '...' },
      { year: '2019', title: '...', description: '...' },
    ],
  },
  connectInfo: {
    title: 'Where to Find Us',
    description: '...',
    items: [
      { label: 'Headquarters', value: '...' },
      { label: 'Email', value: '...' },
      { label: 'Phone', value: '...' },
    ],
    mapUrl: 'https://maps.google.com/...',
  },
}
```

## 5. UI / 動畫規範
- Hero 區塊 UI 參考：`src/components/usecases/detail/UseCaseDetailHeroSection.jsx`
- 動畫沿用 `useInViewOnce` + `index.css`：
  - Hero：`fade-left-in`
  - Intro：圖片 `fade-right-in`、文字 `fade-left-in`
  - Highlights：`fade-up-in` stagger
  - Timeline：標題 `fade-up-in`，節點 `fade-up-in` stagger
  - Connect Info：`fade-up-in`
- 圖片缺失 fallback：灰格 placeholder。

## 6. RWD 規範
- Hero：沿用現有 detail hero 響應式字級。
- Intro：`lg` 雙欄、mobile 單欄。
- Highlights：`lg` 兩欄、mobile 單欄。
- Timeline：
  - `lg`：橫向時間軸（含主線與節點）
  - `mobile`：改直向卡片清單（避免橫向滾動與 scroll 攔截）
- Connect Info：`lg` 三欄、`sm` 兩欄、mobile 單欄。

## 7. SEO / 文案層
- `title`: `About Us | IDTECH Clone`
- `description`: `Learn about our team, values, and how we build scalable payment products.`

## 8. 驗收條件
- `/company/about-us` 可正確顯示五個區塊。
- 所有文案與圖片皆由 `src/data/company/aboutUs.js` 提供。
- 動畫在進入視圖時播放一次。
- Timeline 在桌機為橫向時間軸、手機為直向清單。
- 手機與桌機版面無明顯溢出。
