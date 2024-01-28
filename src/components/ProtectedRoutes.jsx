import React from 'react'
import { useSelector } from 'react-redux'
import LoginPage from '../pages/LoginPage';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const logged = useSelector(store => store.login);

    if(logged === false){
        return <Navigate to={'/login'} />
    } else{
        return <Outlet />
    }
  
}

export default ProtectedRoutes
