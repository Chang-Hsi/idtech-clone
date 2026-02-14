import carousel1Image from '../../assets/home/Carouse1.jpg'
import carousel3Image from '../../assets/home/Carouse3.jpg'
import carousel4Image from '../../assets/home/Carouse4.jpg'
import carouselInsideImage from '../../assets/home/CarouseInside.jpg'

export const homeHeroSlides = [
  {
    id: 'hero-a',
    title: 'Secure Payment Innovation for Every Checkout',
    desc: 'Build faster with payment devices and software that scale across unattended, mobile, and countertop scenarios.',
    primaryCta: { label: 'Explore Products', to: '/products' },
    background: {
      imageUrl: carousel4Image,
      overlay: true,
      overlayOpacity: 0.1,
    },
    layers: [
      {
        id: 'a-title',
        type: 'title',
        content: 'Secure Payment Innovation for Every Checkout',
        position: { anchor: 'left', top: '28%', left: '6rem' },
        style: { maxWidth: '780px', titleSize: 'text-6xl' },
        motion: { enter: 'slideDown', duration: 700, delay: 140, easing: 'ease-out' },
      },
      {
        id: 'a-desc',
        type: 'desc',
        content:
          'Build faster with payment devices and software that scale across unattended, mobile, and countertop scenarios.',
        position: { anchor: 'left', top: '49%', left: '6rem' },
        style: { maxWidth: '620px', descSize: 'text-xl' },
        motion: { enter: 'slideDown', duration: 700, delay: 280, easing: 'ease-out' },
      },
      {
        id: 'a-cta',
        type: 'cta',
        content: 'Explore Products',
        to: '/products',
        position: { anchor: 'left', top: '65%', left: '6rem' },
        motion: { enter: 'slideUp', duration: 650, delay: 420, easing: 'ease-out' },
      },
    ],
  },
  {
    id: 'hero-b',
    title: 'Future-Ready Solutions for Omnichannel Growth',
    desc: 'From OEM integrations to enterprise deployment, deliver consistent payment experiences with confidence.',
    primaryCta: { label: 'Discover Solutions', to: '/use-cases' },
    background: {
      imageUrl: carousel3Image,
      overlay: true,
      overlayOpacity: 0.3,
    },
    layers: [
      {
        id: 'b-title',
        type: 'title',
        content: 'Future-Ready Solutions for Omnichannel Growth',
        position: { anchor: 'center', top: '35%', left: '50%', translateX: '-50%' },
        style: { maxWidth: '760px', titleSize: 'text-5xl', textAlign: 'center' },
        motion: { enter: 'slideLeft', duration: 700, delay: 160, easing: 'ease-out' },
      },
      {
        id: 'b-desc',
        type: 'desc',
        content:
          'From OEM integrations to enterprise deployment, deliver consistent payment experiences with confidence.',
        position: { anchor: 'center', top: '54%', left: '50%', translateX: '-50%' },
        style: { maxWidth: '560px', descSize: 'text-lg', textAlign: 'center' },
        motion: { enter: 'slideLeft', duration: 700, delay: 300, easing: 'ease-out' },
      },
      {
        id: 'b-cta',
        type: 'cta',
        content: 'Discover Solutions',
        to: '/use-cases',
        position: { anchor: 'center', top: '68%', left: '50%', translateX: '-50%' },
        motion: { enter: 'slideUp', duration: 650, delay: 430, easing: 'ease-out' },
      },
    ],
  },
  {
    id: 'hero-c',
    title: 'INTRODUCING THE NEO 3 PLATFORM OF PRODUCTS',
    desc: 'ONE COMMON KERNEL. ONE INTEGRATION. MULTIPLE ENVIRONMENTS.',
    primaryCta: { label: 'View the NEO 3 Platform of Products', to: '/products?category=neo3' },
    background: {
      imageUrl: carousel1Image,
      overlay: true,
      overlayOpacity: 0.5,
    },
    layers: [
      {
        id: 'c-title',
        type: 'title',
        content: 'INTRODUCING THE NEO 3 PLATFORM OF PRODUCTS',
        position: {
          anchor: 'center',
          top: '36%',
          left: '39%',
          translateX: '-50%',
          translateY: '-50%',
        },
        style: { maxWidth: '460px', titleSize: 'text-4xl', textAlign: 'left' },
        motion: { enter: 'slideLeft', duration: 780, delay: 140, easing: 'ease-out' },
      },
      {
        id: 'c-desc',
        type: 'desc',
        content: 'ONE COMMON KERNEL. ONE INTEGRATION. MULTIPLE ENVIRONMENTS.',
        position: {
          anchor: 'center',
          top: '36%',
          left: '61%',
          translateX: '-40%',
          translateY: '-50%',
        },
        style: { maxWidth: '400px', descSize: 'text-2xl', textAlign: 'left' },
        motion: { enter: 'slideRight', duration: 780, delay: 280, easing: 'ease-out' },
      },
      {
        id: 'c-image',
        type: 'fgImage',
        imageUrl: carouselInsideImage,
        position: {
          anchor: 'center',
          top: '64%',
          left: '39%',
          translateX: '-50%',
          translateY: '-50%',
        },
        style: { width: '420px', height: '240px' },
        motion: { enter: 'slideDown', duration: 820, delay: 420, easing: 'ease-out' },
      },
      {
        id: 'c-cta',
        type: 'cta',
        content: 'View the NEO 3 Platform of Products',
        to: '/products?category=neo3',
        position: {
          anchor: 'center',
          top: '64%',
          left: '61%',
          translateX: '-50%',
          translateY: '-50%',
        },
        motion: { enter: 'slideUp', duration: 760, delay: 620, easing: 'ease-out' },
      },
    ],
  },
]
