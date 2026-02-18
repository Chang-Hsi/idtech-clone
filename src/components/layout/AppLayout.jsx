import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTopOnRouteChange from './ScrollToTopOnRouteChange'

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#171A1F]">
      <ScrollToTopOnRouteChange />
      <Header />
      <main className="w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
