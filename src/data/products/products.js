import { imageUrls } from '../../assets/imageUrlMap'

const neo3Image = imageUrls.home.Products2
const vp3300Image = imageUrls.home.Products1
const unattendedImage = imageUrls.home.Products4
const kernelImage = imageUrls.home.Products3
const Products5 = imageUrls.home.Products5
const Products6 = imageUrls.home.Products6
const Products7 = imageUrls.home.Products7
const Products8 = imageUrls.home.Products8
const Products9 = imageUrls.home.Products9
const Products10 = imageUrls.home.Products10
const Products11 = imageUrls.home.Products11
const Products12 = imageUrls.home.Products12
const Products13 = imageUrls.home.Products13
const Products14 = imageUrls.home.Products14
const Products15 = imageUrls.home.Products15
const fullWidthImage1 = imageUrls.products.fullWidthImage1
const fullWidthImage2 = imageUrls.products.fullWidthImage2

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
  {
    id: 'prod-vp3350',
    slug: 'vp3350',
    name: 'VP3350',
    tagline: 'Wireless payment terminal for mobile and hybrid checkout journeys.',
    shortDescription:
      'A robust handheld payment device designed for flexible mobile workflows and semi-fixed environments.',
    bullets: ['Wireless-first operation', 'Compact handheld profile', 'Secure card-present acceptance'],
    collectionSlugs: ['mobile-payment', 'neo-3'],
    useCases: ['mobile', 'retail'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: Products5,
      gallery: [Products5],
    },
    specs: [
      { key: 'Interfaces', value: 'Bluetooth LE, USB-C' },
      { key: 'Display', value: 'Integrated monochrome status display' },
      { key: 'Operating Temperatures', value: '0 deg C to 50 deg C' },
      { key: 'Dimensions', value: '122 mm x 70 mm x 21 mm' },
    ],
    features: [
      'Portable form factor for on-the-go checkout',
      'Low-latency wireless pairing and reconnection',
      'Secure key management support',
      'Designed for mobile line-busting operations',
      'SDK-friendly integration path',
    ],
    relatedSlugs: ['vp3300', 'mobile'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
  {
    id: 'prod-vp6825',
    slug: 'vp6825',
    name: 'VP6825',
    tagline: 'All-in-one unattended terminal for self-service endpoints.',
    shortDescription:
      'An unattended-ready payment terminal with integrated display for kiosks, parking, and vending use cases.',
    bullets: ['Unattended deployment profile', 'Integrated UI screen', 'Secure multi-interface acceptance'],
    collectionSlugs: ['unattended-solutions'],
    useCases: ['unattended', 'parking'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products6,
      gallery: [Products6],
    },
    specs: [
      { key: 'Reader Type', value: 'Contact, contactless, and magstripe support' },
      { key: 'Display', value: 'High-brightness kiosk display module' },
      { key: 'Ingress Profile', value: 'Commercial unattended enclosure ready' },
      { key: 'Operating Temperatures', value: '-10 deg C to 55 deg C' },
    ],
    features: [
      'Purpose-built for unattended operations',
      'High durability for outdoor-adjacent environments',
      'Remote monitoring and update compatibility',
      'Flexible mounting options',
      'Supports kiosk and parking deployment patterns',
    ],
    relatedSlugs: ['unattended', 'vp7200'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
  {
    id: 'prod-ap6800',
    slug: 'ap6800',
    name: 'AP6800',
    tagline: 'Android unattended terminal for advanced self-service experiences.',
    shortDescription:
      'A smart unattended terminal with Android capabilities for richer payment interaction scenarios.',
    bullets: ['Android operating environment', 'Self-service optimized design', 'Flexible peripheral support'],
    collectionSlugs: ['unattended-solutions'],
    useCases: ['unattended', 'ev-charging'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products7,
      gallery: [Products7],
    },
    specs: [
      { key: 'OS', value: 'Android-based unattended platform' },
      { key: 'Connectivity', value: 'Ethernet, Wi-Fi, optional cellular module' },
      { key: 'Display', value: 'Integrated touch display' },
      { key: 'Operating Temperatures', value: '-10 deg C to 50 deg C' },
    ],
    features: [
      'App-capable unattended architecture',
      'Supports richer UI-based payment flows',
      'Remote fleet management compatibility',
      'Designed for scalable unattended programs',
      'Peripheral expansion support',
    ],
    relatedSlugs: ['vp6825', 'unattended'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
  {
    id: 'prod-kiosk-v',
    slug: 'kiosk-v',
    name: 'Kiosk V',
    tagline: 'Compact contactless reader for modern unattended and loyalty flows.',
    shortDescription:
      'A lightweight contactless reader that supports secure tap payments across kiosk and embedded scenarios.',
    bullets: ['Contactless-first reader', 'Compact footprint', 'Loyalty-ready interaction support'],
    collectionSlugs: ['neo-3', 'unattended-solutions'],
    useCases: ['unattended', 'oem'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products8,
      gallery: [Products8],
    },
    specs: [
      { key: 'Reader Type', value: 'NFC/contactless acceptance' },
      { key: 'Interfaces', value: 'USB and serial options' },
      { key: 'Operating Temperatures', value: '-10 deg C to 55 deg C' },
      { key: 'Dimensions', value: '95 mm x 62 mm x 16 mm' },
    ],
    features: [
      'Fast tap-and-go transaction handling',
      'Suitable for compact enclosures',
      'Consistent kernel-aligned behavior',
      'Loyalty and stored-value flow compatibility',
      'Easy integration for kiosk OEM teams',
    ],
    relatedSlugs: ['vp7200', 'oem'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
  {
    id: 'prod-vp7200',
    slug: 'vp7200',
    name: 'VP7200',
    tagline: 'Rugged unattended reader for kiosk and parking deployments.',
    shortDescription:
      'A durable unattended reader designed for consistent performance in high-volume self-service environments.',
    bullets: ['Self-service optimized', 'Rugged hardware profile', 'Multi-interface acceptance support'],
    collectionSlugs: ['unattended-solutions'],
    useCases: ['unattended', 'transit'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products9,
      gallery: [Products9],
    },
    specs: [
      { key: 'Reader Type', value: 'Contactless + optional scanner integration' },
      { key: 'Connectivity', value: 'USB, serial, Ethernet' },
      { key: 'Operating Temperatures', value: '-15 deg C to 55 deg C' },
      { key: 'Protection', value: 'Designed for harsh commercial operation' },
    ],
    features: [
      'High uptime profile for unattended deployments',
      'Supports kiosk and transit-adjacent use cases',
      'Durable enclosure and field reliability',
      'Fast transaction response characteristics',
      'Flexible integration with host systems',
    ],
    relatedSlugs: ['unattended', 'vp6825'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
  {
    id: 'prod-ct100',
    slug: 'ct100',
    name: 'CT100',
    tagline: 'Compact countertop unit for fixed checkout lanes.',
    shortDescription:
      'A practical countertop terminal for daily card-present payment operations in retail environments.',
    bullets: ['Countertop-optimized design', 'Reliable day-to-day operation', 'POS-friendly integration'],
    collectionSlugs: ['countertop-systems'],
    useCases: ['countertop', 'retail'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: Products10,
      gallery: [Products10],
    },
    specs: [
      { key: 'Interfaces', value: 'USB, serial' },
      { key: 'Operating Temperatures', value: '0 deg C to 40 deg C' },
      { key: 'Mounting', value: 'Countertop stand and fixed mount options' },
      { key: 'Dimensions', value: '128 mm x 82 mm x 26 mm' },
    ],
    features: [
      'Designed for fixed lane stability',
      'Simple onboarding for cashier operations',
      'Secure card-present transaction behavior',
      'Consistent UX for customers',
      'Low maintenance deployment profile',
    ],
    relatedSlugs: ['countertop', 'ct200'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
  {
    id: 'prod-ct200',
    slug: 'ct200',
    name: 'CT200',
    tagline: 'Enhanced countertop terminal with customer-facing ergonomics.',
    shortDescription:
      'An upgraded countertop terminal built for enterprise checkout lanes requiring reliability and clarity.',
    bullets: ['Enhanced checkout ergonomics', 'Durable construction', 'Enterprise lane compatibility'],
    collectionSlugs: ['countertop-systems'],
    useCases: ['countertop', 'enterprise'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/knowledge-base',
    },
    media: {
      heroImageUrl: Products11,
      gallery: [Products11],
    },
    specs: [
      { key: 'Interfaces', value: 'USB, LAN, serial' },
      { key: 'Display', value: 'Customer-facing display panel' },
      { key: 'Operating Temperatures', value: '0 deg C to 45 deg C' },
      { key: 'Dimensions', value: '136 mm x 86 mm x 30 mm' },
    ],
    features: [
      'Improved customer interaction visibility',
      'Enterprise-ready checkout durability',
      'Seamless POS middleware integration',
      'Consistent lane behavior at scale',
      'Strong day-to-day operational stability',
    ],
    relatedSlugs: ['ct100', 'countertop'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
  {
    id: 'prod-tapone',
    slug: 'tapone',
    name: 'TapOne',
    tagline: 'Fast tap endpoint for transit gates and mobility checkpoints.',
    shortDescription:
      'A rapid-response reader designed for high-throughput transit and mobility validation workflows.',
    bullets: ['Low-latency tap response', 'Transit deployment ready', 'High-throughput profile'],
    collectionSlugs: ['transit-mobility'],
    useCases: ['transit', 'mobile'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products12,
      gallery: [Products12],
    },
    specs: [
      { key: 'Reader Type', value: 'Contactless transit-grade acceptance' },
      { key: 'Latency Profile', value: 'Optimized for rapid tap throughput' },
      { key: 'Connectivity', value: 'Ethernet and serial integration options' },
      { key: 'Operating Temperatures', value: '-20 deg C to 55 deg C' },
    ],
    features: [
      'Transit-oriented tap performance',
      'Resilient operation in high-traffic zones',
      'Designed for station and onboard validation',
      'Simple host-system integration',
      'Scalable deployment for mobility networks',
    ],
    relatedSlugs: ['mobile', 'vp7200'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
  {
    id: 'prod-mobility-x',
    slug: 'mobility-x',
    name: 'Mobility X',
    tagline: 'Compact mobility reader for route-based payment operations.',
    shortDescription:
      'A lightweight payment reader tailored for transit and field mobility environments.',
    bullets: ['Compact route-ready design', 'Mobile network compatibility', 'High reliability profile'],
    collectionSlugs: ['transit-mobility', 'mobile-payment'],
    useCases: ['transit', 'mobile'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products13,
      gallery: [Products13],
    },
    specs: [
      { key: 'Form Factor', value: 'Compact mobile transit reader' },
      { key: 'Connectivity', value: 'Bluetooth LE, optional cellular gateway mode' },
      { key: 'Operating Temperatures', value: '-10 deg C to 50 deg C' },
      { key: 'Mounting', value: 'Vehicle and handheld mounting options' },
    ],
    features: [
      'Built for movement-heavy payment scenarios',
      'Stable transaction performance in transit routes',
      'Flexible mounting for onboard operations',
      'Easy pairing with mobile host applications',
      'Optimized for distributed fleet deployment',
    ],
    relatedSlugs: ['tapone', 'vp3350'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
  {
    id: 'prod-embed-a',
    slug: 'embed-a',
    name: 'Embed A',
    tagline: 'Low-profile OEM module for compact custom devices.',
    shortDescription:
      'An embedded payment module designed for manufacturers needing minimal footprint and secure acceptance.',
    bullets: ['Compact OEM integration', 'Secure embedded acceptance', 'Flexible host interface options'],
    collectionSlugs: ['oem-modules'],
    useCases: ['oem', 'unattended'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products14,
      gallery: [Products14],
    },
    specs: [
      { key: 'Module Size', value: 'Ultra-compact embedded form factor' },
      { key: 'Host Interfaces', value: 'USB, UART' },
      { key: 'Power Profile', value: 'Low-power embedded operation' },
      { key: 'Operating Temperatures', value: '-10 deg C to 60 deg C' },
    ],
    features: [
      'Small footprint for constrained enclosures',
      'Secure payment acceptance building blocks',
      'Fast OEM onboarding support',
      'Long lifecycle supply planning',
      'Designed for custom product integration',
    ],
    relatedSlugs: ['oem', 'embed-b'],
    detail: {
      fullWidthImageUrl: fullWidthImage1,
    },
  },
  {
    id: 'prod-embed-b',
    slug: 'embed-b',
    name: 'Embed B',
    tagline: 'Mid-range embedded module for scalable OEM programs.',
    shortDescription:
      'A balanced OEM module option for teams scaling custom hardware with secure payment capability.',
    bullets: ['Balanced performance profile', 'OEM scaling support', 'Flexible integration pathways'],
    collectionSlugs: ['oem-modules'],
    useCases: ['oem', 'enterprise'],
    downloads: {
      datasheetUrl: '/resources/whitepapers',
      kbUrl: '/support/request-help',
    },
    media: {
      heroImageUrl: Products15,
      gallery: [Products15],
    },
    specs: [
      { key: 'Module Type', value: 'Embedded mid-range payment module' },
      { key: 'Host Interfaces', value: 'USB, UART, SPI' },
      { key: 'Security', value: 'Embedded key and encryption support' },
      { key: 'Operating Temperatures', value: '-10 deg C to 60 deg C' },
    ],
    features: [
      'Designed for scalable OEM product lines',
      'Secure embedded payment processing',
      'Consistent integration model across variants',
      'Supports long-term maintenance planning',
      'Suitable for custom enterprise deployments',
    ],
    relatedSlugs: ['embed-a', 'oem'],
    detail: {
      fullWidthImageUrl: fullWidthImage2,
    },
  },
]
