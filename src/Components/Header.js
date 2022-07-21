/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import {Link , useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faDoorClosed, faDoorOpen, faTimes} from '@fortawesome/free-solid-svg-icons'
import styles from '../stylesheet/header.module.css';
import axios from 'axios';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function Header(props) {
    const { headers,chats } = props;
    const navigate =useNavigate();


    const[cars,setValueCars]=useState('cars')
    const[Electronic,setValueElectronic]=useState('Electronic')
    const[Kitchen,setValueKitchen]=useState('kitchen')
    const[Mobiles,setValueMobiles]=useState('mobiles')
    const[Food,setValueFood]=useState('food')
    const[Plants,setValuePlants]=useState('plants')
    const[Books,setValueBooks]=useState('books')
    const[Houses,setValueHouses]=useState('houses')
    const[Clocks,setValueClocks]=useState('clocks')
    const[Bicycles,setValueBicycles]=useState('bicycles')
    const[Clothes,setValueClothes]=useState('clothes')
    const[Accessories,setValueAccessories]=useState('accessories')
    const[Video,setValueVideo]=useState('video games')
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    const [slider, setslider] = useState(parseInt(localStorage.getItem('dark_mode')) === 1 ? styles.linksDark :styles.links);
    const onItemClick = useCallback(() => {
        setslider(parseInt(localStorage.getItem('dark_mode')) === 1 ? styles.linksDark2 :styles.links2)
        console.log("yes");
    }, []);
    const onItemClick2 = useCallback(() => {
        setslider(parseInt(localStorage.getItem('dark_mode')) === 1 ? styles.linksDark :styles.links)
        console.log("yes");
    }, []);
    //function logout
    const logoutSubmit =(e)=>{
        e.preventDefault()
        axios.post('/api/logout').then(res =>{
            if(res.data.status === 200) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('auth_name')
                localStorage.removeItem('auth_email')
                localStorage.removeItem('auth_role_as')
                localStorage.removeItem('company_photo')
                localStorage.removeItem('auth_photo')
                localStorage.removeItem('auth_id')
                localStorage.setItem('dark_mode' , 0)
                localStorage.removeItem('Address')
                localStorage.removeItem('City')
                localStorage.removeItem('completeRigester')
                localStorage.removeItem('productQuantity')
               

                navigate('/')
                window.location.reload()
            }
        })
    }

    const myFunction =(e)=>{
        e.preventDefault()
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        // console.log(tr.length);
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                } else {
                tr[i].style.display = "none";
                }
            }
        }
    }
    const[dropDownStyle,setdropDownStyle]=useState(true);
    const myFunctionForHide =(e)=>{
        setdropDownStyle(!dropDownStyle)
    }
    // login and logout
    var AuthButtons = '';
    if(! localStorage.getItem('auth_token')){
        AuthButtons = (
            <ui>
                <li><Link className={styles.navLinksLightMode} to={'login'}>{headers.Login}</Link></li>
            </ui>
        )
    }else {
        AuthButtons = (
            <div className={styles.SetStyleSetting}>
                <li>
                    {parseInt(localStorage.getItem("completeRigester")) == "0" && parseInt(localStorage.getItem("auth_role_as")) == 1?
                        <p style={{margin :"0 5px" , color : "white"}}> Setting </p>:
                        <Link className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.navLinksLightMode : styles.navLinksDarkMode} to={'setting/EditPassword'}>{headers.Setting}</Link>
                    }
                </li>
                <li><Link onClick={logoutSubmit} className={styles.navLinksLogout} to={''}><FontAwesomeIcon color="#2196F3" icon={faDoorOpen}></FontAwesomeIcon></Link></li>
                </div>
        )
    }
    return (
        <header>
                <nav className={parseInt(localStorage.getItem('dark_mode'))=== 0? styles.navLightMode :styles.navDarkmode} >
                    <div className={styles.navLeft}>
                        <Link to={''}   onClick={() => {
                            navigate('/')
                            }} > <img src={localStorage.getItem('auth_token') ? 'http://localhost:8000/'+localStorage.getItem('auth_photo'):".././photo/logo3.png"}  alt='LogoUser'></img> </Link>
                        <Link className={styles.profile} to={parseInt(localStorage.getItem('auth_role_as')) === 0?'ProfilePage' :'ProfilePage/AddProduct'}>{localStorage.getItem('auth_token') ? localStorage.getItem('auth_name'):'SELL&SNOOZE'}</Link>
                    </div>
                    <div className={styles.navSearch}>
                        {/* second eDit */}
                        {
                        localStorage.getItem('auth_role_as') === 0 ?localStorage.getItem('auth_token') ? <div className={styles.searchLayout}><input className={styles.searchField} id="myInput" onClick={myFunctionForHide}   onKeyUp={myFunction} type="text" placeholder="🔍 Search"/>
                            <div className={ styles.dropDownSearchHide }>
                            <table id="myTable" className={styles.tableSearchStyle}>
                                {
                                    chats.map((item,index)=>{
                                        return <>
                                        <tr key={index}>
                                        <Link className={styles.TheLinkToCompany} to={`/campany/${item.id}`} >
                                            <td><img src={'http://localhost:8000/'+item.photo} alt='imgs'></img></td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                        </Link>
                                        </tr>
                                        </>
                                    })
                                }
                            </table>
                            </div>
                        </div>
                        : <div></div>:<div></div>
                        }
                        {/* <input className={styles.searchButton} type="button" value="Search" /> */}
                </div>
                    <div className={ slider} id="navLinks">
                    <FontAwesomeIcon className={styles.hiddenBar2} onClick={onItemClick2} icon={faTimes} />
                        <ul>
                                <li>
                                    {
                                        parseInt(localStorage.getItem("completeRigester")) == 0  && localStorage.getItem("auth_role_as") == 1?
                                        <p style={{margin :"0 5px" , color : "white"}}>Home</p>
                                            :
                                    <Link className={parseInt(localStorage.getItem('dark_mode'))=== 0? styles.navLinksLightMode : styles.navLinksDarkMode}  onClick={() => {
                            navigate('/')
                            }} to={'/'}>{headers.Home}</Link>}</li>
                                <li>
                                    {   parseInt(localStorage.getItem("completeRigester")) === 0 && parseInt(localStorage.getItem("auth_role_as")) === 1?
                                        <p style={{margin :"0 5px"  , color : "white"}}>About</p>:
                                        <Link className={parseInt(localStorage.getItem('dark_mode'))=== 0? styles.navLinksLightMode : styles.navLinksDarkMode} to={''}>{headers.About}</Link>
                                    }
                                </li>
                                <li>
                                    {   parseInt(localStorage.getItem("completeRigester")) === 0 && parseInt(localStorage.getItem("auth_role_as")) === 1 ?
                                        <p style={{margin :"0 5px"  , color : "white"}}>Contact</p>:
                                        <Link className={parseInt(localStorage.getItem('dark_mode'))=== 0? styles.navLinksLightMode : styles.navLinksDarkMode} to={''}>{headers.Contact}</Link>
                                    }
                                </li>
                                {
                                    parseInt(localStorage.getItem("completeRigester")) === 0 && parseInt(localStorage.getItem("auth_role_as")) === 1?
                                    <p style={{margin :"0 5px"  , color : "white"}}>Orders</p>:
                                localStorage.getItem('auth_token')?
                                parseInt(localStorage.getItem('auth_role_as'))===1?
                                <li><Link className={parseInt(localStorage.getItem('dark_mode'))=== 0? styles.navLinksLightMode : styles.navLinksDarkMode} to={'/DashboardOrders'}>{' Orders'}</Link></li>
                                    :
                                    <li><Link className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.navLinksLightMode : styles.navLinksDarkMode} to={'/OrdersPage'}>{'Orders'}</Link></li>  :
                                    <div></div>
                                }
                                {AuthButtons}
                                <br />
                                <div className={styles.categoryLinks} >
                             
                                <>
                                <ListItemButton onClick={handleClick}>
                                    <ListItemIcon>
                                <InboxIcon />
                                </ListItemIcon >

                                <ListItemText sx={{
                                    color: "white"
                                }} primary="Categories" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${cars}`}> 🚗 Cars</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Electronic}`}> 🔌 Electronic</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Kitchen}`}> 🥛 Kitchen</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Mobiles}`}> 📱 Mobiles</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Food}`}> 🍕 Food</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Plants}`}> 🍀 Plants</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Books}`}> 📚 Books</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Houses}`}> 🏡 Houses</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Clocks}`}> ⌚ Clocks</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Bicycles}`}> 🚲 Bicycles</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Clothes}`}> 👕 Clothes</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Accessories}`}> 💍 Accessories</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                          <Link to={`/Category/${Video}`}> 🎮 Video games</Link>
                                </ListItemIcon>
                                
                              
                            </ListItemButton>
                            </List>
                        </Collapse>

                              
                               
                                
                                
                                
                                
                                
                                
                                
                               
                               
                               
                               
                                </>
                                </div>
                        </ul>
                </div>
              {  localStorage.getItem('auth_token') ? <FontAwesomeIcon className={styles.hiddenBar} icon={faBars} onClick={onItemClick} /> :<></>}
                </nav>
        </header>
    )
}
