const ProductSpecGroup = ({ label, value }) => {
  return (
    <div className="py-2">
      <h3 className="text-xl leading-4 font-semibold text-black/90">{label}</h3>
      <p className="mt-4 list-disc space-y-3 text-sm text-black/55 sm:text-lg">{value}</p>
    </div>
  )
}

export default ProductSpecGroup
