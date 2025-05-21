import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {M3dCopy,LandingPage} from './Pages'
import {DepthnNormal,PBR} from './Components'
import { Provider } from 'react-redux'
import {store} from './Context/store.js'
import Sample  from './Components/sample.jsx'
import NotFound from './Pages/NotFound.jsx'
import NewLandingPage from './Pages/NewLandingPage.jsx'
import AssetViewer from './Components/AssetViewer.jsx'
import { AssetProvider } from './Components/AssetContext.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import PDFviewer from './Components/PDFviewer.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
import MJPEGStream from './Components/MPEGStreamer.jsx'

const Client_id= import.meta.env.VITE_CLIENT_ID;

// console.log("Client id is ",Client_id)

const router= createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
            path:"/",
            element:<NewLandingPage/>
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
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<SignUp/>
            },
            {
                path:'/research',
                element:<PDFviewer/>
            },
            {
                path:'/camera',
                element:
                <AssetProvider>
                    <Sample/>
                </AssetProvider>
            },
            {
                path:'/stream',
                element:<MJPEGStream/>
            },
            {
                path:"/extraction",
                // element: <M3dCopy/>
                element:
                <AssetProvider>
                <AssetViewer/>
             </AssetProvider>
            }

    ]
    },
    {
        path:"*", 
        element:<NotFound />
    }
])


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={Client_id}>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </GoogleOAuthProvider>
   

)
