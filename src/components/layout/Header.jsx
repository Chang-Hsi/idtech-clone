import { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/header/logo.png'

const dropdownEnterStyle = {
  animation: 'headerDropdownSlideDown 300ms cubic-bezier(0.56, 1, 0.3, 1) both',
}

const isExternalUrl = (url) => /^https?:\/\//.test(url)

const NAV_ITEMS = [
  {
    key: 'products',
    label: 'Products',
    to: '/products',
    dropdown: [
      { label: 'Full Product Catalog', to: '/products' },
      { label: 'Kiodk Platform of Products', to: '/products/collections/neo-3' },
      { label: 'EMV Common Kernel', to: '/products/collections/emv-kernel' },
      { label: 'Unattended Payment Solutions', to: '/products/collections/unattended-solutions' },
      { label: 'Mobile Payment Devices', to: '/products/collections/mobile-payment' },
      { label: 'Countertop Solutions', to: '/products/collections/countertop-systems' },
      { label: 'OEM Payment Products', to: '/products/collections/oem-modules' },
      { label: 'Legacy Products', to: '/products/collections/legacy-products' },
      { label: 'Software Services', to: '/products/collections/software-services' },
    ],
  },
  {
    key: 'useCases',
    label: 'Use Cases',
    to: '/use-cases',
    dropdown: [
      { label: 'All Use Cases', to: '/use-cases' },
      { label: 'Unattended', to: '/use-cases/unattended' },
      { label: 'Mobile', to: '/use-cases/mobile' },
      { label: 'Countertop', to: '/use-cases/countertop' },
      { label: 'OEM', to: '/use-cases/oem' },
    ],
  },
  {
    key: 'support',
    label: 'Support',
    to: 'https://github.com/Chang-Hsi/idtech-clone',
    dropdown: [
      { label: 'Support Hub', to: 'https://github.com/Chang-Hsi/idtech-clone' },
      { label: 'Knowledge Base', to: 'https://chang-hsi.github.io/react-basic/' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    to: '/resources',
    dropdown: [{ label: 'Blog', to: 'https://chang-hsi.github.io/my-blog/' }],
  },
  {
    key: 'company',
    label: 'Company',
    to: '/company',
    dropdown: [
      { label: 'Company Overview', to: '/company' },
      { label: 'About Us', to: '/company/about-us' },
      { label: 'Careers', to: '/company/careers' },
    ],
  },
]

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const dropdownCloseTimerRef = useRef(null)

  const [activeDropdownKey, setActiveDropdownKey] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileOpenKey, setMobileOpenKey] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isCompact, setIsCompact] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const { pathname, search } = location
  const isHome = pathname === '/'

  const activeMainKey = useMemo(() => {
    if (pathname === '/products' || pathname.startsWith('/products/')) return 'products'
    if (pathname.startsWith('/use-cases')) return 'useCases'
    if (pathname.startsWith('/support')) return 'support'
    if (pathname.startsWith('/resources')) return 'resources'
    if (pathname.startsWith('/company')) return 'company'

    return null
  }, [pathname])

  const isContactActive = pathname.startsWith('/contact')

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setActiveDropdownKey(null)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownCloseTimerRef.current) {
        clearTimeout(dropdownCloseTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveDropdownKey(null)
      setIsMobileMenuOpen(false)
      setMobileOpenKey(null)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsCompact(currentY > 80)

      if (!isHome) {
        setIsHidden(false)
        lastScrollYRef.current = currentY
        return
      }

      const isScrollingDown = currentY > lastScrollYRef.current

      if (currentY > 160 && isScrollingDown) {
        setIsHidden(true)
      } else if (!isScrollingDown) {
        setIsHidden(false)
      }

      lastScrollYRef.current = currentY
    }

    lastScrollYRef.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleSearchToggle = () => {
    setActiveDropdownKey(null)
    setIsMobileMenuOpen(false)
    setIsSearchOpen((prev) => {
      const next = !prev

      if (next) {
        const params = new URLSearchParams(search)
        setSearchKeyword(params.get('s') ?? '')
      } else {
        setSearchKeyword('')
      }

      return next
    })
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchKeyword('')
  }

  const handleMobileMenuToggle = () => {
    setIsSearchOpen(false)
    setActiveDropdownKey(null)
    setIsMobileMenuOpen((prev) => !prev)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
    setMobileOpenKey(null)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const keyword = searchKeyword.trim()

    if (!keyword) {
      navigate('/')
      return
    }

    navigate(`/?s=${encodeURIComponent(keyword)}`)
  }

  const handleNavMouseEnter = (key) => {
    if (dropdownCloseTimerRef.current) {
      clearTimeout(dropdownCloseTimerRef.current)
    }
    setActiveDropdownKey(key)
  }

  const handleNavMouseLeave = () => {
    dropdownCloseTimerRef.current = setTimeout(() => {
      setActiveDropdownKey(null)
    }, 150)
  }

  return (
    <div ref={headerRef} className="sticky top-0 z-50">
      <div
        className={`transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <header
          className={`border-b border-white/10 bg-[#1F2328] text-white transition-all duration-300 ${
            isCompact ? 'h-[64px] md:h-[72px]' : 'h-[72px] md:h-[96px]'
          }`}
        >
          <div className="mx-auto flex h-full w-full max-w-[120rem] items-center justify-between px-4 sm:px-6">
            <Link
              to="/"
              onClick={() => setActiveDropdownKey(null)}
              className="flex items-center hover:opacity-90"
            >
              <img
                src={logo}
                alt="NEXA logo"
                className={`w-auto object-contain transition-all duration-300 ${
                  isCompact ? 'h-16 md:h-32' : 'h-32 md:h-56'
                }`}
              />
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              <nav className="flex h-full items-center gap-6 xl:gap-7">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeMainKey === item.key
                  const isDropdownOpen = activeDropdownKey === item.key

                  return (
                    <div
                      key={item.key}
                      className="relative flex h-full items-center"
                      onMouseEnter={() => handleNavMouseEnter(item.key)}
                      onMouseLeave={handleNavMouseLeave}
                    >
                      {isExternalUrl(item.to) ? (
                        <a
                          href={item.to}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setActiveDropdownKey(null)}
                          className="text-base font-medium tracking-wide text-white transition-colors duration-200 hover:text-[#7DC242] xl:text-lg"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <NavLink
                          to={item.to}
                          onClick={() => setActiveDropdownKey(null)}
                          className={`text-base font-medium tracking-wide transition-colors duration-200 hover:text-[#7DC242] xl:text-lg ${
                            isActive ? 'text-[#7DC242]' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </NavLink>
                      )}

                      {isDropdownOpen && (
                        <div
                          className="absolute left-0 top-[54px] z-20 min-w-[280px] pt-3"
                          style={dropdownEnterStyle}
                        >
                          <div className="rounded-sm border border-white/10 bg-[#2B3036] py-3 shadow-2xl">
                            {item.dropdown.map((dropdownItem) =>
                              isExternalUrl(dropdownItem.to) ? (
                                <a
                                  key={dropdownItem.label}
                                  href={dropdownItem.to}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={() => setActiveDropdownKey(null)}
                                  className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:text-[#7DC242] xl:text-base"
                                >
                                  {dropdownItem.label}
                                </a>
                              ) : (
                                <Link
                                  key={dropdownItem.label}
                                  to={dropdownItem.to}
                                  onClick={() => setActiveDropdownKey(null)}
                                  className="block px-4 py-2 text-sm text-white transition-colors duration-200 hover:text-[#7DC242] xl:text-base"
                                >
                                  {dropdownItem.label}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>

              <div className="flex items-center gap-3">
                <NavLink
                  to="/contact"
                  onClick={() => setActiveDropdownKey(null)}
                  className={`rounded border px-4 py-2 text-sm font-medium transition-colors duration-200 xl:text-base ${
                    isContactActive
                      ? 'border-[#7DC242] text-[#7DC242]'
                      : 'border-white text-white hover:border-[#7DC242] hover:text-[#7DC242]'
                  }`}
                >
                  Contact
                </NavLink>

                <button
                  type="button"
                  aria-label="Open search"
                  onClick={handleSearchToggle}
                  className="rounded p-2 text-white transition-colors duration-200 hover:text-[#7DC242]"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                aria-label="Toggle search"
                onClick={handleSearchToggle}
                className="rounded p-2 text-white transition-colors duration-200 hover:text-[#7DC242]"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={handleMobileMenuToggle}
                className="rounded p-2 text-white transition-colors duration-200 hover:text-[#7DC242]"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={handleMobileMenuClose}
          className="absolute inset-0 bg-black/55"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[90vw] max-w-[30rem] overflow-y-auto border-l border-white/10 bg-[#1F2328] p-4 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold tracking-[0.12em] text-white/75">MENU</p>
            <button
              type="button"
              aria-label="Close menu"
              onClick={handleMobileMenuClose}
              className="rounded p-1 text-white transition-colors hover:text-[#7DC242]"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isOpen = mobileOpenKey === item.key
              const isActive = activeMainKey === item.key

              return (
                <div key={item.key} className="rounded-sm border border-white/10 bg-[#2B3036]">
                  <div className="flex items-center justify-between">
                    {isExternalUrl(item.to) ? (
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleMobileMenuClose}
                        className="block px-3 py-2 text-sm font-medium text-white"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <NavLink
                        to={item.to}
                        onClick={handleMobileMenuClose}
                        className={`block px-3 py-2 text-sm font-medium ${isActive ? 'text-[#7DC242]' : 'text-white'}`}
                      >
                        {item.label}
                      </NavLink>
                    )}
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() =>
                        setMobileOpenKey((prev) => (prev === item.key ? null : item.key))
                      }
                      className="px-3 py-2 text-white"
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden border-t border-white/10 bg-[#252A31] transition-all duration-200 ${
                      isOpen ? 'max-h-80 py-1' : 'max-h-0'
                    }`}
                  >
                    {item.dropdown.map((dropdownItem) =>
                      isExternalUrl(dropdownItem.to) ? (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.to}
                          target="_blank"
                          rel="noreferrer"
                          onClick={handleMobileMenuClose}
                          className="block px-4 py-2 text-sm text-white/90 hover:text-[#7DC242]"
                        >
                          {dropdownItem.label}
                        </a>
                      ) : (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.to}
                          onClick={handleMobileMenuClose}
                          className="block px-4 py-2 text-sm text-white/90 hover:text-[#7DC242]"
                        >
                          {dropdownItem.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )
            })}
          </nav>

          <NavLink
            to="/contact"
            onClick={handleMobileMenuClose}
            className={`mt-4 inline-flex w-full justify-center rounded border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              isContactActive
                ? 'border-[#7DC242] text-[#7DC242]'
                : 'border-white text-white hover:border-[#7DC242] hover:text-[#7DC242]'
            }`}
          >
            Contact
          </NavLink>
        </aside>
      </div>

      <div
        aria-hidden={!isSearchOpen}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isSearchOpen
            ? 'max-h-32 translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-1 opacity-0'
        }`}
      >
        <div className="border-b border-white/10 bg-[#2B3036] px-4 py-3 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex w-full max-w-[110rem] items-center gap-2 sm:gap-3"
          >
            <input
              type="search"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Search..."
              className="w-full border-b border-white/20 bg-transparent py-2 text-base text-white placeholder:text-white/60 focus:border-[#7DC242] focus:outline-none sm:text-lg"
            />

            <button
              type="button"
              aria-label="Close search"
              onClick={handleSearchClose}
              className="px-3 py-2 text-base text-white transition-colors duration-200 hover:border-[#7DC242] hover:text-[#7DC242] sm:text-lg"
            >
              X
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes headerDropdownSlideDown {
            from {
              opacity: 0;
              transform: translateY(-4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Header
