const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#111418] text-white/70">
      <div className="mx-auto flex w-full max-w-[120rem] flex-col gap-3 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} NEXA Clone. All rights reserved.</p>
        <p className="text-white/50">Built with React, Redux Toolkit, and Tailwind CSS.</p>
      </div>
    </footer>
  )
}

export default Footer
