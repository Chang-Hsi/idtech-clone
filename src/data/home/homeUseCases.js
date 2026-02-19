import { imageUrls } from '../../assets/imageUrlMap'

const useCase1Image = imageUrls.home.UseCase1
const useCase2Image = imageUrls.home.UseCase2
const useCase3Image = imageUrls.home.UseCase3
const useCase4Image = imageUrls.home.UseCase4
const useCase5Image = imageUrls.home.UseCase5
const useCase6Image = imageUrls.home.UseCase6

export const homeUseCases = [
  {
    id: 'uc-unattended',
    title: 'Unattended',
    desc: 'Reliable payment acceptance for kiosks, vending, EV charging, and parking terminals.',
    to: '/use-cases/unattended',
    imageUrl: useCase1Image,
  },
  {
    id: 'uc-mobile',
    title: 'Mobile',
    desc: 'Lightweight hardware for line-busting and on-the-go commerce across retail environments.',
    to: '/use-cases/mobile',
    imageUrl: useCase2Image,
  },
  {
    id: 'uc-countertop',
    title: 'Countertop',
    desc: 'Durable countertop readers built for high-volume checkouts with secure card-present flows.',
    to: '/use-cases/countertop',
    imageUrl: useCase3Image,
  },
  {
    id: 'uc-oem',
    title: 'OEM',
    desc: 'Embedded payment modules for manufacturers that need seamless integration flexibility.',
    to: '/use-cases/oem',
    imageUrl: useCase4Image,
  },
  {
    id: 'uc-enterprise',
    title: 'Enterprise Rollouts',
    desc: 'Deployment playbooks and hardware governance for multi-location organizations.',
    to: '/use-cases',
    imageUrl: useCase5Image,
  },
  {
    id: 'uc-transit',
    title: 'Transit & Mobility',
    desc: 'Tap-and-pay ready terminals designed for speed and resilience in transportation systems.',
    to: '/use-cases',
    imageUrl: useCase6Image,
  },
]
