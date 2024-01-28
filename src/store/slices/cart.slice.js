import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfigToken from "../../utils/getTokenConfig";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (currentValue, {payload}) => [...currentValue, payload],
        removeFromCart: (currentValue, {payload}) => currentValue.filter(product => product.id !== payload), 
        setCart: (currentValue, {payload}) => payload
    }
})

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;

const baseURL = 'https://express-final-project.onrender.com/productcarts';

export const getCartThunk = () => (dispatch) => {
    const url = `${baseURL}`
    axios.get(url, getConfigToken())
    .then( res => dispatch(setCart(res.data)))
    .catch(err => console.log(err))
}

export const addProductToCartThunk = (productId, quantity = 1) => (dispatch) => {
    const url = `${baseURL}`
    const data = {
        productId,
        quantity,
    }
    axios.post(url, data, getConfigToken())
    .then(res => {
        
        Swal.fire({
            icon: "success",
            title: `Product added to cart success`,
            timer: 1000,
         });
    })
    .catch(err => {
        if(err.response.data.error === 'Product already added to cart'){
            Swal.fire({
                icon: "error",
                title: `Product already in your cart`,
                timer: 1500,
             });
        }
        console.log(err)
    })
}

export const deleteProductFromCartThunk = (id) => (dispatch) => {
    const url = `${baseURL}/${id}`
    axios.delete(url, getConfigToken())
    .then(res => {
        dispatch(removeFromCart(id));
        Swal.fire({
            icon: "success",
            title: `Product removed from cart success`,
            timer: 1000,
        });    
    })
    .catch(err => console.log(err))
}

 