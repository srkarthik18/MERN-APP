import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem('userToken')}`

// Async thunk to fetch all orders(admin)
export const fetchAllOrders = createAsyncThunk(
  'adminOrders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: USER_TOKEN
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching all orders:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async thunk to update order delivery status
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        {
          status
        },
        {
          headers: {
            Authorization: USER_TOKEN
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error updating order status:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  'adminOrders/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: {
          Authorization: USER_TOKEN
        }
      })
      return id
    } catch (error) {
      console.error('Error deleting order:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllOrders.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
        state.totalOrders = action.payload.length
        state.totalSales = action.payload.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        )
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to fetch orders'
      })
      .addCase(updateOrderStatus.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrder = action.payload
        const index = state.orders.findIndex(
          order => order._id === updatedOrder._id
        )
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to update order status'
      })
      .addCase(deleteOrder.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = state.orders.filter(
          order => order._id !== action.payload
        )
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to delete order'
      })
  }
})

export default adminOrderSlice.reducer
