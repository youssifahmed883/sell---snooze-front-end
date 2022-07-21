/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from '../../stylesheet/Profile/Profile.module.css';
import {Link } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage(props) {

    const[dataOfUser,setDataOfUser]=useState([]);
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/getUserInfo/${localStorage.getItem('auth_email')}`).then(res=>{
            setDataOfUser(res.data[0])
        })
    },[]);
    return (
    <>
    <div className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.themeContainerLight:styles.themeContainerDark}>
        <div className={styles.layout}>
            <div className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.profileInfo:styles.profileInfoDark}>
                <div className={styles.cover}>
                    <div className={styles.row}>
                        <div className={styles.col1}>
                            <div className={styles.smallRow}>
                                <div className={styles.image}>
                                    <img src={"http://127.0.0.1:8000/"+localStorage.getItem('auth_photo')} alt='username'/>
                                </div>
                                <div className={styles.profileName}>
                                    <h2 className={styles.profileUserName}>{localStorage.getItem('auth_token') ? localStorage.getItem('auth_name'):'User Name'}</h2>
                                </div>
                            </div>
                            <div className={styles.col2}>
                            <p>
                                <br/>Phone number : {dataOfUser.phone}
                                <br/>Address : {dataOfUser.Address}
                                <br/>City : {dataOfUser.City}
                                <br/>Email : {localStorage.getItem('auth_email')}
                            </p>
                        </div>
                        <Link  className={styles.btn} to={'/setting/EditProfile'}>Edit Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
)
}
