import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../stylesheet/error.module.css'

export default function ErrorPage() {
    let navigation =useNavigate()
  return (
    <div className='center-5'>
        <img src='./photo/error/error_404.jpg' alt='Error' />
        <button className={styles.Btn} onClick={()=>{
              navigation('/login')
        }}>Back to site</button>
    </div>
  )
}
