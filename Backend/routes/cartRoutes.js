const express = require('express')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// Function to get the cart for a user or guest
const getCart = async (userId, guestId) => {
  if (userId) {
    // If userId is provided, find the cart for the logged-in user
    return await Cart.findOne({ user: userId })
  } else if (guestId) {
    // If guestId is provided, find the cart for the guest
    return await Cart.findOne({ guestId })
  }
  // If neither userId nor guestId is provided, return null
  return null
}

// @Route POST /api/cart
// @desc Add product to cart for a guest or logged-in user
// @access Public
router.post('/', async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body
  try {
    // Find the product by ID
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    // Check if the cart exists for the user or guest
    let cart = await getCart(userId, guestId)
    if (cart) {
      const productIndex = cart.products.findIndex(
        item =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      )
      if (productIndex > -1) {
        // If the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity
      } else {
        // If the product does not exist, add it to the cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity
        })
      }
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      await cart.save()
      return res.status(200).json(cart)
    } else {
      // If the cart does not exist, create a new one for guest or user
      const newCart = await Cart.create({
        user: userId ?? undefined,
        guestId: guestId || 'guest_' + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity
          }
        ],
        totalPrice: product.price * quantity
      })
      //   await newCart.save()
      return res.status(201).json(newCart)
    }
  } catch (error) {
    console.error('Error adding product to cart:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// @Route PUT /api/cart
// @desc Update product quantity in cart for a guest or logged-in user
// @access Public

router.put('/', async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body
  try {
    // Find the cart for the user or guest
    const cart = await getCart(userId, guestId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    )
    if (productIndex > -1) {
      // Update the quantity of the product
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity
      } else {
        // If quantity is 0 or less, remove the product from the cart
        cart.products.splice(productIndex, 1)
      }
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      await cart.save()
      return res.status(200).json(cart)
    } else {
      return res.status(404).json({ message: 'Product not found in cart' })
    }
  } catch (error) {
    console.error('Error updating product in cart:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// @Route DELETE /api/cart
// @desc Remove product from cart for a guest or logged-in user
//  @access Public

router.delete('/', async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body
  try {
    // Find the cart for the user or guest
    const cart = await getCart(userId, guestId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      item =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    )
    if (productIndex > -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1)
      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      await cart.save()
      return res.status(200).json(cart)
    } else {
      return res.status(404).json({ message: 'Product not found in cart' })
    }
  } catch (error) {
    console.error('Error removing product from cart:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// @Route GET /api/cart
// @desc Get cart for a guest or logged-in user
// @access Public

router.get('/', async (req, res) => {
  const { guestId, userId } = req.query
  try {
    // Find the cart for the user or guest
    const cart = await getCart(userId, guestId)
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }
    return res.status(200).json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

// @Route POST /api/cart/merge
// @desc Merge guest cart with user cart
// @access Private

router.post('/merge', protect, async (req, res) => {
  const { guestId } = req.body

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId })
    const userCart = await Cart.findOne({ user: req.user._id })
    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res
          .status(200)
          .json({ message: 'No products in guest cart to merge' })
      }
      if (userCart) {
        // If user cart exists, merge products
        guestCart.products.forEach(guestItem => {
          const productIndex = userCart.products.findIndex(
            item =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          )
          if (productIndex > -1) {
            // If product exists in user cart, update quantity
            userCart.products[productIndex].quantity += guestItem.quantity
          } else {
            // If product doesn't exist in user cart, add it
            userCart.products.push(guestItem)
          }
        })
        // Recalculate total price for user cart
        userCart.totalPrice = userCart.products.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
        await userCart.save()
        // Delete the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId })
        } catch (error) {
          console.error('Error deleting guest cart:', error)
        }
        return res.status(200).json(userCart)
      } else {
        //    If user cart does not exist, convert guest cart to user cart
        guestCart.user = req.user._id
        guestCart.guestId = undefined // Clear guestId since it's now a user cart
        await guestCart.save()
        return res.status(200).json(guestCart)
      }
    } else {
      if (userCart) {
        //  guest cart has already been merged, return user cart
        return res.status(200).json(userCart)
      }
      return res.status(404).json({ message: 'No guest cart found to merge' })
    }
  } catch (error) {
    console.error('Error merging carts:', error)
    return res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
