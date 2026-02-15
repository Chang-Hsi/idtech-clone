import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'

const HIGHLIGHTS = [
  {
    id: 'about-1',
    title: 'Device + Software Expertise',
    desc: 'Integrate readers, kernels, and deployment tooling through one experienced partner.',
  },
  {
    id: 'about-2',
    title: 'Global Readiness',
    desc: 'Scale across regions with compliance-aware guidance and practical implementation support.',
  },
  {
    id: 'about-3',
    title: 'Long-Term Support',
    desc: 'Maintain performance with updates, knowledge resources, and responsive technical teams.',
  },
]

const HIGHLIGHT_BG_CLASSES = ['bg-black', 'bg-[#0B6A3A]', 'bg-black']
const HIGHLIGHT_ANIM_DURATION_MS = 900
const HIGHLIGHT_STAGGER_MS = 380
const CONTENT_DELAY_MS =
  HIGHLIGHT_ANIM_DURATION_MS + HIGHLIGHT_STAGGER_MS * (HIGHLIGHTS.length - 1) + 60

const AboutSection = () => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#1F2328] py-12 text-white md:py-20">
      <div className="mx-auto grid w-full max-w-[120rem] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {HIGHLIGHTS.map((item, index) => (
            <article
              key={item.id}
              className={`${isInView ? 'slide-left-in' : 'opacity-0'} ${HIGHLIGHT_BG_CLASSES[index] ?? 'bg-black'} p-5`}
              style={{
                '--anim-distance': '896px',
                '--anim-duration': `${HIGHLIGHT_ANIM_DURATION_MS}ms`,
                '--anim-delay': `${index * HIGHLIGHT_STAGGER_MS}ms`,
                clipPath: 'polygon(0 0, 96% 0, 88% 100%, 0 100%)',
              }}
            >
              <h3 className="text-xl font-medium sm:text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70 sm:text-base">{item.desc}</p>
            </article>
          ))}
        </div>

        <div
          className={isInView ? 'slide-right-in' : 'opacity-0'}
          style={{
            '--anim-distance': '896px',
            '--anim-duration': '900ms',
            '--anim-delay': `${CONTENT_DELAY_MS}ms`,
          }}
        >
          <p className="text-xl font-extrabold tracking-[0.16em] text-[#7DC242] sm:text-2xl md:text-3xl">
            WHY PARTNER WITH US
          </p>
          <h2 className="my-5 text-2xl font-semibold sm:my-6 sm:text-3xl md:text-4xl">
            Enterprise-grade Payment Foundation
          </h2>
          <p className="mt-4 text-base text-white/75 sm:text-lg md:text-xl">
            We help product teams launch secure, maintainable payment experiences with practical
            architecture, testing, and rollout support.
          </p>
          <Link
            to="/company/about-us"
            className="mt-6 inline-flex rounded-sm border border-white/30 px-4 py-2 text-sm font-medium hover:border-[#7DC242] hover:text-[#7DC242]"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
