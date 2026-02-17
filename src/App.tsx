
import { Outlet } from 'react-router'
import Footer from './components/layouts/Footer'
import Navbar from './components/layouts/Navbar'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="grow pt-16">
        <Outlet></Outlet>
      </main>

      <Footer />
    </div>
    </>
  )
}

export default App
