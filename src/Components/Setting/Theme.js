import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../stylesheet/setting/changeTheme.module.css'
export default function Theme() {
    const theme="change theme" , mode="You can change  between dark mode and light mode"
    const[checked , setChecked]=useState(parseInt(localStorage.getItem('dark_mode')) === 1 ? localStorage.getItem('dark_mode') : false );
    const navigate =useNavigate();
    const ChangeTheme =(e)=>{
        setChecked(!checked);
        !checked === true?
        localStorage.setItem('dark_mode',1):
        localStorage.setItem('dark_mode',0);

        var formData =new FormData();
        formData.append('dark_mode' ,localStorage.getItem('dark_mode') )
            axios.post(`http://127.0.0.1:8000/api/UpdateTheme/${localStorage.getItem('auth_id')}`, formData).then(res=>{
                navigate('/')
            })
    }
  return (
    <div className={styles.changetheme}>
            <h1 className={styles.headheading}>{theme}</h1>
        <form>
                <div className={styles.theme}>
                <div className={styles.instructions}>
                    <p>{mode}</p>
                </div>
                <div className={styles.option}>
                <label className={styles.switch}>
                    <input type="checkbox" checked={checked} onChange={e => ChangeTheme(e.target.checked)}/>
                    <span className={styles.slider}></span>
                </label>
            </div>
            </div>
        </form>
    </div>
  )
}
