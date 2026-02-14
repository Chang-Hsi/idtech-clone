import { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/header/logo.png'

const dropdownEnterStyle = {
  animation: 'headerDropdownSlideDown 300ms cubic-bezier(0.56, 1, 0.3, 1) both',
}

const NAV_ITEMS = [
  {
    key: 'products',
    label: 'Products',
    to: '/products',
    dropdown: [
      { label: 'Full Product Catalog', to: '/products' },
      { label: 'NEO 3 Platform of Products', to: '/products/neo3' },
      { label: 'EMV Common Kernel', to: '/products/emv-kernel' },
      { label: 'Unattended Payment Solutions', to: '/products/unattended' },
      { label: 'Mobile Payment Devices', to: '/products/mobile' },
      { label: 'Countertop Solutions', to: '/products/countertop' },
      { label: 'OEM Payment Products', to: '/products/oem' },
      { label: 'Legacy Products', to: '/products/legacy' },
      { label: 'Software Services', to: '/products/software-services' },
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
    to: '/support',
    dropdown: [
      { label: 'Support Hub', to: '/support' },
      { label: 'Knowledge Base', to: '/support/knowledge-base' },
      { label: 'Product Updates', to: '/support/product-updates' },
      { label: 'Request Help', to: '/support/request-help' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    to: '/resources',
    dropdown: [
      { label: 'All Resources', to: '/resources' },
      { label: 'Whitepapers', to: '/resources/whitepapers' },
      { label: 'Case Studies', to: '/resources/case-studies' },
      { label: 'Press Releases', to: '/resources/press-releases' },
    ],
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

  const handleSearchToggle = () => {
    setActiveDropdownKey(null)
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
    <div
      ref={headerRef}
      className={`sticky top-0 z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <header
        className={`border-b border-white/10 bg-[#1F2328] text-white transition-all duration-300 ${
          isCompact ? 'h-[72px]' : 'h-[108px]'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[120rem] items-center justify-between px-6">
          <Link
            to="/"
            onClick={() => setActiveDropdownKey(null)}
            className="flex items-center hover:opacity-90"
          >
            <img
              src={logo}
              alt="ID TECH logo"
              className={`w-auto object-contain transition-all duration-300 ${
                isCompact ? 'h-[16rem]' : 'h-[18rem]'
              }`}
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <nav className="flex h-full items-center gap-7">
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
                    <NavLink
                      to={item.to}
                      onClick={() => setActiveDropdownKey(null)}
                      className={`text-lg font-medium tracking-wide transition-colors duration-200 hover:text-[#7DC242] ${
                        isActive ? 'text-[#7DC242]' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </NavLink>

                    {isDropdownOpen && (
                      <div
                        className="absolute left-0 top-[54px] z-20 min-w-[280px] pt-3"
                        style={dropdownEnterStyle}
                      >
                        <div className="rounded-sm border border-white/10 bg-[#2B3036] py-3 shadow-2xl">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              to={dropdownItem.to}
                              onClick={() => setActiveDropdownKey(null)}
                              className="block px-4 py-2 text-lg text-white transition-colors duration-200 hover:text-[#7DC242]"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
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
                className={`rounded border px-4 py-2 text-lg font-medium transition-colors duration-200 ${
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
                className="rounded p-2 text-lg text-white transition-colors duration-200 hover:text-[#7DC242]"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!isSearchOpen}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isSearchOpen
            ? 'max-h-32 translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-1 opacity-0'
        }`}
      >
        <div className="border-b border-white/10 bg-[#2B3036] px-6 py-3">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex w-full max-w-[110rem] items-center gap-3">
            <input
              type="search"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="Search..."
              className="w-full border-b border-white/20 bg-transparent py-2 text-lg text-white placeholder:text-white/60 focus:border-[#7DC242] focus:outline-none"
            />

            <button
              type="button"
              aria-label="Close search"
              onClick={handleSearchClose}
              className="px-3 py-2 text-lg text-white transition-colors duration-200 hover:border-[#7DC242] hover:text-[#7DC242]"
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
