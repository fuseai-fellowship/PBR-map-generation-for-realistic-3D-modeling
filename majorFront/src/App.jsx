import { Outlet } from 'react-router-dom'
import { Navbar} from './Components'
import ScrollToTop from './Components/ScrollToTop'

function App() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <Outlet/>
    </>
  )
}

export default App
