/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Styles from '../../stylesheet/CompanyPageDashboard/CompanyDashboardPage.module.css'
import PageLink from './PageLink';

export default function CompanyPage(props) {
  const {companyInformations}=props;

  let [companyName, setcompanyName] = useState('');
  var userEmail=localStorage.getItem("auth_email");
  var userName=localStorage.getItem('auth_name');
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/getCompanyInfo/${userEmail}`).then(res=>{
      setcompanyName(res.data[0])
  })
  },[userEmail]);
console.log(companyName);
  return (
    <div className= {parseInt(localStorage.getItem('dark_mode')) === 0? Styles.ThemeDivLight : Styles.ThemeDivDark }>
        
              <PageLink Headquarters={companyName.Headquarters} Industry={companyName.Industry}
              Phone={companyName.Phone} Website={companyName.Website}
              numOfWorkers={companyName.numOfWorkers}
              ></PageLink>
    </div>
  )
}
