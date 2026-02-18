import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import useInViewOnce from '../../../hooks/useInViewOnce'
import backgroundImage2 from '../../../assets/company/backgroundImage2.jpg'

const AboutUsConnectInfoSection = ({ connectInfo }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 text-white md:py-16"
      style={{
        backgroundImage: `url(${backgroundImage2})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/78" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={`${isInView ? 'fade-up-in' : 'opacity-0'} text-center`}
          style={{ '--anim-distance': '18px', '--anim-delay': '60ms' }}
        >
          <h2 className="text-3xl tracking-wide font-semibold sm:text-4xl">{connectInfo.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
            {connectInfo.description}
          </p>
        </div>

        <div className="mt-10 py-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {connectInfo.offices.map((office, index) => (
            <article
              key={office.id}
              className={`${isInView ? 'fade-up-in' : 'opacity-0'} flex min-h-[18rem] flex-col items-center justify-between p-6 text-center`}
              style={{ '--anim-distance': '14px', '--anim-delay': `${index * 120 + 120}ms` }}
            >
              <div>
                <p className="text-2xl font-semibold tracking-[0.04em] text-white">{office.name}</p>
                <div className="mx-auto mt-4 h-[2px] w-[50px] bg-emerald-500" />
                <p className="mt-5 text-lg text-white/95">{office.phone}</p>
                <p className="mx-auto mt-4 max-w-[30rem] text-base leading-relaxed text-white/88">
                  {office.address}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <a
                  href={office.phoneHref}
                  aria-label={`Call ${office.name}`}
                  className="rounded-full border border-emerald-500/70 p-2 text-emerald-500 transition-colors hover:bg-emerald-500/10"
                >
                  <PhoneIcon className="h-6 w-6" />
                </a>
                <a
                  href={office.emailHref}
                  aria-label={`Email ${office.name}`}
                  className="rounded-full border border-emerald-500/70 p-2 text-emerald-500 transition-colors hover:bg-emerald-500/10"
                >
                  <EnvelopeIcon className="h-6 w-6" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUsConnectInfoSection
