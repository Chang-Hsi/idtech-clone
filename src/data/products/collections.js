import { imageUrls } from '../../assets/imageUrlMap'

const carouselInsideImage = imageUrls.home.CarouseInside
const useCase1Image = imageUrls.home.UseCase1
const useCase2Image = imageUrls.home.UseCase2
const useCase3Image = imageUrls.home.UseCase3
const useCase4Image = imageUrls.home.UseCase4
const useCase5Image = imageUrls.home.UseCase5
const useCase6Image = imageUrls.home.UseCase6
const useCase7Image = imageUrls.home.UseCase7
const useCase8Image = imageUrls.home.UseCase8
const collectionImage1 = imageUrls.collection.Collection1
const collectionImage2 = imageUrls.collection.Collection2
const collectionImage3 = imageUrls.collection.Collection3
const collectionImage4 = imageUrls.collection.Collection4
const collectionImage5 = imageUrls.collection.Collection5
const collectionImage6 = imageUrls.collection.Collection6
const collectionImage7 = imageUrls.collection.Collection7
const collectionImage8 = imageUrls.collection.Collection8
const collectionImage9 = imageUrls.collection.Collection9
const collectionImage10 = imageUrls.collection.Collection10
const collectionImage11 = imageUrls.collection.Collection11
const collectionImage12 = imageUrls.collection.Collection12

