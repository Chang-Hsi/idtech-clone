import useInViewOnce from '../../../hooks/useInViewOnce'

const getAnimationStyle = (isInView, animation, delay) => {
  if (!isInView) return { opacity: 0 }
  return {
    animation: `${animation} 760ms ease-out ${delay}ms both`,
    willChange: 'transform, opacity',
  }
}

const CollectionHeroSection = ({ collection }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] items-center overflow-hidden bg-black text-white sm:min-h-[32rem] lg:min-h-[36rem]"
    >
      {collection.media?.heroImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${collection.media.heroImageUrl})` }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="text-2xl font-extrabold tracking-[0.14em] text-[#00B388]">COLLECTION</p>

        <div className="mt-6 flex flex-col gap-6">
          <h1
            className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
            style={getAnimationStyle(isInView, 'collectionSlideLeft', 80)}
          >
            {collection.heroTitle}
          </h1>

          <p
            className="max-w-3xl text-base text-white/85 sm:text-lg lg:text-xl"
            style={getAnimationStyle(isInView, 'collectionSlideLeft', 220)}
          >
            {collection.heroSubtitle}
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes collectionSlideLeft {
            from { opacity: 0; transform: translateX(-128px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes collectionSlideRight {
            from { opacity: 0; transform: translateX(128px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </section>
  )
}

export default CollectionHeroSection
