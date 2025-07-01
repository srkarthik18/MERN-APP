import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice'
import adminProductReducer from './slices/adminProductSlice'
import adminOrderReducer from './slices/adminOrderSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    admin: adminReducer,
    orders: orderReducer,
    checkout: checkoutReducer,
    cart: cartReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer
  }
})

export default store
