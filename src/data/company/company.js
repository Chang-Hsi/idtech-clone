import company1 from '../../assets/company/company1.jpg'
import company2 from '../../assets/company/company2.jpg'

export const companyPageContent = {
  hero: {
    eyebrow: 'COMPANY',
    title: 'Build with a Team Focused on Payment Excellence',
    description:
      'Learn who we are, how we work, and why enterprise teams choose us for long-term payment programs.',
  },
  cards: [
    {
      id: 'about-us',
      title: 'About Us',
      description:
        'Discover our company story, engineering values, and the product standards behind our payment platforms.',
      to: '/company/about-us',
      imageUrl: company1,
    },
    {
      id: 'careers',
      title: 'Careers',
      description:
        'Join a team building scalable payment experiences across hardware, software, and enterprise services.',
      to: '/company/careers',
      imageUrl: company2,
    },
  ],
}
