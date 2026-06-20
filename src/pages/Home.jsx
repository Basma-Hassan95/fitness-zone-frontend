import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Plans from '../components/Plans'
import Team from '../components/Team'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Plans />
      <Team />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home