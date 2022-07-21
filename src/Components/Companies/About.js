import React from 'react'
import Styles from '../../stylesheet/Companies/companiesAbout.module.css'
export default function About(props) {
  const About="About Us"
  const{Description}=props
  return (
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ?  Styles.responsiveMap : Styles.responsiveMapDark} >
          <div className={Styles.head}>
            <h2>{About}</h2>
          </div>
          <div className={Styles.aboutUs}>
              <p> {Description}.</p>
          </div>
        </div>
)
}
