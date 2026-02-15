import { Link } from 'react-router-dom'
import getInTouchImage from '../../assets/home/Touch.jpg'

const GetInTouchBanner = () => {
  return (
    <section className="bg-[#171A1F] text-white">
      <div className="mx-auto w-full">
        <div className="relative overflow-hidden">
          <div
            className="relative flex aspect-[16/10] items-center justify-center bg-center bg-cover bg-no-repeat px-4 text-center sm:aspect-[21/6] sm:px-6"
            style={{ backgroundImage: `url(${getInTouchImage})` }}
          >
            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="pb-4 text-3xl font-semibold sm:pb-6 sm:text-4xl lg:text-5xl">
                Get in touch!
              </h2>
              <Link
                to="/contact"
                className="mt-4 inline-flex rounded-sm bg-[#7DC242] px-4 py-2 text-base font-medium text-[#121417] hover:bg-[#93d25b] sm:mt-5 sm:px-5 sm:py-3 sm:text-lg"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouchBanner
