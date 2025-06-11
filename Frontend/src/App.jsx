import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'

export default function App () {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='collections/:collection' element={<CollectionPage />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<Checkout />} />
          {/* Add more routes as needed */}
        </Route>
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
