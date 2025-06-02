import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser
} from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const HandleToggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        <div>
          <Link className='text-2xl font-medium' to='/'>
            ShopEase
          </Link>
        </div>
        <div className='hidden md:flex space-x-6'>
          <Link
            to='#'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Men
          </Link>
          <Link
            to='#'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Women
          </Link>
          <Link
            to='#'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            Top Wear
          </Link>
          <Link
            to='#'
            className='text-gray-700 hover:text-black text-sm font-medium uppercase'
          >
            bottom Wear
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link to='/profile' className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700 hover:text-black' />
          </Link>
          <button
            className='relative hover:text-black'
            onClick={HandleToggleCartDrawer}
          >
            <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
            <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>
              4
            </span>
          </button>
          <div className='overflow-hidden md:overflow-visible'>
            <SearchBar />
          </div>
          <button className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>
      <CartDrawer
        drawerOpen={drawerOpen}
        HandleToggleCartDrawer={HandleToggleCartDrawer}
      />
    </div>
  )
}

export default Navbar
