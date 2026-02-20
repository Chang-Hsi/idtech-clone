# Contact 頁面企劃（IDT-17）

## 1. 範圍與原則

- `ContactPage.jsx` 只負責頁面拼接，不放資料處理邏輯。
- 先做靜態頁，不串接 API。
- 內容資料由 `src/data/contact/` 提供，後續可平滑改為 API。
- 拆成 3 個區塊元件：
  - `HeroSection`
  - `AddrInfoSection`
  - `FormSection`

## 2. 檔案規劃

- Page: `src/pages/Contact/ContactPage.jsx`
- Components: `src/components/contact/`
- Data: `src/data/contact/`
- Route: `src/routes/router.jsx` 的 `path: 'contact'`

## 3. 區塊規格

### 3.1 HeroSection（左圖右資訊面板）

- Desktop: 雙欄排版，左 55-60%，右 40-45%。
- Tablet: 仍雙欄，可調 50/50。
- Mobile: 單欄堆疊，先圖後資訊卡。
- 右側 `InfoPanel`：
  - 深色底、白字。
  - `InfoGroup` 垂直堆疊。
  - `InfoRow` 統一 `icon` 固定寬度，文字可換行且對齊。
- 電話與 Email 連結有 hover/focus 樣式，整張面板不做 hover 動效。

### 3.2 AddrInfoSection（標題 + 據點卡片）

- 結構：標題 + `CardsRow`。
- Desktop: 4 欄等寬。
- Tablet: 2x2。
- Mobile: 1 欄直向。
- 卡片建議淺底 + 邊框或淡陰影，和 Hero 深色區做層次對比。
- `InfoRow` 規則和 Hero 共用，維持視覺一致。

### 3.3 FormSection（全必填）

- 分成 3 個區塊：
  - Inquiry Block: `subject`, `productPicker`
  - Contact Block: `lastName`, `firstName`, `email`, `phone`, `company`, `region`
  - Message Block: `message`, `privacyConsent`, `submit`
- Desktop: 中等寬度容器，局部雙欄（姓名、電話/公司）。
- Mobile: 全單欄堆疊。
- 欄位規格：
  - Label 在上、欄位在下。
  - 必填 `*` 位置固定。
  - Input/Select 高度一致。
  - 錯誤訊息固定顯示於欄位下方。

## 4. 資料契約（v1）

### 4.1 Hero/地址資料

```js
// src/data/contact/contactContent.js
export const contactHero = {
  title: 'Contact ID TECH',
  image: '/images/contact/hero.jpg',
  infoGroups: [
    {
      id: 'hq',
      heading: 'Headquarters',
      rows: [
        { type: 'phone', text: '+1 (714) 761-6368', href: 'tel:+17147616368' },
        {
          type: 'email',
          text: 'sales@idtechproducts.com',
          href: 'mailto:sales@idtechproducts.com',
        },
      ],
    },
  ],
}

export const regionalCards = [
  {
    id: 'north-america',
    region: 'North America',
    rows: [
      { type: 'phone', text: '+1 (714) 761-6368', href: 'tel:+17147616368' },
      {
        type: 'email',
        text: 'na-sales@idtechproducts.com',
        href: 'mailto:na-sales@idtechproducts.com',
      },
    ],
  },
]
```

### 4.2 Form 選項資料

```js
// src/data/contact/contactFormOptions.js
export const inquiryOptions = [
  { value: 'sales', label: 'Sales Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
]

export const regionOptions = [
  { value: 'na', label: 'North America' },
  { value: 'emea', label: 'EMEA' },
  { value: 'apac', label: 'APAC' },
]

// v1 先單選，避免 UI/驗證複雜度過高
export const productOptions = [
  { value: 'vp3300', label: 'VP3300' },
  { value: 'neo3', label: 'NEO 3' },
]
```

## 5. 驗證規格（v1）

- 全欄位必填。
- `email`: 格式檢查。
- `phone`: 可含 `+ - ( ) 空白`，去除符號後至少 8 碼數字。
- `subject` / `region` / `productPicker`: 不可停留在預設空值。
- `message`: 最少 10 字。
- `privacyConsent`: 必須勾選。
- 未通過驗證時：
  - 導向第一個錯誤欄位。
  - 該欄位 `focus`。
  - 顯示欄位下方錯誤訊息。

## 6. 提交流程（先前端模擬）

- `idle`: 初始狀態。
- `submitting`: `submit` disabled，按鈕顯示 loading。
- `success`: 顯示成功訊息，清空表單。
- `error`: 顯示失敗訊息，保留使用者輸入。
- v1 暫不呼叫 API，使用 mock promise 模擬提交延遲。

## 7. 可及性與法務

- 每個 input/select/textarea 都要有對應 label。
- 錯誤訊息以 `aria-describedby` 關聯到欄位。
- 鍵盤可完整操作（Tab 順序正確，focus 樣式可見）。
- 勾選框文案需含隱私政策連結：`/legal/privacy-policy`。
- 加一個隱藏 `honeypot` 欄位作為 anti-spam 預留。

## 8. SEO 與追蹤

- Contact 頁 `meta` 最小集合：
  - `title`
  - `description`
  - `canonical`
- 追蹤事件命名（先定義）：
  - `contact_submit_click`
  - `contact_submit_success`
  - `contact_submit_error`

## 9. 驗收清單（Definition of Done）

- `ContactPage` 只負責拼接，不含業務邏輯。
- 三個 section 可在桌機/平板/手機正常排版。
- 表單驗證與錯誤提示完整可用。
- 成功/失敗/提交中狀態可視且可重現。
- 隱私同意與可及性需求有落地。
- 所有內容由 `src/data/contact/` 載入，未耦合 API。
