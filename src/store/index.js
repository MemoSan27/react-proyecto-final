import { configureStore } from "@reduxjs/toolkit";
import products from './slices/products.slice'
import cart from './slices/cart.slice'
import login from './slices/log.slice'

const store = configureStore({
    reducer: {
        products,
        cart,
        login
    }
})

export default store