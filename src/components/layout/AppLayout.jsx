import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#171A1F]">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
