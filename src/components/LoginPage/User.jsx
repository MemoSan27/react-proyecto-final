import React from 'react'
import user from '../../assets/img/user.png'
import './styles/User.css'
import { useNavigate } from 'react-router-dom';
import { setIsLogged } from '../../store/slices/log.slice';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/slices/cart.slice';


const User = () => {

    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const localst = JSON.parse(localStorage.getItem('user'))
    const completeName = `${localst?.name} ${localst?.lastname}`
    
    const logout = () => {
      Swal.fire({
        title: `Are you sure that you want to logout ${completeName} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          dispatch(setIsLogged(false));
          dispatch(setCart([]));
          navigate('/login');
          Swal.fire({
            icon: "success",
            title: `You have logged out success`,
            timer: 1000,
         });
        }
      });
      
    }

  return (
    <div className="layout__reglog">
      <div className="form">
      <p className='page__title'> Welcome {completeName} </p>
      <img className='user-avatar' src={user} alt='User Photo' />
      <button className="form__submit" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default User
