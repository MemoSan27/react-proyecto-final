import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductFromCartThunk, getCartThunk } from '../../store/slices/cart.slice';
import './styles/CartProduct.css'
import addComa from '../../utils/addComa';
import axios from 'axios';
import getConfigToken from '../../utils/getTokenConfig';
import { useNavigate } from 'react-router-dom';

const CartProduct = ({ product }) => {

  const [ disabled, setDisabled ] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    Swal.fire({
      title: `Are you sure on deleting ${product.product.title} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductFromCartThunk(product.id))
      }
    });
  }

  
  const addQuantity = (product) => {
    
    const data = {
        "quantity": product.quantity + 1
    }
    axios.put(`https://express-final-project.onrender.com/productcarts/${product.id}`, data, getConfigToken())
        .then(res => {
          dispatch(getCartThunk())
        })
        .finally(() => setDisabled(false))
        
    
  }

  const restQuantity = (product) => {
    const data = {
        "quantity": (product.quantity > 1) && product.quantity - 1  
    }
    axios.put(`https://express-final-project.onrender.com/productcarts/${product.id}`, data, getConfigToken())
        .then(res => {
          dispatch(getCartThunk())
        })
        .finally(() => setDisabled(false))
        
}

  return (
    <section className='cart__card-product'>
      <header className='cart__card-product-imgCont'>
        <img className='cart__card-product-img' src={product.product.images?.[0].url} alt='Img' />
      </header>
      <article>
        <h3 className='cart__card-title'>{product.product.title}</h3>
        <div className='productInfo__quantity'>
              <button 
                className='productInfo__btn' 
                onClick={() => {restQuantity(product); setDisabled(true)}}
                disabled={disabled} 
              >
                -
              </button>
              <div className='productInfo__number'>{product.quantity}</div>
              <button 
                className={'productInfo__btn productInfo__plus'}  
                onClick={() => {addQuantity(product); setDisabled(true)}}
                disabled={disabled}
              >
                +
              </button>
        </div>
        <div className='divider'>
          <div>
            <p className='cart__card-quantity'>Unit Price: $ {addComa(product.product.price)} </p>
            <p className='cart__card-quantity'>Subtotal: $ {addComa((product.product.price * product.quantity).toFixed(2))}</p>
          </div>
          <button className='form__submit trash-submit' onClick={handleDelete}>
            <i className='trash bx bx-trash'></i>
          </button>
        </div>
      </article>
    </section>
  )
}

export default CartProduct