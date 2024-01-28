import React, { useEffect, useState } from 'react'
import './styles/ProductInfo.css'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCartThunk } from '../../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';

const ProductInfo = ({ product }) => {

  const [ imagenActual, setImagenActual ] = useState(0);
  const [ quantity, setQuantity ] = useState(1);
  const [ active, setActive ] = useState(0);
  const [ prev, setPrev ] = useState(false);
  
  const logged = useSelector(store => store.login);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setImagenActual(0);
    setActive(0);
    setPrev(false);
  }, [product])

  const handleMinus = () => {
    if(quantity > 1){
      setQuantity(quantity - 1)
    }
  }

  const handlePlus = () => {
    setQuantity(quantity + 1);
  }

  const cantidad = product?.images.length;

  const handleAddToCart = () => {
    if(logged === true){
      dispatch(addProductToCartThunk(product.id, quantity));
    }
    else{
      navigate('/login')
    }
  }

  const nextImage = () => {
    setPrev(false);
    setImagenActual(
      (imagenActual === (cantidad -1))
      ? 0
      : (imagenActual + 1) 
      )
     setActive(
      (active === (cantidad -1))
      ? 0
      : (active + 1)         
      ); 
      
  }

  const prevImage = () => {
    setPrev(true);  
    setImagenActual(
      (imagenActual === 0)
      ? (cantidad - 1)
      : (imagenActual - 1) 
      )
      setActive(
        (active === 0)
        ? (cantidad - 1)
        : (active - 1) 
        ) 
  }

  const handleMini = (index) => {
    setImagenActual(index);
    setActive(index);
  }

  return (
    <>
      <article className='productInfo'>
        <div className='producntInfo-container'>
          <button 
            className='btnGallery btnAnt' 
            onClick={prevImage}
            
          > 
            <i className='sliderBtn bx bxs-left-arrow' ></i> 
          </button>
          {
            product?.images.map((imagen,index) => (
              <div> 
                {imagenActual === index &&
                  <img 
                  key={index} 
                  className='productInfo__img' 
                  src={imagen.url} alt='Img Prod' 
                  style={prev ? {animation: 'slide 0.4s linear'} : {animation: 'slideNext 0.4s linear'}}
                  />
                }
              </div>
            ))
          }
          <button 
            className='btnGallery btnNext' 
            onClick={nextImage}
          > 
          <i className='sliderBtn bx bxs-right-arrow'></i> </button>
        </div>
        <div>
          <h3 className='productInfo__brand'>{product?.brand}</h3>
          <h2 className='productInfo__title'>{product?.title}</h2>
          <p className='productInfo__desc'>{product?.description}</p> 
          <footer className='productInfo__footer'>
            <div>
              <span className='productInfo__priceTit'>Price</span>
              <span className='productInfo__price'>$ {product?.price}</span>
            </div>
            <div className='productInfo__quantity'>
              <button className='productInfo__btn' onClick={handleMinus}>-</button>
              <div className='productInfo__number'>{quantity}</div>
              <button className='productInfo__btn productInfo__plus' onClick={handlePlus}>+</button>
            </div>
           </footer>
           <button onClick={handleAddToCart} className='form__submit productInfo__submit'> Add to cart </button>     
        </div>
        <div className='smallImgs'>
        {
            product?.images.map((imagen,index) => (
              <div> 
                <img  
                  key={index} 
                  className={(active===index) ? 'smallImg__1 active' : 'smallImg__1'} 
                  src={imagen.url} alt='Img Prod' 
                  onClick={() => handleMini(index)}
                />
              </div>
            ))
          }
        </div>
      </article>
    </>
    
  )
}

export default ProductInfo
