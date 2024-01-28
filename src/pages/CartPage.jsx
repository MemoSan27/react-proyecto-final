import './styles/CartPage.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk, setCart } from '../store/slices/cart.slice'
import CartProduct from '../components/CartPage/CartProduct'
import addComa from '../utils/addComa'
import axios from 'axios'
import getConfigToken from '../utils/getTokenConfig'
import { useNavigate } from 'react-router-dom'


const CartPage = () => {

  const cart = useSelector(store => store.cart)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( () => {
    dispatch(getCartThunk());
  }, [])

  const totalPriceCart = cart.reduce((acc, cv) => {
    return acc + cv.product.price * cv.quantity
  }, 0)

  const handlePurchase = () => {
    const url = 'https://express-final-project.onrender.com/purchases'
    axios.post(url, '', getConfigToken())
    .then(res => {
      dispatch(setCart([]))
      Swal.fire({
        icon: "success",
        title: `Thanks for your purchase, we would be glad you come back again soon :)`,
        
     });
      navigate('/purchases')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='container2 cart'>
      <h1 className='page__title cart__title'>Your articles inside your cart</h1>
      <div className='cart__card'>
        {
          cart?.map(product => (
            <CartProduct 
              key={product.id}
              product={product}
            />  
          ))
        }
      </div>
      { cart?.[0] 
       ? (
        <>
        <hr className='hr' />
        <footer className='purchase__section'>
          <button className='btnCheckout' onClick={handlePurchase}> <span> Checkout </span> <i className='creditCard bx bxs-credit-card'></i></button>
          <div className='cart__footer'>
            <span className='cart__card-title totals'> Total: </span>
            <span className='cart__card-title totals'> $ &nbsp;  {addComa(totalPriceCart.toFixed(2))} </span>
          </div >
        </footer>
        </>
      )
        : (<><hr className='hr' /> <h1 className='page__title cart__title'> No articles in your car yet</h1></>)
      }
      
    </div>
  )
}

export default CartPage