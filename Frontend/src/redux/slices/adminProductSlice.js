import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem('userToken')}`

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`, {
        headers: {
          Authorization: USER_TOKEN
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching admin products:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async function to create a new product
export const createAdminProduct = createAsyncThunk(
  'adminProducts/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products`,
        productData,
        {
          headers: {
            Authorization: USER_TOKEN
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error creating admin product:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async function to update an existing product
export const updateProduct = createAsyncThunk(
  'adminProducts/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: {
            Authorization: USER_TOKEN
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error updating admin product:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Async function to delete a product
export const deleteProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/products/${id}`,
        {
          headers: {
            Authorization: USER_TOKEN
          }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error deleting admin product:', error)
      return rejectWithValue(error.response.data)
    }
  }
)

// Create the admin product slice
const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdminProducts.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to fetch products'
      })
      .addCase(createAdminProduct.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to create product'
      })
      .addCase(updateProduct.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.products.findIndex(
          product => product._id === action.payload._id
        )
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to update product'
      })
      .addCase(deleteProduct.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(
          product => product._id !== action.payload._id
        )
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to delete product'
      })
  }
})

export default adminProductSlice.reducer
