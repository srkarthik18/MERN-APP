import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSideBar from '../components/Products/FilterSideBar'
import SortOption from './sortOption'
import ProductGrid from '../components/Products/ProductGrid'

const CollectionPage = () => {
  const [products, setProducts] = useState([])
  const sidebarRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleClickOutside = event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: '1',
          name: 'Stylish Jacket',
          price: 79.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=1',
              altTxt: 'Stylish Jacket Front View'
            }
          ]
        },
        {
          _id: '2',
          name: 'Casual Shirt',
          price: 49.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=2',
              altTxt: 'Casual Shirt Front View'
            }
          ]
        },
        {
          _id: '3',
          name: 'Leather Shoes',
          price: 89.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=3',
              altTxt: 'Leather Shoes'
            }
          ]
        },
        {
          _id: '4',
          name: 'Fashionable Watch',
          price: 199.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=4',
              altTxt: 'Fashionable Watch'
            }
          ]
        },
        {
          _id: '5',
          name: 'Stylish Sunglasses',
          price: 29.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=5',
              altTxt: 'Stylish Sunglasses'
            }
          ]
        },
        {
          _id: '6',
          name: 'Trendy Backpack',
          price: 59.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=6',
              altTxt: 'Trendy Backpack'
            }
          ]
        },
        {
          _id: '7',
          name: 'Elegant Handbag',
          price: 89.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=7',
              altTxt: 'Elegant Handbag'
            }
          ]
        },
        {
          _id: '8',
          name: 'Classic Belt',
          price: 39.99,
          images: [
            {
              url: 'https://picsum.photos/500/500?random=8',
              altTxt: 'Classic Belt'
            }
          ]
        }
      ]
      setProducts(fetchedProducts)
    }, 1000)
  }, [])

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Mobile filter button */}
      <button
        className='lg:hidden border p-2 flex justify-end items-center px-6'
        onClick={toggleSidebar}
      >
        <FaFilter className='mr-2' />
      </button>
      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
        {/* sort Option */}
        <SortOption />
        {/* product grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default CollectionPage
