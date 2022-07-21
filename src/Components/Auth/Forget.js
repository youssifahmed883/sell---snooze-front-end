import React from 'react'
import styles from '../../stylesheet/Forget.module.css';

export default function Forget() {
    const ForgetSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <div className='center-5'>
            <form onSubmit={ForgetSubmit} className={styles.form}>
                <h1>Forget Password </h1>
                    <input type="email" className={styles.input} name='email'  placeholder="Email Address" required/>
                    <button type="submit" className={styles.btn} >Submit</button>
            </form>
        </div>
  )
}
