import { Link } from 'react-router-dom'

const GetInTouchBanner = () => {
  return (
    <section className="bg-[#171A1F] text-white">
      <div className="mx-auto w-full ">
        <div className="relative overflow-hidden">
          <div
            className="relative flex aspect-[21/6] items-center justify-center bg-center bg-cover bg-no-repeat px-6 text-center"
            style={{ backgroundImage: `url(${'/src/assets/home/Touch.jpg'})` }}
          >
            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="text-5xl font-semibold pb-6">Get in touch!</h2>
              <Link
                to="/contact"
                className="mt-5 inline-flex rounded-sm bg-[#7DC242] px-5 py-3 text-lg font-medium text-[#121417] hover:bg-[#93d25b]"
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
