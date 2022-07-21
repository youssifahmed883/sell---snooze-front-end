import React from 'react';
import styles from '../../stylesheet/chats.module.css';

export default function Bran(props) {
    const {src,bran,cate}=props
  return (
        <div className={styles.lastChats}>
            <div className={styles.recordBrandFollow}>
                <div className={styles.brandPhoto}>
                    <img src={src} alt='user name'/>
                </div>
            <div className={styles.recordDiscrition}>
                <p>{bran} <br/>{cate}</p>
            </div>
            </div>
        </div>
  )
}
