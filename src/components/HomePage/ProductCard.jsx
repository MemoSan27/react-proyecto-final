import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/ProductCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartThunk } from '../../store/slices/cart.slice';

const ProductCard = ({ product }) => {

    const logged = useSelector(store => store.login)

    const [ hover, setHover ] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleNavigate = () => {
        window.scrollTo(0,0);
        navigate(`/product/${product.id}`)
    }

    const handleHover = () => {
      setHover(!hover);
    }

    const handleAddCart = (e) => {
      e.stopPropagation();
      if(logged === true){
        dispatch(addProductToCartThunk(product.id));
      }
      else{
        navigate('/login')
      }
    }

  return (
    <article className='card' onClick={handleNavigate}>
      <header onMouseEnter={handleHover} onMouseLeave={handleHover} className='card__imgcont'>
        <img className={ hover ? 'card__img' : 'card__img over1'}   src={product.images[0].url} alt='Product Img'></img>
        <img className={ hover ? 'card__img img2' : 'card__img img2 over2'} src={product.images[1].url} alt='Product Img'></img>
      </header>
      <section className='card__info'>
        <h4 className='card__info-brand'>{product.brand}</h4>
        <h3 className='card__info-title'>{product.title}</h3>
        <div>
            <span className='card__info-price'>Price</span> <br />
            <span className='card__info-money'>$ {product.price}</span>
        </div>
        <button className='card__btn' onClick={handleAddCart}>
            <i className='bx bx-cart'></i>
        </button>
      </section>
    </article>
  )
}

export default ProductCard
