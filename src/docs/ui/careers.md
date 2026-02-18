# Careers 頁面企劃（IDT-6 後續）

## 1. 目標
- 建立職業機會入口頁與職缺內頁。
- `pages` 只負責拼接，資料由 `src/data/company/careers.js` 提供。
- 先做可用 v1：列表、篩選、詳情骨架、申請表單 UI。

## 2. 路由規劃
- `/company/careers`：職缺列表頁（CareersPage）
- `/company/careers/:jobSlug`：職缺內頁（CareerDetailPage）

## 3. 頁面組成

### 3.1 CareersPage（列表頁）
- Hero（風格參考 Company Hero）
- Intro（長文介紹 + `Submit Resume` 按鈕）
- Openings Grid（含 Tab 篩選）

### 3.2 CareerDetailPage（職缺內頁）
- 左卡片：
  - Breadcrumb
  - 職稱（title）
  - 副標：`FULL-TIME | City, Country`
  - 業務需求說明（summary）
  - `Job Duties`（`ul/li`）
  - `Qualifications`（`ul/li`）
- 右卡片（申請表單 UI）：
  - First Name / Last Name / Email / Phone
  - Upload Resume（只允許 `.pdf`, `.doc`, `.docx`）
  - `I'm not a robot`（沿用目前 UI 樣式，v1 先不接真 reCAPTCHA）
  - `Submit Application` 按鈕

## 4. 元件結構建議

### 4.1 列表頁
- `src/components/company/careers/CareersHeroSection.jsx`
- `src/components/company/careers/CareersIntroSection.jsx`
- `src/components/company/careers/CareersOpeningsSection.jsx`

### 4.2 內頁
- `src/components/company/careers/detail/CareerDetailMainSection.jsx`
- `src/components/company/careers/detail/CareerDetailApplyCard.jsx`

## 5. 資料來源與模型
- 檔案：`src/data/company/careers.js`

### 5.1 建議資料模型（v1）
```js
export const careersPageContent = {
  hero: {
    eyebrow: 'CAREERS',
    title: 'Join Us to Build the Future of Payments',
    description: '...',
    imageUrl: '...',
  },
  intro: {
    title: 'Work With Us',
    paragraphs: ['...', '...'],
    submitResumeEmail: 'careers@idtechproducts.com',
  },
  tabs: [
    { key: 'all', label: 'Show all' },
    { key: 'tw', label: 'Taiwan' },
    { key: 'us', label: 'United States' },
    { key: 'jp', label: 'Japan' },
  ],
}

export const careersJobs = [
  {
    id: 'senior-sre-engineer',
    slug: 'senior-sre-engineer',
    title: 'Senior SRE Engineer',
    region: 'Taiwan',
    countryCode: 'tw',
    employmentType: 'FULL-TIME',
    locationLabel: 'Taoyuan, Taiwan',
    summary: '...',
    jobDuties: ['...', '...'],
    qualifications: ['...', '...'],
    applyEmail: 'careers@idtechproducts.com',
    isOpen: true,
  },
]
```

## 6. 篩選規則（Tab）
- `Show all`：顯示全部 `isOpen === true` 的職缺
- 其他 Tab：依 `countryCode` 篩選（`tw`, `us`, `jp`）
- 若篩選後無資料，顯示 empty state：
  - `No openings in this region yet.`

## 7. UI / 動畫規範
- Hero 動畫：沿用 `fade-left-in`
- Intro 動畫：`fade-left-in` / `fade-up-in`
- Grid 卡片：參考 `CompanyGridSection`，卡片進場使用 `zoom-in-title` + stagger
- Detail 左右卡：`fade-left-in` / `fade-right-in`

## 8. 表單規範（v1）
- `Upload` 限制副檔名：`.pdf`, `.doc`, `.docx`
- v1 為前端 UI 流程，不做真檔案上傳與後端提交
- `I'm not a robot` 為 UI 假件（不接 Google reCAPTCHA）

## 9. 命名與文案修正
- `Submite Resume` -> `Submit Resume`
- `Sublit Application` -> `Submit Application`

## 10. SEO 建議
- 列表頁：
  - `title`: `Careers | IDTECH Clone`
  - `description`: `Explore open roles across Taiwan, United States, and Japan.`
- 內頁：
  - `title`: `${job.title} | Careers | IDTECH Clone`
  - `description`: `${job.title} role details, duties, and qualifications.`

## 11. 驗收條件
- `/company/careers` 顯示 Hero、Intro、Openings Grid。
- Tab 可正確篩選職缺。
- 卡片可導向 `/company/careers/:jobSlug`。
- 內頁可顯示完整職缺內容與申請表單 UI。
- 表單上傳欄位僅允許指定格式。
