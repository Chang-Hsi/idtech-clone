import { imageUrls } from '../../assets/imageUrlMap'

const products1Image = imageUrls.home.Products1
const products2Image = imageUrls.home.Products2
const products3Image = imageUrls.home.Products3
const products4Image = imageUrls.home.Products4

export const homeFeaturedProducts = [
  {
    id: 'fp-vp3300',
    name: 'VP3300',
    desc: 'Compact mobile reader with secure MSR and EMV capability for modern retail apps.',
    to: '/products/vp3300',
    imageUrl: products1Image,
  },
  {
    id: 'fp-neo3',
    name: 'Kiodk',
    desc: 'Scalable platform that supports a wide range of payment acceptance environments.',
    to: '/products/countertop',
    imageUrl: products2Image,
  },
  {
    id: 'fp-kernel',
    name: 'EMV Common Kernel',
    desc: 'Streamline certification efforts with a robust software base for card-present devices.',
    to: '/products/emv-kernel',
    imageUrl: products3Image,
  },
  {
    id: 'fp-unattended',
    name: 'Unattended Suite',
    desc: 'Purpose-built readers and modules for self-service payment endpoints.',
    to: '/products/unattended',
    imageUrl: products4Image,
  },
]
