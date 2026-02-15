import carouselInsideImage from '../../assets/home/CarouseInside.jpg'
import useCase1Image from '../../assets/home/UseCase1.jpg'
import useCase2Image from '../../assets/home/UseCase2.jpg'
import useCase3Image from '../../assets/home/UseCase3.jpg'
import useCase4Image from '../../assets/home/UseCase4.jpg'
import useCase5Image from '../../assets/home/UseCase5.jpg'
import useCase6Image from '../../assets/home/UseCase6.jpg'
import useCase7Image from '../../assets/home/UseCase7.jpg'
import useCase8Image from '../../assets/home/UseCase8.jpg'

export const collections = [
  {
    slug: 'neo-3',
    name: 'NEO 3 Platform',
    heroTitle: 'NEO 3 Platform of Products',
    heroSubtitle: 'One common kernel. One integration path. Multiple deployment environments.',
    intro:
      'The NEO 3 platform helps teams standardize integrations while scaling across unattended, mobile, and countertop payment touchpoints.',
    valueProps: [
      'Shared software foundation across multiple device families',
      'Faster deployment with reusable integration patterns',
      'Operational consistency for multi-location rollouts',
    ],
    featuredSlugs: ['neo3', 'vp3300', 'countertop', 'unattended'],
    resources: [
      { title: 'NEO 3 Datasheet', url: '/resources/whitepapers' },
      { title: 'Integration Guide', url: '/support/knowledge-base' },
    ],
    media: {
      heroImageUrl: carouselInsideImage,
    },
    seo: {
      title: 'NEO 3 Platform | Products',
      description:
        'Explore the NEO 3 platform for scalable payment experiences across unattended, mobile, and countertop environments.',
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
    featuredSlugs: ['vp3300', 'mobile'],
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
    featuredSlugs: ['unattended', 'emv-kernel'],
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
    featuredSlugs: ['countertop', 'neo3'],
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
    featuredSlugs: ['oem', 'emv-kernel'],
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
    featuredSlugs: ['neo3', 'unattended'],
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
    featuredSlugs: ['software-services', 'emv-kernel'],
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
    featuredSlugs: ['unattended', 'mobile'],
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
