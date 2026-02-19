import { imageUrls } from '../../assets/imageUrlMap'

const heroImage = imageUrls.company.company1
const introImage = imageUrls.company.company2
const innovation = imageUrls.company.innovation
const target = imageUrls.company.target

export const aboutUsPageContent = {
  hero: {
    eyebrow: 'ABOUT US',
    title: 'We Build Reliable Payment Infrastructure for Real-World Commerce',
    subtitle: 'Engineering-first collaboration for long-term payment platforms',
    description:
      'We work with product teams to design, integrate, and scale payment experiences that stay maintainable across growth stages.',
    imageUrl: heroImage,
  },
  intro: {
    title: 'Who We Are',
    paragraphs: [
      'We are a team focused on payment architecture, integration quality, and practical delivery. Our work bridges hardware, software, and operational workflows so teams can launch with confidence.',
      'From early prototyping to production rollout, we help organizations reduce technical risk, improve release predictability, and keep payment systems stable over time.',
    ],
    imageUrl: introImage,
  },
  highlights: [
    {
      id: 'mission',
      eyebrow: 'MISSION STATEMENT',
      title: 'Build payment systems that stay stable as products scale.',
      imageUrl: target,
    },
    {
      id: 'innovation',
      eyebrow: 'COMPANY INNOVATION',
      title: 'Deliver practical engineering patterns that reduce integration risk.',
      imageUrl: innovation,
    },
  ],
  innovationTimeline: {
    title: 'INNOVATION',
    items: [
      {
        year: '1990s',
        title: 'First Product Released',
        description: 'Launched our first generation payment reading products.',
      },
      {
        year: '1990s',
        title: 'Brazil Office Established',
        description: 'Expanded operations with a dedicated regional office in Brazil.',
      },
      {
        year: '1990s',
        title: 'Taiwan Manufacturing Facility Established',
        description: 'Scaled manufacturing capacity with Taiwan facility operations.',
      },
      {
        year: '2000s',
        title: 'Shanghai R&D Office Established',
        description: 'Built engineering capabilities for platform and firmware development.',
      },
      {
        year: '2000s',
        title: 'USA Headquarters Moved to Cypress',
        description: 'Centralized core business functions in Southern California.',
      },
      {
        year: '2000s',
        title: 'Taiwan R&D Office Established',
        description: 'Expanded cross-region product development collaboration.',
      },
      {
        year: '2010s',
        title: 'VivoPay Acquisition',
        description: 'Integrated contactless technology strengths into product roadmap.',
      },
      {
        year: '2010s',
        title: 'Taiwan Office Opens',
        description: 'Strengthened regional support and solution delivery teams.',
      },
      {
        year: '2020s',
        title: 'Rocklin Office Opens',
        description: 'Extended enterprise support capacity for North American operations.',
      },
      {
        year: '2020s',
        title: 'Global Rollout Programs',
        description: 'Enabled multi-region deployment governance for enterprise clients.',
      },
    ],
  },
  connectInfo: {
    title: 'Where to Find Us',
    description:
      'Reach our team for architecture discussion, implementation planning, or deployment support.',
    offices: [
      {
        id: 'corporate-hq',
        name: 'Corporate Headquarters',
        phone: '+1 (714) 761-6368',
        phoneHref: 'tel:+17147616368',
        email: 'sales@idtechproducts.com',
        emailHref: 'mailto:sales@idtechproducts.com',
        address: '10721 Walker St, Cypress, CA 90630, USA',
      },
      {
        id: 'asia-hq',
        name: 'Asia Headquarters',
        phone: '+886 (2) 7730-6800',
        phoneHref: 'tel:+886277306800',
        email: 'asia@idtechproducts.com',
        emailHref: 'mailto:asia@idtechproducts.com',
        address: '6F., No. 868-3, Zhongzheng Rd., Zhonghe Dist., New Taipei City, Taiwan',
      },
    ],
  },
}
