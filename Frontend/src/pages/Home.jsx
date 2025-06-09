import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollections from '../components/Products/FeaturedCollections'
import FeaturesSection from '../components/Products/FeaturesSection'

const placeholderProducts = [
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

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best seller section */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <ProductDetails />
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wear For Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollections />
      <FeaturesSection />
    </div>
  )
}

export default Home
