import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser
} from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)
  const { cart } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen)
  }
  const HandleToggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        <div>
          <Link className='text-2xl font-medium' to='/'>
            ShopEase
          </Link>
        </div>
        <div className='hidden md:flex space-x-6'>
          <Link
            to='/collections/all?gender=Men'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Men
          </Link>
          <Link
            to='/collections/all?gender=Women'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Women
          </Link>
          <Link
            to='/collections/all?category=Top Wear'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Top Wear
          </Link>
          <Link
            to='/collections/all?category=Bottom Wear'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Bottom Wear
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          {user && user.role === 'admin' && (
            <Link
              to='/admin'
              className='block bg-black px-2 rounded text-sm text-white'
            >
              Admin
            </Link>
          )}

          <Link to='/profile' className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700 hover:text-black' />
          </Link>
          <button
            className='relative hover:text-black'
            onClick={HandleToggleCartDrawer}
          >
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            {cartItemCount > 0 && (
              <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>
                {cartItemCount}
              </span>
            )}
          </button>
          <div className='overflow-hidden md:overflow-visible'>
            <SearchBar />
          </div>
          <button className='md:hidden' onClick={toggleNavDrawer}>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>
      <CartDrawer
        drawerOpen={drawerOpen}
        HandleToggleCartDrawer={HandleToggleCartDrawer}
      />
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdClose className='h-6 w-6 text-gray-600' />
          </button>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='space-y-4'>
            <Link
              to='/collections/all?gender=Men'
              className='block text-gray-600 hover:text-black'
            >
              Men
            </Link>
            <Link
              to='/collections/all?gender=Women'
              className='block text-gray-600 hover:text-black'
            >
              Women
            </Link>
            <Link
              to='/collections/all?category=Top Wear'
              className='block text-gray-600 hover:text-black'
            >
              Top Wear
            </Link>
            <Link
              to='/collections/all?category=Bottom Wear'
              className='block text-gray-600 hover:text-black'
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
