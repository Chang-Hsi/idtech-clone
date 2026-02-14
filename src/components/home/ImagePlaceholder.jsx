const ImagePlaceholder = ({ ratio = 'aspect-[16/9]', label = 'Image Placeholder', className = '' }) => {
  return (
    <div
      className={`${ratio} w-full rounded-sm border border-white/10 bg-zinc-700/40 text-white/40 flex items-center justify-center text-sm ${className}`}
    >
      {label}
    </div>
  )
}

export default ImagePlaceholder
