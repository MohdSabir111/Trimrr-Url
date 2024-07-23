
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import UrlProvider from './Context'
import RequireAuth from './components/require-auth'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element : <Landing/>
      },
      {
        path:'/dashboard',
        element : <RequireAuth> <Dashboard/> </RequireAuth> 
      },   {
        path:'/auth',
        element : <Auth/>
      },   {
        path:'/link/:id',
        element :   <RequireAuth> <Link/> </RequireAuth>
      },   {
        path:'/:id',
        element : <RedirectLink/>
      },
    ]
  }
])

function App() {
 

  return <UrlProvider>
   <RouterProvider router = {router} />
   </UrlProvider>
}

export default App
