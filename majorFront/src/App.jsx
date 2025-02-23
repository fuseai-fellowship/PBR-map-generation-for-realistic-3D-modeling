import { Outlet } from 'react-router-dom'
import { Navbar} from './Components'


function App() {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}

export default App
