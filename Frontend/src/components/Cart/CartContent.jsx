import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import {
  removeFromCart,
  updateCartItemQuantity
} from '../../redux/slices/cartSlice'

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch()

  // Handle adding or removing items from the cart
  const handleAddToCart = (productId, delta, quantity, size, colour) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          colour,
          guestId,
          userId
        })
      )
    }
  }

  const handleRemoveFromCart = (productId, size, colour) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        colour
      })
    )
  }

  return (
    <div>
      {cart.products.map(product => (
        <div
          key={product.productId}
          className='flex items-start justify-between py-4 border-b'
        >
          <div className='flex items-start'>
            <img
              src={product.image}
              alt={product.name}
              className='w-16 h-20 sm:w-20 sm:h-24 object-cover mr-4 rounded'
            />
            <div>
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                size: {product.size} | {product.colour}
              </p>
              <div className='flex items-center mt-2'>
                <button
                  className='border rounded px-2 py-1 text-xl font-medium'
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.colour
                    )
                  }
                >
                  -
                </button>
                <span className='mx-4'>{product.quantity}</span>
                <button
                  className='border rounded px-2 py-1 text-xl font-medium'
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.colour
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className='font-medium'>$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.colour
                )
              }
            >
              <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContent
