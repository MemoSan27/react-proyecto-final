import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/onshop.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const FormLogin = () => {

  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMesage ] = useState('');
  
  const navigate = useNavigate();

    const handleNavigateHome = () => {
        window.scrollTo(0,0);
        navigate(`/`)
    }

    const handleNavigateReg = () => {
      window.scrollTo(0,0);
      navigate(`/register`)
  }



 const { register, handleSubmit, reset } =  useForm();

  const { loginUser } =  useAuth();

  const localst = JSON.parse(localStorage?.getItem('user'))
  const completeName = `${localst?.name} ${localst?.lastname}`

  const submit = async(data) => {
      const result = await loginUser(data);
      setError(false);
      setErrorMesage('');
      if(result.ok){
          reset({
              email: '',
              password: '',
          })
          navigate('/')
          setError(false);
      }else{
        setError(true);
        setErrorMesage(result.errorMessage.response.data.error);
      }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="form">
        <p className='page__title'> Login <i className='bx bxs-key'></i> </p>
        <div className="shop" onClick={handleNavigateHome}>
          <img src={logo} alt="Company Logo" />
        </div>
        <div className="testing__data">
          <p className="test__title">Test data</p>
          <p className="test__info"> <i class='bx bx-envelope' ></i> john@gmail.com</p>
          <p className="test__info"><i class='bx bx-key' ></i> john1234</p>
        </div>
        { error && (<div className="error__message"> <p>{errorMessage}</p> </div> ) }
        <label>
          <span className="form__span">Email:</span>
          <input {...register('email')} type="email" className="form__input"></input>
        </label>

        <label>
          <span className="form__span">Password:</span>
          <input {...register('password')} type="password" className="form__input"></input>
        </label>

        <button className="form__submit">Login</button>
        <p className="question"> Dont you have an account yet?</p>
        <button className="form__submit registerBtn" onClick={handleNavigateReg}>Register</button>
        
    </form>
    
  )
}

export default FormLogin
