import { imageUrls } from '../../assets/imageUrlMap'
import emvPart1Zh from '../../content/resources/developing-for-emv-part-1.zh.md?raw'
import emvPart1En from '../../content/resources/developing-for-emv-part-1.en.md?raw'
import emvPart2Zh from '../../content/resources/developing-for-emv-part-2.zh.md?raw'
import emvPart2En from '../../content/resources/developing-for-emv-part-2.en.md?raw'
import emvPart3Zh from '../../content/resources/developing-for-emv-part-3.zh.md?raw'
import emvPart3En from '../../content/resources/developing-for-emv-part-3.en.md?raw'

const EMV = imageUrls.resources.EMV

export const resourceArticles = [
  {
    id: 'resource-emv-part-1',
    slug: 'developing-for-emv-part-1',
    coverImageUrl: EMV,
    publishedAt: '2018-09-04',
    source: {
      title: 'Developing for EMV, Part I',
      url: 'https://idtechproducts.com/technical-post/developing-for-emv-part-i/',
      siteName: 'ID TECH',
    },
    rightsNotice: {
      zh: '本文為原文之中文整理與學習用途說明，原始內容與相關權利歸原作者及原網站所有。如權利人認為內容使用方式不妥，請來信告知，我們將優先處理調整或下架。',
      en: 'This page is a translated and study-oriented adaptation. All original rights remain with the original author and source site. If you are a rights holder and have concerns, please contact us for prompt update or removal.',
    },
    translations: {
      zh: {
        title: '開發 EMV Part I',
        excerpt:
          '本文整理 EMV 入門重點，涵蓋交易流程、與讀卡機通訊方式、三階段交易模型，以及 Tag 9F26 cryptogram 的角色。',
        contentMarkdown: emvPart1Zh,
      },
      en: {
        title: 'Developing for EMV, Part I',
        excerpt:
          'Part I introduces EMV fundamentals, reader communication options, three transaction stages, and why Tag 9F26 matters.',
        contentMarkdown: emvPart1En,
      },
    },
  },
  {
    id: 'resource-emv-part-2',
    slug: 'developing-for-emv-part-2',
    coverImageUrl: EMV,
    publishedAt: '2018-09-11',
    source: {
      title: 'Developing for EMV, Part II',
      url: 'https://idtechproducts.com/technical-post/developing-for-emv-part-ii/',
      siteName: 'ID TECH',
    },
    rightsNotice: {
      zh: '本文為原文之中文整理與學習用途說明，原始內容與相關權利歸原作者及原網站所有。如權利人認為內容使用方式不妥，請來信告知，我們將優先處理調整或下架。',
      en: 'This page is a translated and study-oriented adaptation. All original rights remain with the original author and source site. If you are a rights holder and have concerns, please contact us for prompt update or removal.',
    },
    translations: {
      zh: {
        title: '開發 EMV Part II',
        excerpt: '第二部分聚焦 cryptogram 類型、授權判斷與失敗情境中的關鍵判讀。',
        contentMarkdown: emvPart2Zh,
      },
      en: {
        title: 'Developing for EMV, Part II',
        excerpt:
          'Part II focuses on cryptogram types, authorization outcomes, and practical handling of transaction states.',
        contentMarkdown: emvPart2En,
      },
    },
  },
  {
    id: 'resource-emv-part-3',
    slug: 'developing-for-emv-part-3',
    coverImageUrl: EMV,
    publishedAt: '2018-09-18',
    source: {
      title: 'Developing for EMV, Part III',
      url: 'https://idtechproducts.com/technical-post/developing-for-emv-part-iii/',
      siteName: 'ID TECH',
    },
    rightsNotice: {
      zh: '本文為原文之中文整理與學習用途說明，原始內容與相關權利歸原作者及原網站所有。如權利人認為內容使用方式不妥，請來信告知，我們將優先處理調整或下架。',
      en: 'This page is a translated and study-oriented adaptation. All original rights remain with the original author and source site. If you are a rights holder and have concerns, please contact us for prompt update or removal.',
    },
    translations: {
      zh: {
        title: '開發 EMV Part III',
        excerpt: '第三部分整理整合落地時的最佳實務、風險控管與維護建議。',
        contentMarkdown: emvPart3Zh,
      },
      en: {
        title: 'Developing for EMV, Part III',
        excerpt:
          'Part III summarizes deployment practices, risk controls, and long-term maintenance guidance.',
        contentMarkdown: emvPart3En,
      },
    },
  },
]
