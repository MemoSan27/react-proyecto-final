import axios from "axios"
import { setIsLogged } from "../store/slices/log.slice";
import { useDispatch } from "react-redux";

const useAuth = () => {

    const dispatch = useDispatch();
  
    const registerUser = (user) => {
        const url = 'https://express-final-project.onrender.com/users';
        axios.post(url, user)
        .then(res => {
            
            Swal.fire({
                icon: "success",
                title: `User registered success`,
                timer: 1500,
             });
        })
        .catch(err => console.log(err))
    }

    const loginUser = async(credentials) => {
        try{
            const url = 'https://express-final-project.onrender.com/users/login';
            const res = await axios.post(url, credentials);
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify({
                email: res.data.user.email,
                name: res.data.user.firstName,
                lastname: res.data.user.lastName 
            }))
            dispatch(setIsLogged(true));
            const localst = JSON.parse(localStorage?.getItem('user'))
            const completeName = `${localst?.name} ${localst?.lastname}`
            Swal.fire({
                icon: "success",
                title: `Welcome ${completeName}`,
                timer: 1500,
             });
            return {
                res,
                ok: true,
            }
        }catch(error){
            return{
                ok: false,
                errorMessage: error,
            }
        }
        
    }
  
    return { registerUser, loginUser }
}

export default useAuth
