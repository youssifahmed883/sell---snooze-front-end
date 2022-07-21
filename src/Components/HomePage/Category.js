import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../stylesheet/chats.module.css';

export default function Category(props) {
  return (
      <div className={styles.lastChats}>
          <div className={styles.recordBrandFollow}>
              <Link to="#">cars</Link>
            </div>
        </div>
  )
}
