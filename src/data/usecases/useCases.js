import { imageUrls } from '../../assets/imageUrlMap'

const useCase1Image = imageUrls.home.UseCase1
const useCase2Image = imageUrls.home.UseCase2
const useCase3Image = imageUrls.home.UseCase3
const useCase4Image = imageUrls.home.UseCase4
const useCase5Image = imageUrls.home.UseCase5
const useCase6Image = imageUrls.home.UseCase6

export const useCases = [
  {
    slug: 'unattended',
    title: 'Unattended',
    subtitle: 'Self-Service Payment Experiences for Kiosks, Parking, Vending, and EV Charging',
    description:
      'Support kiosks, vending, EV charging, and parking terminals with resilient unattended payment flows that remain stable under heavy transaction volume, distributed deployment conditions, and long daily operating windows. This use case focuses on minimizing operational friction while keeping integration, security, and lifecycle maintenance manageable for enterprise teams.',
    heroImageUrl: useCase1Image,
    introRows: [
      {
        id: 'unattended-row-1',
        title: 'Reliable Throughput at Scale',
        description:
          'Unattended scenarios require stable transaction handling and minimal operator intervention in high-traffic environments. From transportation hubs to self-checkout machines, the solution must sustain predictable response times, recover gracefully from intermittent connectivity, and preserve customer trust through consistent payment behavior.',
        imageUrl: useCase5Image,
      },
      {
        id: 'unattended-row-2',
        title: 'Operational Control',
        description:
          'Teams can standardize deployment patterns and lifecycle operations across distributed self-service endpoints. A centralized approach to rollout governance, remote updates, device diagnostics, and monitoring helps reduce field support overhead while maintaining strong uptime targets in production.',
        imageUrl: useCase3Image,
      },
    ],
    featuredProductSlugs: ['unattended', 'emv-kernel', 'oem'],
  },
  {
    slug: 'mobile',
    title: 'Mobile',
    subtitle: 'Portable Checkout Scenarios for Line-Busting, Field Teams, and Pop-Up Commerce',
    description:
      'Enable line-busting and on-the-go payments with compact devices and app-friendly integration patterns designed for speed, flexibility, and secure card-present acceptance. This use case is ideal for teams that need checkout capability beyond fixed counters while preserving operational consistency and auditability.',
    heroImageUrl: useCase2Image,
    introRows: [
      {
        id: 'mobile-row-1',
        title: 'Fast Frontline Checkout',
        description:
          'Mobile programs help staff complete payments anywhere in-store without sending customers back to fixed lanes. This improves queue flow during peak traffic, shortens wait times, and allows frontline teams to deliver a smoother purchasing experience in dynamic retail environments.',
        imageUrl: useCase2Image,
      },
      {
        id: 'mobile-row-2',
        title: 'Flexible Device Operations',
        description:
          'Portable terminals support event retail, field sales, and mobile service workflows with secure card-present acceptance. Teams can onboard devices quickly, align with existing app architecture, and maintain security controls without sacrificing the agility required by mobile-first business models.',
        imageUrl: useCase6Image,
      },
    ],
    featuredProductSlugs: ['vp3300', 'mobile', 'neo3-display-vp3350'],
  },
  {
    slug: 'countertop',
    title: 'Countertop',
    subtitle: 'Fixed Checkout Stations for Reliable Daily Point-of-Sale Operations',
    description:
      'Provide dependable card-present transactions in high-volume checkout environments with stable countertop systems optimized for predictable cashier workflows, customer-facing clarity, and long-term maintainability. This use case emphasizes reliability and throughput for organizations operating fixed lanes at scale.',
    heroImageUrl: useCase3Image,
    introRows: [
      {
        id: 'countertop-row-1',
        title: 'Consistent Operator Workflow',
        description:
          'Countertop deployments prioritize predictable cashier flow, customer visibility, and hardware stability. With clearly defined lane behavior and standardized interaction patterns, teams can reduce training overhead, improve transaction accuracy, and maintain service quality during high-volume operating hours.',
        imageUrl: useCase3Image,
      },
      {
        id: 'countertop-row-2',
        title: 'Enterprise Checkout Standards',
        description:
          'Standardized lane architecture helps teams enforce security, maintainability, and rollout consistency across locations. This makes it easier to manage updates, support staff onboarding, and preserve a coherent checkout experience while expanding regional or multi-brand operations.',
        imageUrl: useCase5Image,
      },
    ],
    featuredProductSlugs: ['countertop', 'emv-kernel', 'neo3-display-vp3350'],
  },
  {
    slug: 'oem',
    title: 'OEM',
    subtitle: 'Embedded Payment Integrations for Custom Hardware and Platform Builders',
    description:
      'Build payment acceptance directly into your own hardware products with flexible embedded modules that align with custom enclosure constraints, domain-specific workflows, and long product lifecycles. This use case is intended for teams that need deep integration control without re-creating core payment primitives from scratch.',
    heroImageUrl: useCase4Image,
    introRows: [
      {
        id: 'oem-row-1',
        title: 'Designed for Device Makers',
        description:
          'OEM programs focus on enclosure compatibility, integration control, and long-term product lifecycle planning. Product teams can retain differentiated industrial design and user experience while leveraging proven payment capabilities underneath the surface.',
        imageUrl: useCase4Image,
      },
      {
        id: 'oem-row-2',
        title: 'Scalable Embedded Architecture',
        description:
          'Teams can combine secure payment acceptance with custom product experiences without reinventing core transaction logic. This supports faster delivery timelines, stronger consistency across product generations, and lower long-term maintenance burden for embedded payment programs.',
        imageUrl: useCase6Image,
      },
    ],
    featuredProductSlugs: ['oem', 'emv-kernel', 'software-services'],
  },
]
