import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/header/logo.png'

const isExternalUrl = (url) => /^https?:\/\//.test(url)

const SITEMAP_COLUMNS = [
  {
    key: 'products',
    sections: [
      {
        title: 'Products',
        links: [
          { label: 'Full Product Catalog', to: '/products' },
          { label: 'Kiodk Platform of Products', to: '/products/collections/neo-3' },
          { label: 'EMV Common Kernel', to: '/products/collections/emv-kernel' },
          {
            label: 'Unattended Payment Solutions',
            to: '/products/collections/unattended-solutions',
          },
          { label: 'Mobile Payment Devices', to: '/products/collections/mobile-payment' },
          { label: 'Countertop Solutions', to: '/products/collections/countertop-systems' },
          { label: 'OEM Payment Products', to: '/products/collections/oem-modules' },
          { label: 'Legacy Products', to: '/products/collections/legacy-products' },
          { label: 'Software Services', to: '/products/collections/software-services' },
        ],
      },
    ],
  },
  {
    key: 'use-cases-resources',
    sections: [
      {
        title: 'Use Cases',
        links: [
          { label: 'All Use Cases', to: '/use-cases' },
          { label: 'Unattended', to: '/use-cases/unattended' },
          { label: 'Mobile', to: '/use-cases/mobile' },
          { label: 'Countertop', to: '/use-cases/countertop' },
          { label: 'OEM', to: '/use-cases/oem' },
        ],
      },
      {
        title: 'Resources',
        links: [{ label: 'Blog', to: 'https://chang-hsi.github.io/my-blog/' }],
      },
    ],
  },
  {
    key: 'support-company',
    sections: [
      {
        title: 'Support',
        links: [
          { label: 'Support Hub', to: 'https://github.com/Chang-Hsi/idtech-clone' },
          { label: 'Knowledge Base', to: 'https://chang-hsi.github.io/react-basic/' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Company Overview', to: '/company' },
          { label: 'About Us', to: '/company/about-us' },
          { label: 'Careers', to: '/company/careers' },
        ],
      },
    ],
  },
]

const FooterLink = ({ label, to }) => {
  const { pathname } = useLocation()
  const className = 'text-[1.2rem] text-white/82 transition-colors duration-200 hover:text-white'

  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    )
  }

  return (
    <Link
      to={to}
      className={className}
      onClick={(event) => {
        if (pathname !== to) return
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      {label}
    </Link>
  )
}

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white/70">
      <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-14 px-4 py-12 sm:px-6 lg:py-16 xl:flex-row xl:items-start xl:gap-28">
        <div className="shrink-0 xl:w-[360px] flex flex-col items-center">
          <Link to="/" className="inline-flex items-center hover:opacity-90">
            <img src={logo} alt="NEXA logo" className="h-50 w-auto object-contain sm:h-54" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/35 px-7 text-sm font-semibold tracking-[0.08em] text-white transition-colors duration-200 hover:border-emerald-5 hover:bg-emerald-500 hover:text-black"
          >
            CONTACT US
          </Link>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {SITEMAP_COLUMNS.map((column) => (
            <div key={column.key} className="space-y-14 lg:space-y-16">
              {column.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[2rem] font-semibold tracking-wide text-white">
                    {section.title}
                  </h2>
                  <div className="mt-6 h-[2px] w-24 bg-white/90" />
                  <ul className="mt-8 space-y-[18px]">
                    {section.links.map((item) => (
                      <li key={`${section.title}-${item.label}`}>
                        <FooterLink label={item.label} to={item.to} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-3 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NEXA Clone. All rights reserved.</p>
          <p className="text-white/50">Built with React, Redux Toolkit, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
