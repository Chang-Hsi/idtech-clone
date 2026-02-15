import neo3Image from '../../assets/home/Products2.jpg'
import vp3300Image from '../../assets/home/Products1.webp'
import unattendedImage from '../../assets/home/Products4.jpg'
import kernelImage from '../../assets/home/Products3.jpg'

export const products = [
  {
    id: 'prod-neo3',
    slug: 'neo3',
    name: 'NEO 3',
    tagline: 'Scalable platform for multi-environment payment programs.',
    shortDescription:
      'A platform-level product strategy for teams that need consistency across diverse payment touchpoints.',
    bullets: [
      'Platform architecture for enterprise growth',
      'Shared software baseline across deployments',
      'Operational consistency at scale',
    ],
    collectionSlugs: ['neo-3'],
    useCases: ['enterprise', 'retail'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: neo3Image,
      gallery: [neo3Image],
    },
    specs: [
      { key: 'Connectivity', value: 'USB, serial, optional network adapter' },
      { key: 'Environment', value: 'Indoor commercial deployments' },
      { key: 'Security', value: 'EMV-ready architecture support' },
    ],
    features: [
      'Unified platform approach',
      'Faster rollout across multiple sites',
      'SDK-aligned integration path',
    ],
    relatedSlugs: ['vp3300', 'emv-kernel'],
  },
  {
    id: 'prod-vp3300',
    slug: 'vp3300',
    name: 'VP3300',
    tagline: 'Compact mobile reader for secure card-present acceptance.',
    shortDescription:
      'A portable payment reader designed for line-busting and mobile checkout scenarios.',
    bullets: ['Compact footprint', 'Fast setup for mobile apps', 'Secure transaction flows'],
    collectionSlugs: ['neo-3', 'mobile-payment'],
    useCases: ['mobile', 'retail'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: vp3300Image,
      gallery: [vp3300Image],
    },
    specs: [
      { key: 'Form Factor', value: 'Portable handheld reader' },
      { key: 'Interfaces', value: 'USB / Bluetooth (model dependent)' },
      { key: 'Target Use', value: 'Mobile and pop-up checkout flows' },
    ],
    features: ['Mobile-first design', 'Low integration overhead', 'Reliable daily operation'],
    relatedSlugs: ['mobile', 'neo3'],
  },
  {
    id: 'prod-emv-kernel',
    slug: 'emv-kernel',
    name: 'EMV Common Kernel',
    tagline: 'Reusable software foundation for card-present product lines.',
    shortDescription:
      'A software-first product designed to reduce duplicated effort and streamline certification workflows.',
    bullets: [
      'Shared kernel approach',
      'Supports multiple device strategies',
      'Helps reduce certification friction',
    ],
    collectionSlugs: ['neo-3', 'unattended-solutions'],
    useCases: ['unattended', 'enterprise'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: kernelImage,
      gallery: [kernelImage],
    },
    specs: [
      { key: 'Type', value: 'Software platform component' },
      { key: 'Integration', value: 'SDK and API based' },
      { key: 'Primary Value', value: 'Standardized card-present logic' },
    ],
    features: [
      'Consistent payment behavior',
      'Reusable integration model',
      'Long-term maintainability',
    ],
    relatedSlugs: ['neo3', 'unattended'],
  },
  {
    id: 'prod-unattended-suite',
    slug: 'unattended',
    name: 'Unattended Suite',
    tagline: 'Hardened payment products for self-service endpoints.',
    shortDescription:
      'A suite of unattended-ready products designed for kiosks, vending, EV charging, and parking.',
    bullets: [
      'Designed for high-traffic self-service environments',
      'Deployment-ready hardware and software package',
      'Built for reliability and maintainability',
    ],
    collectionSlugs: ['neo-3', 'unattended-solutions'],
    useCases: ['unattended', 'parking', 'ev-charging'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: unattendedImage,
      gallery: [unattendedImage],
    },
    specs: [
      { key: 'Deployment', value: 'Kiosk / vending / unattended terminals' },
      { key: 'Durability', value: 'Commercial unattended profile' },
      { key: 'Support', value: 'Long-term service planning support' },
    ],
    features: ['Self-service optimized', 'Operational resilience', 'Flexible deployment profile'],
    relatedSlugs: ['emv-kernel', 'neo3'],
  },
  {
    id: 'prod-mobile',
    slug: 'mobile',
    name: 'Mobile Payment Devices',
    tagline: 'Flexible mobile checkout hardware options.',
    shortDescription: 'Device family for mobile-first payment flows.',
    bullets: ['Portable', 'Fast setup', 'SDK-friendly'],
    collectionSlugs: ['mobile-payment'],
    useCases: ['mobile'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: vp3300Image,
      gallery: [vp3300Image],
    },
    specs: [
      { key: 'Category', value: 'Mobile family' },
      { key: 'Primary Integration', value: 'App SDK' },
    ],
    features: ['Fast time-to-market', 'Portable setup'],
    relatedSlugs: ['vp3300'],
  },
  {
    id: 'prod-countertop',
    slug: 'countertop',
    name: 'Countertop Solutions',
    tagline: 'Secure countertop payment options for high-volume locations.',
    shortDescription: 'Countertop-focused payment hardware and software configurations.',
    bullets: [
      'Stable counter deployment',
      'Consistent customer flow',
      'Secure card-present operations',
    ],
    collectionSlugs: ['neo-3'],
    useCases: ['countertop', 'retail'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: neo3Image,
      gallery: [neo3Image],
    },
    specs: [
      { key: 'Category', value: 'Countertop family' },
      { key: 'Primary Use', value: 'Fixed checkout stations' },
    ],
    features: ['Checkout stability', 'Operator-friendly deployment'],
    relatedSlugs: ['neo3'],
  },
  {
    id: 'prod-oem',
    slug: 'oem',
    name: 'OEM Payment Products',
    tagline: 'Embedded payment modules for custom hardware projects.',
    shortDescription:
      'OEM-oriented products for manufacturers building integrated payment experiences.',
    bullets: ['Embed-ready modules', 'Flexible integration model', 'Long-term roadmap support'],
    collectionSlugs: ['unattended-solutions'],
    useCases: ['oem', 'unattended'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: unattendedImage,
      gallery: [unattendedImage],
    },
    specs: [
      { key: 'Category', value: 'OEM module family' },
      { key: 'Integration Pattern', value: 'Embedded system integration' },
    ],
    features: ['OEM flexibility', 'Custom deployment alignment'],
    relatedSlugs: ['unattended', 'emv-kernel'],
  },
  {
    id: 'prod-legacy',
    slug: 'legacy',
    name: 'Legacy Products',
    tagline: 'Sustaining support track for legacy deployments.',
    shortDescription: 'Reference page for previous-generation devices still in active field usage.',
    bullets: ['Lifecycle planning', 'Migration guidance', 'Compatibility references'],
    collectionSlugs: ['neo-3'],
    useCases: ['enterprise'],
    downloads: {
      datasheetUrl: '/resources/press-releases',
      kbUrl: '/support/product-updates',
    },
    media: {
      heroImageUrl: neo3Image,
      gallery: [neo3Image],
    },
    specs: [{ key: 'Status', value: 'Sustaining support track' }],
    features: ['Migration planning support', 'Documentation continuity'],
    relatedSlugs: ['neo3'],
  },
  {
    id: 'prod-software-services',
    slug: 'software-services',
    name: 'Software Services',
    tagline: 'Integration and lifecycle software support.',
    shortDescription:
      'Service package for onboarding, integration, and long-term maintainability of payment deployments.',
    bullets: ['Implementation workshops', 'Architecture guidance', 'Deployment support'],
    collectionSlugs: ['neo-3'],
    useCases: ['enterprise', 'oem'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: kernelImage,
      gallery: [kernelImage],
    },
    specs: [{ key: 'Type', value: 'Service offering' }],
    features: ['Faster integration ramps', 'Operational continuity support'],
    relatedSlugs: ['emv-kernel', 'neo3'],
  },
]
