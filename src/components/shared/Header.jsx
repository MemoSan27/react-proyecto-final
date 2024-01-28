import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Header.css'; 
import logo from "../../assets/img/onshop.png";
import { useSelector } from 'react-redux';

const Header = () => {

    const logged = useSelector(store => store.login)

    const navigate = useNavigate();

    const handleNavigateLogin = () => {
        window.scrollTo(0,0);
        if( logged === false){
          navigate(`/login`)
        }else{
          navigate('/user')
        }
    }

    const handleNavigateHome = () => {
        window.scrollTo(0,0);
        navigate(`/`)
    }

    const handleNavigateCart = () => {
      window.scrollTo(0,0);
      navigate('/cart');
    }

    const handleNavigatePurchases = () => {
      window.scrollTo(0,0);
      navigate('/purchases');
    }

    const localst = JSON.parse(localStorage?.getItem('user'))
    const completeName = `${localst?.name}`

  return (
    <header className='header'>
      <nav className='navbar'>
            <img src={logo} alt='Logo' className='logo' onClick={handleNavigateHome}/>
            <div className='buttons'>
                <button className='navbar__button' onClick={handleNavigateLogin}> <i className='child bx bx-child'></i>{logged ? `${completeName}` : 'Login' } </button>
                <button className='navbar__button' onClick={handleNavigatePurchases}> <i className='child bx bxs-purchase-tag'></i> Purchases </button>
                <button className='navbar__button' onClick={handleNavigateCart}> <i className='child bx bxs-cart-add'></i> Cart </button>
            </div>
        </nav>
    </header>
  )
}

export default Header
