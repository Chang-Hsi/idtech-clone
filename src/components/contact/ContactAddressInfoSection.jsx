import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import useInViewOnce from '../../hooks/useInViewOnce'

const ICON_BY_TYPE = {
  phone: PhoneIcon,
  email: EnvelopeIcon,
  address: MapPinIcon,
}

const ContactAddressInfoSection = ({ content, cards }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full px-4 sm:px-16">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            className={`${isInView ? 'fade-left-in' : 'opacity-0'} text-3xl font-semibold text-slate-900 sm:text-4xl`}
            style={{
              '--anim-distance': '24px',
              '--anim-duration': '600ms',
              '--anim-delay': '80ms',
            }}
          >
            {content.title}
          </h2>
          <p
            className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 text-sm leading-7 text-slate-600 sm:text-base`}
            style={{
              '--anim-distance': '24px',
              '--anim-duration': '640ms',
              '--anim-delay': '140ms',
            }}
          >
            {content.description}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-10 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, index) => (
            <article
              key={card.id}
              className={`${isInView ? 'fade-left-in' : 'opacity-0'}  p-5`}
              style={{
                '--anim-distance': '24px',
                '--anim-duration': '620ms',
                '--anim-delay': `${160 + index * 70}ms`,
              }}
            >
              <h3 className="pb-2 text-base font-semibold text-slate-900">{card.region}</h3>
              <ul className="mt-3 space-y-2">
                {card.rows.map((row) => {
                  const Icon = ICON_BY_TYPE[row.type] ?? MapPinIcon

                  return (
                    <li key={row.id} className="flex items-start gap-10">
                      <span className="w-5 shrink-0 text-slate-500">
                        <Icon aria-hidden="true" className="h-8 w-8 text-[#00B388]" />
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="break-words text-base leading-6 text-slate-700 underline-offset-2 transition hover:text-slate-900 hover:underline focus-visible:text-slate-900 focus-visible:underline focus-visible:outline-none"
                        >
                          {row.text}
                        </a>
                      ) : (
                        <span className="text-base leading-6 text-slate-600">{row.text}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactAddressInfoSection
