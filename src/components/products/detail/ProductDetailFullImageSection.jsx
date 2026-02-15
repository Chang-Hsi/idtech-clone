import useInViewOnce from '../../../hooks/useInViewOnce'

const ProductDetailFullImageSection = ({ imageUrl, imageAlt }) => {
  const { ref, isInView } = useInViewOnce()

  if (!imageUrl) return null

  return (
    <section ref={ref} className="bg-black">
      <img
        src={imageUrl}
        alt={imageAlt}
        className={`${isInView ? 'fade-up-in' : 'opacity-0'} max-h-[24rem] w-full object-cover`}
        style={{ '--anim-distance': '24px' }}
      />
    </section>
  )
}

export default ProductDetailFullImageSection
