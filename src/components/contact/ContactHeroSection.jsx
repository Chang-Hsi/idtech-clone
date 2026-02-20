import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import useInViewOnce from '../../hooks/useInViewOnce'

const ICON_BY_TYPE = {
  phone: PhoneIcon,
  email: EnvelopeIcon,
  address: MapPinIcon,
}

const ContactHeroSection = ({ hero }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="h-[90vh] bg-slate-100">
      <div className="grid h-full w-full grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} overflow-hidden bg-black`}
          style={{ '--anim-distance': '30px', '--anim-duration': '700ms', '--anim-delay': '80ms' }}
        >
          <img src={hero.imageUrl} alt={hero.imageAlt} className="h-full w-full object-cover" />
        </div>

        <aside
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} flex h-full flex-col justify-center bg-[#101218] p-8 text-white sm:p-10 lg:p-14`}
          style={{ '--anim-distance': '30px', '--anim-duration': '700ms', '--anim-delay': '160ms' }}
        >
          <p className="text-sm font-semibold tracking-[0.42em] text-[#00B388] sm:text-base">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-tight sm:text-6xl">{hero.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/75 sm:text-xl">{hero.description}</p>

          <div className="mt-10 space-y-8">
            {hero.infoGroups.map((group) => (
              <section key={group.id} aria-label={group.heading}>
                <h2 className="mb-8 text-2xl font-semibold text-white">{group.heading}</h2>
                <ul className="mt-3 space-y-2">
                  {group.rows.map((row) => {
                    const Icon = ICON_BY_TYPE[row.type] ?? MapPinIcon
                    const commonTextClass =
                      'break-words text-2xl leading-6 text-white/75 underline-offset-2 transition'

                    return (
                      <li key={row.id} className="flex items-start gap-3">
                        <span className="w-14 py-1 shrink-0 text-[#00B388]">
                          <Icon aria-hidden="true" className="h-10 w-10" />
                        </span>
                        {row.href ? (
                          <a
                            href={row.href}
                            className={`${commonTextClass} hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none`}
                          >
                            {row.text}
                          </a>
                        ) : (
                          <span className={commonTextClass}>{row.text}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ContactHeroSection
