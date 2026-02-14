import { useEffect, useMemo, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const MOTION_TO_KEYFRAME = {
  slideDown: 'heroSlideDown',
  slideUp: 'heroSlideUp',
  slideLeft: 'heroSlideLeft',
  slideRight: 'heroSlideRight',
  fade: 'heroFade',
  zoom: 'heroZoom',
}

const getOverlayOpacity = (background = {}) => {
  if (!background.overlay) return null

  const raw = background.overlayOpacity
  if (typeof raw !== 'number') return 0.45

  return Math.max(0, Math.min(1, raw))
}

const getPositionStyle = (position = {}) => {
  const { anchor = 'left', top, left, right, translateX, translateY } = position

  const style = {
    top: top ?? '50%',
    left: left ?? (anchor === 'center' ? '50%' : anchor === 'left' ? '6rem' : undefined),
    right: right ?? (anchor === 'right' ? '6rem' : undefined),
  }

  const finalTranslateX = translateX ?? (anchor === 'center' ? '-50%' : '0')
  const finalTranslateY = translateY ?? '0'
  style.transform = `translate(${finalTranslateX}, ${finalTranslateY})`

  return style
}

const getLayerAnimationStyle = (isActive, motion = {}) => {
  if (!isActive) return { opacity: 0 }

  const {
    enter = 'fade',
    duration = 650,
    delay = 0,
    easing = 'ease-out',
  } = motion

  const animationName = MOTION_TO_KEYFRAME[enter] ?? MOTION_TO_KEYFRAME.fade

  return {
    animation: `${animationName} ${duration}ms ${easing} ${delay}ms both`,
    willChange: 'transform, opacity',
  }
}

const renderLayer = (layer, isActive) => {
  const positionStyle = getPositionStyle(layer.position)
  const motionStyle = getLayerAnimationStyle(isActive, layer.motion)
  const layerStyle = layer.style ?? {}

  if (layer.type === 'title') {
    return (
      <div key={layer.id} className="absolute" style={positionStyle}>
        <h2
          style={{
            maxWidth: layerStyle.maxWidth ?? '720px',
            textAlign: layerStyle.textAlign ?? 'left',
            ...motionStyle,
          }}
          className={`${layerStyle.titleSize ?? 'text-5xl'} leading-tight font-semibold text-white`}
        >
          {layer.content}
        </h2>
      </div>
    )
  }

  if (layer.type === 'desc') {
    return (
      <div key={layer.id} className="absolute" style={positionStyle}>
        <p
          style={{
            maxWidth: layerStyle.maxWidth ?? '560px',
            textAlign: layerStyle.textAlign ?? 'left',
            ...motionStyle,
          }}
          className={`${layerStyle.descSize ?? 'text-lg'} text-white/80`}
        >
          {layer.content}
        </p>
      </div>
    )
  }

  if (layer.type === 'cta') {
    return (
      <div key={layer.id} className="absolute" style={positionStyle}>
        <Link
          to={layer.to ?? '/'}
          style={motionStyle}
          className="inline-flex items-center rounded-sm bg-[#7DC242] px-5 py-3 text-sm font-medium text-[#121417] hover:bg-[#93d25b]"
        >
          {layer.content ?? 'Learn More'}
        </Link>
      </div>
    )
  }

  if (layer.type === 'fgImage') {
    const width = layerStyle.width ?? '240px'
    const height = layerStyle.height ?? '160px'

    return (
      <div key={layer.id} className="absolute" style={positionStyle}>
        {layer.imageUrl ? (
          <img
            src={layer.imageUrl}
            alt={layer.content ?? 'Foreground visual'}
            style={{ width, height, ...motionStyle }}
            className="rounded-sm border border-white/10 object-cover"
          />
        ) : (
          <div
            style={{ width, height, ...motionStyle }}
            className="rounded-sm border border-white/10 bg-zinc-700/40 text-sm text-white/40 flex items-center justify-center"
          >
            FG Image
          </div>
        )}
      </div>
    )
  }

  return null
}

const HeroCarousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!slides.length) return undefined

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [slides.length])

  const safeSlides = useMemo(() => slides ?? [], [slides])
  const totalSlides = safeSlides.length

  const handlePrevSlide = () => {
    if (!totalSlides) return
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNextSlide = () => {
    if (!totalSlides) return
    setActiveIndex((prev) => (prev + 1) % totalSlides)
  }

  if (!safeSlides.length) {
    return <section className="min-h-screen bg-[#171A1F]" />
  }

  return (
    <section className="relative h-screen overflow-hidden bg-[#171A1F] text-white">
      {safeSlides.map((slide, index) => {
        const isActive = index === activeIndex

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {slide.background?.imageUrl ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.background.imageUrl})` }}
                aria-hidden="true"
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-700/40" aria-hidden="true" />
            )}

            {slide.background?.overlay && (
              <div
                className="absolute inset-0 bg-black"
                style={{ opacity: getOverlayOpacity(slide.background) }}
                aria-hidden="true"
              />
            )}

            <div className="relative mx-auto h-full w-full max-w-[120rem] px-6">
              {slide.layers.map((layer) => renderLayer(layer, isActive))}
            </div>
          </div>
        )
      })}

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {safeSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 w-8 rounded-full transition-colors ${
              activeIndex === index ? 'bg-[#339545]' : 'bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-0 z-30 flex h-24 w-12 -translate-y-1/2 items-center justify-center rounded-r-sm bg-[#339545] text-white hover:bg-[#339545]"
      >
        <ChevronLeftIcon className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={handleNextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-0 z-30 flex h-24 w-12 -translate-y-1/2 items-center justify-center rounded-l-sm bg-[#339545] text-white hover:bg-[#339545]"
      >
        <ChevronRightIcon className="h-7 w-7" />
      </button>

      <style>
        {`
          @keyframes heroSlideDown {
            from { opacity: 0; transform: translateY(-128px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroSlideUp {
            from { opacity: 0; transform: translateY(128px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroSlideLeft {
            from { opacity: 0; transform: translateX(-128px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroSlideRight {
            from { opacity: 0; transform: translateX(128px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes heroFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes heroZoom {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </section>
  )
}

export default HeroCarousel
