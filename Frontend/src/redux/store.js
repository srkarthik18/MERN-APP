import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    admin: adminReducer,
    orders: orderReducer,
    checkout: checkoutReducer,
    cart: cartReducer
  }
})

export default store
