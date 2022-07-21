/* eslint-disable no-unused-vars */

import React from 'react';
import styles from '../../stylesheet/chats.module.css';

export default function Chat(props) {
    const {photo,messageContent,messageFrom,CompanyEmail,phone,IsRead}=props
 
  return (
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.lastChatsLight :styles.lastChatsDark}>
            <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.recordBrandFollowLight : styles.recordBrandFollowDark}>
                <div className={ styles.brandPhoto}>
                            <img src={'http://localhost:8000/'+photo} alt='user name'/>
                        </div>
                <div className={styles.recordDiscrition}>
                            <p>{parseInt(localStorage.getItem('auth_role_as')) ===0 ?CompanyEmail:messageFrom} <br/>
                            <h5>
                            {parseInt(localStorage.getItem('auth_role_as')) ===0?messageContent:messageContent}
                            </h5>
                            </p>
                        </div>
                    {
                    parseInt(localStorage.getItem('auth_role_as')) === 0 ?
                    messageFrom === localStorage.getItem('auth_email') ? <div></div> :IsRead === 0 ?   <div className={styles.readOrNotMessage}></div>  :      <div></div>
                    : CompanyEmail === localStorage.getItem('auth_email') ? <div></div> :IsRead === 0 ?   <div className={styles.readOrNotMessage}></div>  :      <div></div>
                }
            </div>
        </div>
  )
}
