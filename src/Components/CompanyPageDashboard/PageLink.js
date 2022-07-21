import React from 'react'
import Style from '../../stylesheet/CompanyPageDashboard/PageLink.module.css'
import {Link , Outlet, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust, faCog, faEdit, faEye, faKey, faPhotoVideo, faPlus, faShoppingCart, faShower, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Skeleton from '@mui/material/Skeleton';

export default function PageLink(props) {
  const {Headquarters,Industry,Phone,numOfWorkers,Website}=props;
  
  const [value, setValue] = React.useState(0);
  const navigate =useNavigate();

  
  
  return (
    <div className={Style.container}>
      
      <div className={parseInt(localStorage.getItem('dark_mode')) === 0? Style.leftLight : Style.leftDark}>
      <div className={Style.companyInfo}>
        <div className={Style.companyInfoLeft}>
        <img className={Style.companyImg} src={"http://localhost:8000/"+localStorage.getItem("auth_photo")}></img>
        </div>
        <div className={Style.companyInfoRight}>
          <p  className={Style.companyInfouserName}>{localStorage.getItem("auth_name")}</p>
          <small className={Style.companyInfoEmail}>{localStorage.getItem("auth_email")}</small>

        </div>
        </div>
    <p className={Style.ControlMenue}><FontAwesomeIcon icon={faTachometerAlt } /> Control Menu</p>
          <div className={Style.option}>
              <Link to={'AddProduct'} className={Style.tabs} > Add Product </Link>
              <Link to={'ShowProducts'} className={Style.tabs} > Show Products </Link>
              <Link to={'AddAdvertisement'} className={Style.tabs} >Add Advertisement </Link>
              <Link to={'ShowAdvertisements'} className={Style.tabs} > Show Advertisements </Link>
              <Link to={'EditInformation'} className={Style.tabs} >Edit Information </Link>
        </div>
        <p className={Style.ControlMenue}><FontAwesomeIcon icon={faCog} />Setting</p>
        <div className={Style.option}>
              <Link to={'/setting/EditProfile'} className={Style.tabs} ><FontAwesomeIcon icon={faEdit} />  Edit Photo </Link>
              <Link to={'/setting/EditPassword'} className={Style.tabs} > <FontAwesomeIcon icon={faKey} />  Edit Password </Link>
              <Link to={'/setting/Theme'} className={Style.tabs} ><FontAwesomeIcon icon={faAdjust} />  Change Theme </Link>
              <Link to={'/DashboardOrders'} className={Style.tabs} ><FontAwesomeIcon icon={faShoppingCart} />  Orders </Link>
             
        </div>
      </div>
      <div className={Style.hideLeftDiv}>
        
      <div className={Style.optionHeddin}>
              <Link to={'AddProduct'} className={Style.tabs} > <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Product</Link>
              <Link to={'ShowProducts'} className={Style.tabs} > <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> Product </Link>
              <Link to={'AddAdvertisement'} className={Style.tabs} ><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Add </Link>
              <Link to={'ShowAdvertisements'} className={Style.tabs} > <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> Addvet</Link>
              <Link to={'EditInformation'} className={Style.tabs} ><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Info </Link>
        </div>
  
       </div>



      <div className={Style.rightDashBoardLayout}>
     
     <div className={localStorage.getItem("dark_mode") == 0 ?Style.completeInfo: Style.completeInfoDark}>
     {
      Headquarters == undefined ? <Skeleton animation="wave" />:<>
          <p className={Style.FontSize}><span className={Style.FontColor}>Headquarters </span>: {Headquarters}</p>
          <p className={Style.FontSize}><span className={Style.FontColor}>Industry</span> : {Industry}</p>
          <p className={Style.FontSize}><span className={Style.FontColor}>Phone </span>: {Phone}</p>
          <p className={Style.FontSize}><span className={Style.FontColor}>Website</span> : {Website}</p>
          <p className={Style.FontSize}><span className={Style.FontColor}>Number Of Workers</span> : {numOfWorkers}</p>
          </>
          
         
      } </div>
        
      <div className={parseInt(localStorage.getItem('dark_mode')) === 0? Style.rightLight : Style.rightDark}>
     
          <Outlet />
          </div>
          </div>
    </div>
  )
}
