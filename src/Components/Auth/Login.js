import React , {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
import styles from '../../stylesheet/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function Login(props) {
    const navigate =useNavigate();
    const [loginInput, setLogin] = useState({
        email:'',
        password:'',
        error_list:[]
    });

    const[toglePassword,setToglePassword]=useState(false)
    const changeTheField =()=>{
        setToglePassword(!toglePassword)
    }
    const handleInput=(e)=>{
        e.persist();
        setLogin({...loginInput,[e.target.name]:e.target.value});
    }
    const loginSubmit = (e)=>{
        e.preventDefault();
        const data ={
            email:loginInput.email,
            password:loginInput.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`,data).then(res => {
                if( res.data.status === 200) {
                    localStorage.setItem('auth_token',res.data.token)
                    localStorage.setItem('auth_name',res.data.username)
                    localStorage.setItem('auth_email',res.data.userEmail)
                    localStorage.setItem('auth_role_as',res.data.roleAs)
                    localStorage.setItem('auth_photo',res.data.auth_Photo)
                    localStorage.setItem('auth_id',res.data.id)
                    localStorage.setItem('dark_mode',res.data.dark_mode)
                    localStorage.setItem('Address',res.data.Address)
                    localStorage.setItem('City',res.data.City)
                    localStorage.setItem('completeRigester',res.data.completeRigester)

                    if( localStorage.getItem('auth_role_as') == 1 &&  localStorage.getItem('completeRigester')== 0 ){
                    navigate('/completeCompanyInfo')
                    }else{
                        
                        navigate('/') 
                        window.location.reload()
                    }
                }
                else if (res.data.status === 401 || res.data.status === 500 ) {
                    swal('Wrong Credentials',res.data.message,'warning')
                }else {
                    setLogin({...loginInput,error_list:res.data.validation_errors})
                }
            })
        })
    }
    return (
        <div className='center-5'>
            <form onSubmit={loginSubmit} className={styles.form}>
                <h1>Login </h1>
                    <input type="email" className={styles.input} name='email' onChange={handleInput} value={loginInput.email}  placeholder="Email Address" required/>
                    <div className={styles.passwordDiv}><input type={toglePassword? 'text' : 'password'} className={styles.input} name='password'
                    onChange={handleInput} value={loginInput.password}  placeholder="Password" required/>
                    <div onClick={changeTheField}>
                    {
                        toglePassword ? <FontAwesomeIcon className={styles.passwordViewer} style={{color : '#4867AA'}}  icon={faEyeSlash}/> :<FontAwesomeIcon className={styles.passwordViewer} icon={faEye} /> }
                    </div>
                    </div>
                    <Link to={'forget'}>Forget Password ?</Link>
                    <button type="submit" className={styles.btn} >Login</button>
                <span>Don't have an account ?<Link to={'signup'}> Sign up here </Link></span>
            </form>
        </div>
    )
}