export const collections = [
  {
    slug: 'neo-3',
    name: 'Kiodk Platform',
    heroTitle: 'Kiodk Platform of Products',
    heroSubtitle:
      'A single integration pathway reduces development overhead and accelerates time to market. Whether youre implementing payments in retail, transportation, hospitality, or self-service kiosks, our streamlined framework minimizes redundant certification efforts and simplifies ongoing maintenance. The result is a scalable solution that adapts as your business grows.',
    intro:
      'The Kiodk platform helps teams standardize integrations while scaling across unattended, mobile, and countertop payment touchpoints.',
    valueProps: [
      'Shared software foundation across multiple device families',
      'Faster deployment with reusable integration patterns',
      'Operational consistency for multi-location rollouts',
    ],
    featuredSlugs: ['neo3-display-vp3350', 'vp3300', 'vp3350', 'kiosk-v', 'vp7200', 'countertop'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'The Kiodk Platform collection is built for teams that need one stable product family across multiple payment environments. This series emphasizes shared integration patterns, predictable lifecycle maintenance, and faster rollout execution by minimizing duplicated implementation work between mobile, countertop, and unattended deployments. By standardizing hardware behavior and software touchpoints, organizations can shorten pilot cycles, simplify regional expansion, and improve long-term operational consistency.',
    displayProducts: [
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'neo3-display-vp3300',
        targetSlug: 'vp3300',
        name: 'VP3300',
        shortDescription: 'Compact mobile reader for secure card-present acceptance.',
        media: { heroImageUrl: collectionImage2 },
      },
    ],
    resources: [
      { title: 'Kiodk Datasheet', url: '/resources/whitepapers' },
      { title: 'Integration Guide', url: '/support/knowledge-base' },
    ],
    media: {
      heroImageUrl: carouselInsideImage,
    },
    seo: {
      title: 'Kiodk Platform | Products',
      description:
        'Explore the Kiodk platform for scalable payment experiences across unattended, mobile, and countertop environments.',
    },
  },
  {
    slug: 'mobile-payment',
    name: 'Mobile Payment Devices',
    heroTitle: 'Mobile Payment Devices',
    heroSubtitle: 'Compact readers and secure payment hardware for modern mobile checkout flows.',
    intro:
      'Mobile-focused devices support line-busting, field services, and flexible checkout journeys with secure card-present acceptance.',
    valueProps: [
      'Designed for portability and fast setup',
      'Secure card-present acceptance with EMV support',
      'Consistent SDK approach for mobile app teams',
    ],
    featuredSlugs: ['vp3300', 'vp3350', 'mobile', 'kiosk-v'],
    hasFeaturedProductsSection: false,
    exploreDesc: '',
    displayProducts: [
      {
        slug: 'mobile-display-sprint-mini',
        targetSlug: 'mobile',
        name: 'Sprint Mini',
        shortDescription: 'Pocket-size tap-ready reader for line-busting and event retail.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'mobile-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Wireless checkout terminal for on-the-go transaction handling.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'mobile-display-flex-go',
        targetSlug: 'mobile',
        name: 'Flex Go',
        shortDescription: 'Portable payment terminal optimized for field and mobile sales teams.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
    ],
    resources: [{ title: 'Mobile Buyer Guide', url: '/resources/whitepapers' }],
    media: {
      heroImageUrl: useCase2Image,
    },
    seo: {
      title: 'Mobile Payment Devices | Products',
      description:
        'Compare mobile payment readers built for flexible and secure customer experiences.',
    },
  },
  {
    slug: 'emv-kernel',
    name: 'EMV Common Kernel',
    heroTitle: 'EMV Common Kernel',
    heroSubtitle:
      'A reusable software foundation that streamlines card-present payment logic across device lines.',
    intro:
      'EMV Common Kernel is designed to reduce duplicated integration effort and improve consistency across product families.',
    valueProps: [
      'Shared payment behavior across multiple deployment types',
      'Reduced certification and maintenance overhead',
      'Aligned integration workflow for product teams',
    ],
    featuredSlugs: ['emv-kernel', 'neo3-display-vp3350', 'kiosk-v'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'The EMV Common Kernel collection focuses on software-level consistency for card-present payment flows. It is designed for product teams that want a reusable transaction foundation that can be applied across multiple device categories without re-implementing core payment behavior each time. This approach helps reduce certification friction, improves release quality through shared validation workflows, and creates a clearer upgrade path for future feature expansion.',
    displayProducts: [
      {
        slug: 'kernel-display-core',
        targetSlug: 'emv-kernel',
        name: 'Kernel Core',
        shortDescription: 'Baseline kernel package for consistent payment transaction handling.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'kernel-display-edge',
        targetSlug: 'emv-kernel',
        name: 'Kernel Edge',
        shortDescription: 'Extended package for specialized unattended and OEM scenarios.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'kernel-display-ops',
        targetSlug: 'emv-kernel',
        name: 'Kernel Ops',
        shortDescription: 'Operational support layer for lifecycle updates and maintenance.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'neo3-display-vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Kernel Integration Notes', url: '/support/knowledge-base' }],
    media: {
      heroImageUrl: useCase6Image,
    },
    seo: {
      title: 'EMV Common Kernel | Products',
      description:
        'Explore EMV Common Kernel to standardize payment logic and reduce integration complexity.',
    },
  },
  {
    slug: 'unattended-solutions',
    name: 'Unattended Payment Solutions',
    heroTitle: 'Unattended Payment Solutions',
    heroSubtitle:
      'Purpose-built products for kiosks, vending, EV charging, and self-service stations.',
    intro:
      'Unattended hardware and software combinations are optimized for durability, uptime, and deployment consistency in self-service environments.',
    valueProps: [
      'Reliable operation in high-volume unattended environments',
      'Integration flexibility for OEM and enterprise use cases',
      'Security-focused design with long-term support',
    ],
    featuredSlugs: ['unattended', 'vp7200', 'vp6825', 'ap6800', 'emv-kernel', 'kiosk-v'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'Unattended Payment Solutions are tailored for self-service environments where reliability, uptime, and deployment resilience are critical. This collection supports kiosk, vending, parking, and charging scenarios with products that can withstand high-volume use while remaining integration-friendly for OEM and enterprise programs. The overall goal is to provide dependable unattended acceptance with maintainable software and hardware operations over long deployment cycles.',
    displayProducts: [
      {
        slug: 'unattended-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription: 'Compact unattended reader for kiosks and parking terminals.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'unattended-display-vp6825',
        targetSlug: 'vp6825',
        name: 'VP6825',
        shortDescription: 'All-in-one kiosk terminal with robust unattended performance profile.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'unattended-display-ap6800',
        targetSlug: 'ap6800',
        name: 'AP6800',
        shortDescription: 'Android-based unattended unit with flexible deployment options.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Unattended Deployment Checklist', url: '/support/request-help' }],
    media: {
      heroImageUrl: useCase1Image,
    },
    seo: {
      title: 'Unattended Payment Solutions | Products',
      description:
        'Discover unattended payment products designed for resilient self-service deployments.',
    },
  },
  {
    slug: 'countertop-systems',
    name: 'Countertop Systems',
    heroTitle: 'Countertop Systems',
    heroSubtitle: 'Checkout-focused readers and peripherals for fixed payment stations.',
    intro:
      'Countertop systems prioritize speed, reliability, and operator-friendly daily workflows.',
    valueProps: [
      'Designed for high-throughput checkout lanes',
      'Supports stable day-to-day operations',
      'Flexible deployment options',
    ],
    featuredSlugs: ['countertop', 'ct100', 'ct200', 'neo3-display-vp3350'],
    hasFeaturedProductsSection: false,
    exploreDesc: '',
    displayProducts: [
      {
        slug: 'countertop-display-ct100',
        targetSlug: 'ct100',
        name: 'CT100',
        shortDescription: 'Compact countertop terminal for daily checkout operations.',
        media: { heroImageUrl: collectionImage4 },
      },
      {
        slug: 'countertop-display-ct200',
        targetSlug: 'ct200',
        name: 'CT200',
        shortDescription: 'Customer-facing unit with durable housing and stable performance.',
        media: { heroImageUrl: collectionImage5 },
      },
      {
        slug: 'countertop-display-ctpro',
        targetSlug: 'countertop',
        name: 'CT Pro',
        shortDescription: 'High-throughput countertop option for enterprise checkout lanes.',
        media: { heroImageUrl: collectionImage6 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Countertop Deployment Guide', url: '/support/knowledge-base' }],
    media: {
      heroImageUrl: useCase3Image,
    },
    seo: {
      title: 'Countertop Systems | Products',
      description: 'Explore countertop payment systems built for reliability and speed.',
    },
  },
  {
    slug: 'oem-modules',
    name: 'OEM Modules',
    heroTitle: 'OEM Modules',
    heroSubtitle: 'Embedded payment options for manufacturers building custom devices.',
    intro:
      'OEM modules help product teams integrate secure payment acceptance into purpose-built hardware.',
    valueProps: [
      'Integration flexibility for embedded systems',
      'Scalable roadmap support',
      'Consistent payment acceptance layer',
    ],
    featuredSlugs: ['oem', 'embed-a', 'embed-b', 'emv-kernel'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'OEM Modules are intended for manufacturers and platform builders who need embedded payment capabilities without sacrificing product-specific design flexibility. This series supports custom enclosure constraints, integration control, and scalable rollout planning while keeping payment acceptance behavior aligned with broader platform standards. It is especially useful for teams balancing bespoke hardware requirements with long-term maintainability and compliance goals.',
    displayProducts: [
      {
        slug: 'oem-display-embed-a',
        targetSlug: 'embed-a',
        name: 'Embed A',
        shortDescription: 'Low-profile module for compact OEM payment designs.',
        media: { heroImageUrl: collectionImage7 },
      },
      {
        slug: 'oem-display-embed-b',
        targetSlug: 'embed-b',
        name: 'Embed B',
        shortDescription: 'Mid-range embedded device with flexible hardware integration options.',
        media: { heroImageUrl: collectionImage9 },
      },
      {
        slug: 'oem-display-embed-c',
        targetSlug: 'oem',
        name: 'Embed C',
        shortDescription: 'Advanced module for high-volume and custom OEM deployment scenarios.',
        media: { heroImageUrl: collectionImage8 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'OEM Integration Starter Pack', url: '/support/request-help' }],
    media: {
      heroImageUrl: useCase4Image,
    },
    seo: {
      title: 'OEM Modules | Products',
      description: 'Embedded payment module options for OEM and device manufacturers.',
    },
  },
  {
    slug: 'enterprise-rollouts',
    name: 'Enterprise Rollouts',
    heroTitle: 'Enterprise Rollouts',
    heroSubtitle: 'Collection for large-scale multi-site deployment planning.',
    intro:
      'Enterprise rollout tracks combine products, software, and operational guidance for complex deployment programs.',
    valueProps: [
      'Deployment planning support',
      'Cross-region consistency strategies',
      'Operational governance patterns',
    ],
    featuredSlugs: ['neo3-display-vp3350', 'unattended', 'software-services', 'vp3350'],
    hasFeaturedProductsSection: false,
    exploreDesc: '',
    displayProducts: [
      {
        slug: 'enterprise-display-control',
        targetSlug: 'neo3-display-vp3350',
        name: 'Control Hub',
        shortDescription: 'Centralized rollout control panel for multi-site deployment programs.',
        media: { heroImageUrl: collectionImage10 },
      },
      {
        slug: 'enterprise-display-ops',
        targetSlug: 'vp6825',
        name: 'Ops Suite',
        shortDescription: 'Operations visibility toolkit for enterprise support workflows.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'enterprise-display-govern',
        targetSlug: 'software-services',
        name: 'Govern Core',
        shortDescription: 'Policy and governance layer for region-based rollout standards.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Enterprise Rollout Checklist', url: '/resources/case-studies' }],
    media: {
      heroImageUrl: useCase5Image,
    },
    seo: {
      title: 'Enterprise Rollouts | Products',
      description: 'Guided product tracks for enterprise-scale payment deployments.',
    },
  },
  {
    slug: 'software-services',
    name: 'Software Services',
    heroTitle: 'Software Services',
    heroSubtitle: 'Integration, lifecycle support, and deployment acceleration services.',
    intro:
      'Software services help teams reduce integration risk and improve maintainability over the product lifecycle.',
    valueProps: [
      'Implementation workshops',
      'Architecture support',
      'Lifecycle planning and updates',
    ],
    featuredSlugs: ['software-services', 'emv-kernel', 'neo3-display-vp3350'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'Software Services in this collection are structured to accelerate implementation while reducing architecture and maintenance risk. The focus is on practical onboarding, integration guidance, and lifecycle support that helps teams move from prototype to production with stronger technical foundations. These offerings are designed to complement product deployments with consistent engineering practices, release planning discipline, and operational continuity support.',
    displayProducts: [
      {
        slug: 'software-display-workshop',
        targetSlug: 'software-services',
        name: 'Launch Workshop',
        shortDescription: 'Structured onboarding workshop to accelerate implementation timelines.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'software-display-architecture',
        targetSlug: 'software-services',
        name: 'Architecture Assist',
        shortDescription: 'Solution architecture support tailored to payment deployment needs.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'software-display-lifecycle',
        targetSlug: 'software-services',
        name: 'Lifecycle Care',
        shortDescription: 'Ongoing update and support framework for long-term maintainability.',
        media: { heroImageUrl: collectionImage6 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Service Overview', url: '/software-services' }],
    media: {
      heroImageUrl: useCase6Image,
    },
    seo: {
      title: 'Software Services | Products',
      description: 'Software and integration support offerings for payment programs.',
    },
  },
  {
    slug: 'legacy-products',
    name: 'Legacy Products',
    heroTitle: 'Legacy Products',
    heroSubtitle: 'Reference collection for sustaining deployments and migration planning.',
    intro:
      'Legacy products remain important for teams managing long-tail hardware lifecycles and transition plans.',
    valueProps: [
      'Lifecycle transition planning',
      'Documentation continuity',
      'Migration path guidance',
    ],
    featuredSlugs: ['legacy'],
    hasFeaturedProductsSection: false,
    exploreDesc: '',
    displayProducts: [
      {
        slug: 'legacy-display-lx1',
        targetSlug: 'legacy',
        name: 'LX-1',
        shortDescription: 'Legacy kiosk reader with migration planning documentation.',
        media: { heroImageUrl: collectionImage3 },
      },
      {
        slug: 'legacy-display-lx2',
        targetSlug: 'legacy',
        name: 'LX-2',
        shortDescription: 'Sustaining product track for long-tail enterprise rollouts.',
        media: { heroImageUrl: collectionImage9 },
      },
      {
        slug: 'legacy-display-lx3',
        targetSlug: 'legacy',
        name: 'LX-3',
        shortDescription: 'Compatibility-focused unit for transition and upgrade paths.',
        media: { heroImageUrl: collectionImage8 },
      },
    ],
    resources: [{ title: 'Legacy Migration Notes', url: '/support/product-updates' }],
    media: {
      heroImageUrl: useCase7Image,
    },
    seo: {
      title: 'Legacy Products | Products',
      description: 'Support and migration guidance for legacy product deployments.',
    },
  },
  {
    slug: 'transit-mobility',
    name: 'Transit & Mobility',
    heroTitle: 'Transit & Mobility',
    heroSubtitle: 'Payment products for transportation and high-velocity tap interactions.',
    intro:
      'Transit and mobility environments require responsive hardware and resilient operations at scale.',
    valueProps: [
      'Fast tap interaction support',
      'Durable deployment profile',
      'Operational consistency in motion-heavy environments',
    ],
    featuredSlugs: ['tapone', 'mobility-x', 'vp7200', 'mobile'],
    hasFeaturedProductsSection: true,
    exploreDesc:
      'Transit & Mobility products are optimized for speed-sensitive payment interactions and operational robustness in transportation use cases. This collection addresses environments where quick taps, repeated throughput, and distributed deployment management are essential. It combines compact hardware options with scalable operational patterns so teams can support real-world mobility workflows while maintaining reliable payment performance.',
    displayProducts: [
      {
        slug: 'transit-display-tapone',
        targetSlug: 'tapone',
        name: 'TapOne',
        shortDescription:
          'Fast transaction endpoint for transit gate and onboard validation flows.',
        media: { heroImageUrl: collectionImage12 },
      },
      {
        slug: 'transit-display-mobilityx',
        targetSlug: 'mobility-x',
        name: 'Mobility X',
        shortDescription: 'Compact mobility reader designed for route-based payment scenarios.',
        media: { heroImageUrl: collectionImage11 },
      },
      {
        slug: 'transit-display-hub',
        targetSlug: 'software-services',
        name: 'Transit Hub',
        shortDescription: 'Back-office integration layer for mobility payment operations.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-kiosk-v',
        targetSlug: 'kiosk-v',
        name: 'Kiosk V',
        shortDescription:
          'Our newest contactless card reader supporting mobile payments and loyalty programs.',
        media: { heroImageUrl: collectionImage1 },
      },
      {
        slug: 'neo3-display-vp3350',
        targetSlug: 'vp3350',
        name: 'VP3350',
        shortDescription: 'Robust wireless device ready for mobile and business payment use cases.',
        media: { heroImageUrl: collectionImage2 },
      },
      {
        slug: 'neo3-display-vp7200',
        targetSlug: 'vp7200',
        name: 'VP7200',
        shortDescription:
          'Smart NFC reader with integrated scanner support for self-service flows.',
        media: { heroImageUrl: collectionImage3 },
      },
    ],
    resources: [{ title: 'Transit Deployment Overview', url: '/resources/whitepapers' }],
    media: {
      heroImageUrl: useCase8Image,
    },
    seo: {
      title: 'Transit & Mobility | Products',
      description: 'Payment product tracks designed for transit and mobility use cases.',
    },
  },
]
