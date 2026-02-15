import neo3Image from '../../assets/home/Products2.jpg'
import vp3300Image from '../../assets/home/Products1.webp'
import unattendedImage from '../../assets/home/Products4.jpg'
import kernelImage from '../../assets/home/Products3.jpg'
import fullWidthImage1 from '../../assets/products/fullWidthImage1.jpg'
import fullWidthImage2 from '../../assets/products/fullWidthImage2.jpg'

export const products = [
  {
    id: 'prod-neo3',
    slug: 'neo3-display-vp3350',
    name: 'Kiodk',
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
      { key: 'Interfaces', value: 'USB 2.0, RS-232, Ethernet (optional)' },
      { key: 'Operating Temperatures', value: '0 deg C to 55 deg C (32 deg F to 131 deg F)' },
      { key: 'Storage Temperatures', value: '-20 deg C to 70 deg C (-4 deg F to 158 deg F)' },
      { key: 'Dimensions', value: '116.3 mm x 70 mm x 19 mm' },
    ],
    features: [
      'PCI 6.x SRED',
      'ID TECH common software baseline',
      'TDES / AES / RSA encryption support',
      'Enterprise device lifecycle management',
      'Cross-platform SDK integration',
    ],
    relatedSlugs: ['vp3300', 'emv-kernel'],
    detail: {
      heroSubtitle: 'Built for enterprise teams that need stable payment operations at scale.',
      heroDescription:
        'NEO3 provides a consistent software and hardware baseline for mobile, countertop, and unattended programs, reducing duplicated implementation effort.',
      introParagraph:
        'This platform is optimized for organizations that need to standardize device behavior while keeping integration and maintenance predictable across regions.',
      introBullets: [
        'Shared platform patterns for multi-device programs',
        'Lower integration overhead for new deployments',
        'Operational consistency for long-term lifecycle management',
      ],
      fullWidthImageUrl: fullWidthImage1,
      ctaTitle: 'Need a rollout plan?',
      ctaDescription:
        'We can help map architecture, pilot scope, and production rollout steps for NEO3 programs.',
    },
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
      { key: 'Interfaces', value: 'Bluetooth 4.2 BLE, USB - HID' },
      { key: 'Operating Temperatures', value: '0 deg C to 55 deg C (32 deg F to 131 deg F)' },
      { key: 'Storage Temperatures', value: '-20 deg C to 70 deg C (-4 deg F to 158 deg F)' },
      { key: 'Dimensions', value: '118 mm x 71 mm x 18 mm' },
    ],
    features: [
      'PCI 6.x SRED',
      'ID TECH Common L2 Kernel',
      'TDES / AES / RSA / MK&SK Encryption',
      'Bluetooth low energy for mobile pairing',
      'iOS, Android and Windows support',
    ],
    relatedSlugs: ['mobile', 'neo3'],
    detail: {
      heroSubtitle: 'A compact reader designed for modern mobile checkout.',
      heroDescription:
        'VP3300 helps teams launch secure card-present acceptance in app-based experiences with minimal setup complexity.',
      introParagraph:
        'From queue-busting to field-service use cases, VP3300 balances portability and reliability for fast-moving payment workflows.',
      introBullets: [
        'Optimized for mobile and pop-up scenarios',
        'Simple deployment model for app teams',
        'Consistent secure transaction handling',
      ],
      fullWidthImageUrl: fullWidthImage2,
      ctaTitle: 'Evaluate VP3300 for your app',
      ctaDescription:
        'Contact us for integration guidance, compatibility checks, and pilot rollout recommendations.',
    },
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
      { key: 'Kernel Type', value: 'Common EMV L2 software kernel' },
      { key: 'Certification Scope', value: 'Shared certification workflow across device families' },
      { key: 'Integration Mode', value: 'SDK/API integration for host applications' },
      { key: 'Deployment Model', value: 'Reusable package for multi-terminal programs' },
    ],
    features: [
      'Consistent card-present transaction behavior',
      'Reduced duplicated certification effort',
      'Reusable integration path across product lines',
      'Centralized maintenance and release management',
      'Supports enterprise rollout governance',
    ],
    relatedSlugs: ['neo3', 'unattended'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
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
      { key: 'Reader Type', value: 'Contactless + contact + magstripe (model dependent)' },
      { key: 'Connectivity', value: 'USB, serial, Ethernet options' },
      { key: 'Operating Temperatures', value: '-10 deg C to 55 deg C' },
      { key: 'Ingress Profile', value: 'Designed for unattended commercial environments' },
    ],
    features: [
      'Unattended first hardware profile',
      'High reliability in self-service locations',
      'Remote firmware and estate lifecycle support',
      'Flexible mounting and OEM enclosure compatibility',
      'EMV and contactless acceptance support',
    ],
    relatedSlugs: ['emv-kernel', 'neo3'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
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
      { key: 'Form Factor', value: 'Compact handheld mobile reader' },
      { key: 'Connectivity', value: 'Bluetooth LE, USB-C' },
      { key: 'Operating Temperatures', value: '0 deg C to 50 deg C' },
      { key: 'Battery Profile', value: 'All-day mobile operation (usage dependent)' },
    ],
    features: [
      'Fast mobile onboarding with SDK samples',
      'Low-latency transaction response',
      'Optimized for queue-busting and field checkout',
      'Secure key management and encryption',
      'Cross-platform mobile app compatibility',
    ],
    relatedSlugs: ['vp3300'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
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
      { key: 'Device Type', value: 'Countertop payment terminal' },
      { key: 'Interfaces', value: 'USB, serial, LAN (model dependent)' },
      { key: 'Operating Temperatures', value: '0 deg C to 40 deg C' },
      { key: 'Mounting', value: 'Fixed lane and checkout desk deployment' },
    ],
    features: [
      'Stable daily operation for high-volume lanes',
      'Operator-friendly interaction flow',
      'Durable enclosure for retail use',
      'Consistent customer-facing checkout behavior',
      'Simple integration with POS middleware',
    ],
    relatedSlugs: ['neo3'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
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
      { key: 'Module Type', value: 'Embedded OEM payment module' },
      { key: 'Host Interfaces', value: 'USB, UART, SPI (configuration dependent)' },
      { key: 'Power Input', value: '5V / 12V profiles (hardware dependent)' },
      { key: 'Operating Temperatures', value: '-10 deg C to 60 deg C' },
    ],
    features: [
      'Compact footprint for custom enclosures',
      'Flexible host integration pathways',
      'Secure payment acceptance primitives',
      'Long lifecycle supply and firmware strategy',
      'Custom deployment alignment for OEM programs',
    ],
    relatedSlugs: ['unattended', 'emv-kernel'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
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
    specs: [
      { key: 'Lifecycle Status', value: 'Sustaining support track' },
      { key: 'Firmware Branch', value: 'Maintenance release channel' },
      { key: 'Recommended Migration', value: 'Move to current-generation device families' },
      { key: 'Documentation', value: 'Legacy integration and migration references available' },
    ],
    features: [
      'Backward compatibility guidance',
      'Migration planning references',
      'Long-tail enterprise support model',
      'Operational continuity for existing deployments',
      'Upgrade advisory for future roadmap alignment',
    ],
    relatedSlugs: ['neo3'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
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
    specs: [
      { key: 'Offering Type', value: 'Professional services and software enablement' },
      { key: 'Delivery Model', value: 'Remote + on-site engagement options' },
      { key: 'Coverage', value: 'Integration, architecture, rollout, and lifecycle support' },
      { key: 'Engagement Window', value: 'Project-based and managed ongoing support' },
    ],
    features: [
      'Faster implementation ramp-up',
      'Architecture review and hardening support',
      'Release and deployment readiness workflows',
      'Operational runbook and lifecycle planning',
      'Post-launch stability and optimization guidance',
    ],
    relatedSlugs: ['emv-kernel', 'neo3'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
]
