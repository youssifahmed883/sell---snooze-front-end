/* eslint-disable no-unused-vars */
import React , {useState} from 'react';
import axios from 'axios'
import styles from '../../stylesheet/signup.module.css';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Signup() {
    const navigate =useNavigate();
    const [registerInput, setRegister] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword :'',
        roleAs:'',
        error_list:[],
    });

    const [errorPhone, setErrorPhone]=useState('');
    const [errorEmail, setErrorEmail]=useState('');
    const [errorPasswordLength, setErrorPassword]=useState('');
    const [errorPasswordequal, setErrorPasswordEqual]=useState('');
    const [errorUserName, setErrorUserName]=useState('');

    const handleInput=(e)=>{
        e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value});
    }
    const[toglePassword,setToglePassword]=useState(false)
    const changeTheField =()=>{
        setToglePassword(!toglePassword)
    }
    const[toglePassword2,setToglePassword2]=useState(false)
    const changeTheField2 =()=>{
        setToglePassword2(!toglePassword2)
    }
    const registerSubmit = (e)=>{
        e.preventDefault();
        if(registerInput.password.length <   8 ){
            setErrorPassword("Password Must Be Greater Than 8");
        }else if (registerInput.password !== registerInput.confirmPassword){
            setErrorPasswordEqual('The password is not equal')
        }else{
            const data ={
                name:registerInput.name,
                email:registerInput.email,
                phone:registerInput.phone,
                password:registerInput.password,
                roleAs:registerInput.roleAs
            }
            console.log(data);
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`/api/register`,data).then(res => {
                    console.log(res.data);
                    if(res.data.status === 200) {
                        localStorage.setItem('auth_token',res.data.token)
                        localStorage.setItem('auth_name',res.data.username)
                        localStorage.setItem('auth_email',res.data.userEmail)
                        localStorage.setItem('auth_role_as',res.data.roleAs)
                        localStorage.setItem('auth_id',res.data.id)
                        localStorage.setItem('auth_photo','projectPhotos/MjIPcUiN1rv16RoofpiBOd3cBiRVmwb68uiqMrPf.png')
                        swal('Success',res.data.message,'success')
                        if(localStorage.getItem('auth_role_as') === '1'){
                            localStorage.setItem('completeRigester' , 0);
                            navigate('/completeCompanyInfo')
                        }else{
                            localStorage.setItem('Address',0)
                            localStorage.setItem('City',res.data.City)
                            navigate('/')
                            window.location.reload()
                        }
                    }else if(res.data.status === 501) {
                        // setRegister({...registerInput,error_list:res.data.validation_errors})
                        setErrorEmail("Email is taken")
                        setErrorPhone('')
                        setErrorUserName('');
                    }
                    else if(res.data.status === 502) {
                        // setRegister({...registerInput,error_list:res.data.validation_errors})
                        setErrorPhone(' phone is taken')
                        setErrorEmail('')
                        setErrorUserName('')
                    }
                    else if(res.data.status === 503) {
                        // setRegister({...registerInput,error_list:res.data.validation_errors})
                        setErrorUserName(' User Name is taken')
                        setErrorEmail('')
                        setErrorPhone('')
                    }
                })
            });
        }
    }
    console.log(registerInput.confirmPassword);
    return (
    <div className={styles.layout}>
        <div className={styles.container}>
            <form  onSubmit={registerSubmit} className={styles.form}>
                <h1> Sign Up </h1>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <input type="text" name='name' onChange={handleInput} value={registerInput.name}  className={styles.input} id="User-name" placeholder="User name" required />
                        <label style={{color : 'red'}}>  {errorUserName}</label>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <input type="email" name='email' onChange={handleInput} value={registerInput.email} className={styles.input} id="email" placeholder="name@example.com" required/>
                        <label style={{color : 'red'}}>  {errorEmail}</label>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <input type="number" name='phone' onChange={handleInput} value={registerInput.phone} className={styles.input} id="phone-number" placeholder="Phone number" required/>
                        <label style={{color : 'red'}}>  {errorPhone}</label>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <input type="radio" id="user" name="roleAs" value="0" onChange={handleInput}/>
                        <label for="user"> User</label>
                    </div>
                    <div className={styles.col2}>
                        <input type="radio" id="company" name="roleAs" value="1" onChange={handleInput}/>
                        <label for="company"> Company</label>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <input type={toglePassword? 'text' : 'password'}  name='password' onChange={handleInput} value={registerInput.password} className={styles.input} id="password" placeholder="Password" required/>
                    </div>
                    <div className={styles.col2}>
                        <input type={toglePassword? 'text' : 'password'} name='confirmPassword' onChange={handleInput} value={registerInput.confirmPassword} className={styles.input} id="confirm" placeholder="Confirm" required />
                        <div className={styles.eye}  onClick={changeTheField}>
                        {
                            toglePassword ? <FontAwesomeIcon style={{color : '#4867AA'}} icon={faEyeSlash}/> :<FontAwesomeIcon icon={faEye} /> 
                        }
                    </div>
                    </div>
                </div>
                        <label style={{color : 'red' , margin: 'auto'}} >  {errorPasswordLength}{errorPasswordequal}</label>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <button type="submit" className={styles.btn} >submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}
