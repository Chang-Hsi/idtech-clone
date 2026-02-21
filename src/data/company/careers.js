import { imageUrls } from '../../assets/imageUrlMap'

const heroImage = imageUrls.company.company2
const SRE = imageUrls.company.SRE
const salesmanager = imageUrls.company.salesManager
const salesmanager2 = imageUrls.company.salesManager2
const salesmanager3 = imageUrls.company.salesManager3

export const careersPageContent = {
  hero: {
    eyebrow: 'CAREERS',
    title: 'Join Us to Build the Future of Payments',
    description:
      'Explore opportunities across engineering and go-to-market teams in Taiwan, United States, and Japan.',
    imageUrl: heroImage,
  },
  intro: {
    title: 'Work With Us',
    paragraphs: [
      'We offer a comprehensive benefits package, including: Medical, dental, and vision insurance, Flexible spending accounts. Company-paid basic life insurance and accidental death and dismemberment (AD&D) coverage.Short-term and long-term disability insurance. Company bonus program. Paid vacation, sick leave, personal time off, and public holidays.',
      'We are willing to provide H1 visa sponsorship.',
      'If you are looking for a high-growth career path with strong stability, a relaxed and enjoyable work environment, and the flexibility and autonomy to do your best work while collaborating with an excellent and diverse team, we warmly invite you to apply. We are actively hiring.',
      'If you are familiar with terms and technologies such as SRED, NFC, EMV, and P2PE, we would especially love to hear from you.',
      'We are continuously seeking smart, ambitious, and highly motivated talent worldwide, including the United States, Asia, and the EMEA region.',
    ],
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
    imageUrl: SRE,
    summary:
      'We are looking for an experienced Senior SRE Engineer with at least 3 years of cloud SRE or DevOps-related experience to strengthen platform reliability and operational resilience.',
    jobDutiesMarkdown: [
      '- Incident Management: Participate in on-call support, incident investigation, diagnosis, and resolution.',
      '- Monitoring and Logging: Implement and maintain observability using Prometheus, Grafana, and Datadog.',
      '- Infrastructure Reliability: Improve deployment safety, rollout consistency, and recovery time objectives.',
    ].join('\n'),
    qualificationsMarkdown: [
      '- 3+ years in SRE, DevOps, or infrastructure reliability engineering.',
      '- Hands-on experience with Kubernetes, CI/CD, and cloud environments.',
      '- Strong troubleshooting and cross-functional communication skills.',
    ].join('\n'),
    applyEmail: 'careers@idtechproducts.com',
    isOpen: true,
  },
  {
    id: 'regional-sales-manager-us',
    slug: 'regional-sales-manager-us',
    title: 'Regional Sales Manager',
    region: 'United States',
    countryCode: 'us',
    employmentType: 'FULL-TIME',
    locationLabel: 'Cypress, United States',
    imageUrl: salesmanager,
    summary:
      'Drive enterprise pipeline growth across assigned territory with strong account strategy and customer relationship management.',
    jobDutiesMarkdown: [
      '- Develop territory account plans and revenue targets.',
      '- Coordinate with product and solution teams for enterprise proposals.',
      '- Lead deal progression and quarterly pipeline reporting.',
    ].join('\n'),
    qualificationsMarkdown: [
      '- 5+ years in B2B enterprise sales.',
      '- Experience in payments, fintech, or hardware/software solution sales.',
      '- Strong presentation and negotiation capabilities.',
    ].join('\n'),
    applyEmail: 'careers@idtechproducts.com',
    isOpen: true,
  },
  {
    id: 'inside-sales-representative-us',
    slug: 'inside-sales-representative-us',
    title: 'Inside Sales Representative',
    region: 'United States',
    countryCode: 'us',
    employmentType: 'FULL-TIME',
    locationLabel: 'Rocklin, United States',
    imageUrl: salesmanager2,
    summary:
      'Support lead qualification, outbound engagement, and account nurture processes to improve conversion velocity.',
    jobDutiesMarkdown: [
      '- Qualify inbound and outbound leads through structured discovery.',
      '- Maintain CRM hygiene and activity tracking.',
      '- Partner with field sales on handoff and follow-up.',
    ].join('\n'),
    qualificationsMarkdown: [
      '- 2+ years in sales development or inside sales.',
      '- Comfortable with CRM tools and pipeline workflows.',
      '- Clear communication and customer-first mindset.',
    ].join('\n'),
    applyEmail: 'careers@idtechproducts.com',
    isOpen: true,
  },
  {
    id: 'regional-sales-manager-jp',
    slug: 'regional-sales-manager-jp',
    title: 'Regional Sales Manager',
    region: 'Japan',
    countryCode: 'jp',
    employmentType: 'FULL-TIME',
    locationLabel: 'Tokyo, Japan',
    imageUrl: salesmanager3,
    summary:
      'Expand regional partnerships and strategic account footprint in Japan market with localized go-to-market execution.',
    jobDutiesMarkdown: [
      '- Build and manage partner/channel relationships.',
      '- Drive local demand generation with marketing collaboration.',
      '- Own regional forecast and revenue accountability.',
    ].join('\n'),
    qualificationsMarkdown: [
      '- Business-level Japanese and English communication.',
      '- Strong enterprise sales background in technology domains.',
      '- Proven track record in quota attainment.',
    ].join('\n'),
    applyEmail: 'careers@idtechproducts.com',
    isOpen: true,
  },
]

export const selectOpenJobsByTab = (tabKey) => {
  const openJobs = careersJobs.filter((job) => job.isOpen)
  if (tabKey === 'all') return openJobs
  return openJobs.filter((job) => job.countryCode === tabKey)
}
