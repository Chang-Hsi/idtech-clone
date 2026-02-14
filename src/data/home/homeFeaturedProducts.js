import products1Image from '../../assets/home/Products1.webp'
import products2Image from '../../assets/home/Products2.jpg'
import products3Image from '../../assets/home/Products3.jpg'
import products4Image from '../../assets/home/Products4.jpg'

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
    name: 'NEO 3',
    desc: 'Scalable platform that supports a wide range of payment acceptance environments.',
    to: '/products/neo3',
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
