import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import Style from '../../stylesheet/setting/settingEditPassword.module.css'

export default function EditPassword() {
    const Change="Change password";
    const navigate =useNavigate();

    const[toglePassword,setToglePassword]=useState(false)
    const changeTheField =()=>{
        setToglePassword(!toglePassword)
    }
    const[toglePassword2,setToglePassword2]=useState(false)
    const changeTheField2 =()=>{
        setToglePassword2(!toglePassword2)
    }
    const[toglePassword3,setToglePassword3]=useState(false)
    const changeTheField3 =()=>{
        setToglePassword3(!toglePassword3)
    }
    const[password, setPassword]=useState('')
    const[ConfirmPassword, setConfirmPassword]=useState('')
    const[oldPassword, setoldPassword]=useState('')

    const SubmitPassword =(e) =>{
        e.preventDefault();
        if(ConfirmPassword === password){
            if(password.length < 8){
                swal('Invalid password lentgh must be greater than 8 ' ,'' ,'warning')
            }else{
            var formData=new FormData();
            formData.append('email',localStorage.getItem("auth_email"))
                formData.append('password',oldPassword)
                formData.append('NewPassword',ConfirmPassword)
                axios.post('http://127.0.0.1:8000/api/ChangePassword',formData).then(res=>{
                    if(res.data.status === 200){
                        swal('Success Change Password','','success')
                        navigate('/')
                    }else(
                        swal('Wrong Password' ,'','warning')
                    )
    })}
    }else{
        swal("Error Password Mismatch",'','warning')
    }
    }

  return (
    <div className={Style.password}>
                    <h1 className={Style.headerHeading}>{Change}</h1>
                    <form onSubmit={SubmitPassword}>
                    <div className={Style.container} >
                    <div className={Style.info}>
                        <div className={Style.row}>
                            <input type={toglePassword? 'text' : 'password'} className={Style.large} onChange={(e)=>setoldPassword(e.target.value)} placeholder="Write your current password"  
                            required
                            />
                            <div className={Style.eye}  onClick={changeTheField}>
                                {
                                    toglePassword ? <FontAwesomeIcon style={{color : '#4867AA'}} icon={faEyeSlash}/> :<FontAwesomeIcon icon={faEye} /> 
                                }
                            </div>
                        </div>
                        <div className={Style.row}>
                                <input type={toglePassword2? 'text' : 'password'} className={Style.large} onChange={(e)=>setPassword(e.target.value)} placeholder="Write the new password" 
                                required
                                />
                                <div className={Style.eye}  onClick={changeTheField2}>
                                {
                                    toglePassword2 ? <FontAwesomeIcon style={{color : '#4867AA'}} icon={faEyeSlash}/> :<FontAwesomeIcon icon={faEye} /> 
                                }
                            </div>
                                </div>
                            <div className={Style.row}>
                                <input type={toglePassword3? 'text' : 'password'} className={Style.large} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm the password"
                                required />
                                <div className={Style.eye}  onClick={changeTheField3}>
                                {
                                    toglePassword3 ? <FontAwesomeIcon style={{color : '#4867AA'}} icon={faEyeSlash}/> :<FontAwesomeIcon icon={faEye} /> 
                                }
                            </div>
                            </div>
                        <div className={Style.row}>
                            <input type="submit"  className={Style.btn} />
                        </div>
                </div>
            </div>
        </form>
    </div>
)
}
