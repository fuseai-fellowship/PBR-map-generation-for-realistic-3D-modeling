import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {M3dCopy,LandingPage} from './Pages'
import {DepthnNormal,PBR} from './Components'
import { Provider } from 'react-redux'
import {store} from './Context/store.js'
const router= createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
            path:"/",
            element:<LandingPage/>
            },
            {
                path:"/DepthnTexture",
                element:<M3dCopy/>
            },
            {
                path:"/pbr",
                element:<PBR/>
            },
            {
                path:"/pointcloud",
                element:<DepthnNormal />

            },
            {
                path:"/research",
                element: <M3dCopy/>
            }

    ]
    }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>

)
