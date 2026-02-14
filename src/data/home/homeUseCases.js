import useCase1Image from '../../assets/home/UseCase1.jpg'
import useCase2Image from '../../assets/home/UseCase2.jpg'
import useCase3Image from '../../assets/home/UseCase3.jpg'
import useCase4Image from '../../assets/home/UseCase4.jpg'
import useCase5Image from '../../assets/home/UseCase5.jpg'
import useCase6Image from '../../assets/home/UseCase6.jpg'

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
