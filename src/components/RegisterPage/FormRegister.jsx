import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import logo from "../../assets/img/onshop.png";
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {

    const { register, handleSubmit, reset } = useForm();
    const { registerUser } = useAuth();

    const navigate = useNavigate();

    const handleNavigateHome = () => {
        window.scrollTo(0,0);
        navigate(`/`)
    }

    const submit = (data) => {
        registerUser(data);
        reset({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
        })
        navigate('/login')
    }

  return (
    <form onSubmit={handleSubmit(submit)} className="form form2">
        <p className='page__title'> Register <i className='bx bxs-message-rounded-add'></i></p>
        <div className="shop shop2" onClick={handleNavigateHome}>
          <img src={logo} alt="Company Logo" />
        </div>
        <label>
            <span className="form__span">First Name:</span>
            <input {...register('firstName')} type='text' className="form__input" required/>
        </label>

        <label>
            <span className="form__span">Last Name:</span>
            <input {...register('lastName')} type='text' className="form__input" required/>
        </label>

        <label>
            <span className="form__span">Email:</span>
            <input {...register('email')} type='email' className="form__input" required/>
        </label>

        <label>
            <span className="form__span">Password:</span>
            <input {...register('password')} type='password' className="form__input" required/>
        </label>

        <label>
            <span className="form__span">Phone:</span>
            <input {...register('phone')} type='text' className="form__input" required/>
        </label>

        <button className="form__submit">Register</button>

    </form>
  )
}

export default FormRegister
