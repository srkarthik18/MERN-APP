import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserOrders } from '../redux/slices/orderSlice'
import { useSelector, useDispatch } from 'react-redux'

const MyOrderPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(fetchUserOrders())
  }, [dispatch])

  const handleRowClick = orderId => {
    navigate(`/order/${orderId}`)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching orders: {error.message}</div>

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
      <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
        <table className='min-w-full text-left text-gray-50'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-2 px-4 sm:py-3'>Image</th>
              <th className='py-2 px-4 sm:py-3'>Order ID</th>
              <th className='py-2 px-4 sm:py-3'>CreatedAt</th>
              <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
              <th className='py-2 px-4 sm:py-3'>Items</th>
              <th className='py-2 px-4 sm:py-3'>Price</th>
              <th className='py-2 px-4 sm:py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr
                  key={order._id}
                  className='border-b hover:border-gray-50 cursor-pointer'
                  onClick={() => handleRowClick(order._id)}
                >
                  <td className='py-2 px-2 sm:py-4 sm:px-4'>
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                    />
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    #{order?._id}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    {order?.shippingAddress
                      ? `${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.country}`
                      : 'N/A'}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    {order.orderItems.length}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    $ {order.totalPrice}
                  </td>
                  <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-700 whitespace-nowrap'>
                    <span
                      className={`${
                        order.isPaid
                          ? 'bg-gray-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='text-center py-4 px-4 text-gray-500'>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrderPage
