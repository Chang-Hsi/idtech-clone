import { imageUrls } from '../../assets/imageUrlMap'

export const contactHero = {
  eyebrow: 'CONTACT',
  title: 'Connect With Our Payment Team',
  description:
    'Tell us your project context and we will route your request to the right product and solution specialists.',
  imageUrl: imageUrls.company.company1,
  imageAlt: 'ID TECH team collaborating in office',
  infoGroups: [
    {
      id: 'hq',
      heading: 'Headquarters',
      rows: [
        { id: 'hq-phone', type: 'phone', text: '+1 (714) 761-6368', href: 'tel:+17147616368' },
        {
          id: 'hq-email',
          type: 'email',
          text: 'sales@idtechproducts.com',
          href: 'mailto:sales@idtechproducts.com',
        },
      ],
    },
    {
      id: 'support',
      heading: 'Support',
      rows: [
        {
          id: 'support-email',
          type: 'email',
          text: 'support@idtechproducts.com',
          href: 'mailto:support@idtechproducts.com',
        },
        { id: 'support-phone', type: 'phone', text: '+1 (714) 761-6369', href: 'tel:+17147616369' },
      ],
    },
  ],
}

export const contactAddressSection = {
  title: 'Regional Contact Points',
  description:
    'Use the regional contacts below when you need local coordination for rollout, deployment, or partner alignment.',
}

export const contactRegionalCards = [
  {
    id: 'na',
    region: 'North America',
    rows: [
      { id: 'na-phone', type: 'phone', text: '+1 (714) 761-6368', href: 'tel:+17147616368' },
      {
        id: 'na-email',
        type: 'email',
        text: 'na-sales@idtechproducts.com',
        href: 'mailto:na-sales@idtechproducts.com',
      },
      { id: 'na-address', type: 'address', text: 'Cypress, California' },
    ],
  },
  {
    id: 'latam',
    region: 'Latin America',
    rows: [
      { id: 'latam-phone', type: 'phone', text: '+52 55 1111 2222', href: 'tel:+525511112222' },
      {
        id: 'latam-email',
        type: 'email',
        text: 'latam-sales@idtechproducts.com',
        href: 'mailto:latam-sales@idtechproducts.com',
      },
      { id: 'latam-address', type: 'address', text: 'Mexico City, Mexico' },
    ],
  },
  {
    id: 'emea',
    region: 'EMEA',
    rows: [
      { id: 'emea-phone', type: 'phone', text: '+44 20 1111 2222', href: 'tel:+442011112222' },
      {
        id: 'emea-email',
        type: 'email',
        text: 'emea-sales@idtechproducts.com',
        href: 'mailto:emea-sales@idtechproducts.com',
      },
      { id: 'emea-address', type: 'address', text: 'London, United Kingdom' },
    ],
  },
  {
    id: 'apac',
    region: 'APAC',
    rows: [
      { id: 'apac-phone', type: 'phone', text: '+81 3 1111 2222', href: 'tel:+81311112222' },
      {
        id: 'apac-email',
        type: 'email',
        text: 'apac-sales@idtechproducts.com',
        href: 'mailto:apac-sales@idtechproducts.com',
      },
      { id: 'apac-address', type: 'address', text: 'Tokyo, Japan' },
    ],
  },
]

export const contactFormContent = {
  heading: 'Send Your Inquiry',
  description:
    'All fields are required. Our team typically responds within two business days after your submission.',
  messageMinLength: 10,
}
