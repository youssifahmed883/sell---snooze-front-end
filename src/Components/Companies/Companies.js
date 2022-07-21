/* eslint-disable no-unused-vars */
import { style } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Styles from '../../stylesheet/Companies/Companies.module.css'
import About from './About'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
export default function Companies( props) {
    const[CompanyInfo , setCompanyInfo]=useState({});
    const[products , setProducts]=useState([]);
    const[loading , setloading]=useState(true);
    var id =useParams();
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getCompanyPage/${id.companyId}`).then(res=>{
            if(res.data.status=== 200){
            setCompanyInfo(res.data.CompanyInfo[0])
            setProducts(res.data.Products)
            setloading(false)
        }
        })
      },[id.companyId]);
      console.log(CompanyInfo);
      const[dropDownStyle,setdropDownStyle]=useState(true);
      const myFunctionForHide =(e)=>{
        setdropDownStyle(!dropDownStyle)
      }
      const myFunction =(e)=>{
        e.preventDefault()
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput7");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable7");
        tr = table.getElementsByTagName("tr");
        console.log(tr.length);
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
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
      // console.log(products);
  return (<>
    <section className={Styles.coverSection}>
    <div className={Styles.liniarDiv}><h1 className={Styles.UserNameHeader}>{CompanyInfo.name}</h1></div>
      <img className={Styles.coverImage} src='.././Photo/81fc6da0-4411-482c-9306-b704a074861b.jpg'></img>

      
      
    </section>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? '' : Styles.themeDivDark}>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Styles.topBarLight : Styles.topBarDark}>
           
            <div className={Styles.ProfilePhoto}>

           { loading? <Skeleton variant="circular" width={200} height={200} /> : <img  className={Styles.companyImg} src={"http://localhost:8000/"+CompanyInfo.photo} alt='username' />}
            </div>
            <div className={Styles.cardsInfo}>
            <div className={Styles.NumOfOrders1}>
        <center><span>Number of workers </span></center>

        <p  className={Styles.theNumOfOrders1}>{CompanyInfo.numOfWorkers}</p>
        </div>
            <div className={Styles.NumOfOrders2}>
        <center><span>Phone </span></center>

        <p  className={Styles.theNumOfOrders2}>{CompanyInfo.phone}</p>
        </div>
            <div className={Styles.NumOfOrders3}>
        <center><span>Industry </span></center>

        <p  className={Styles.theNumOfOrders3}>{CompanyInfo.Industry}</p>
        </div>
            <div className={Styles.NumOfOrders4}>
        <center><span>Website</span></center>

        <p  className={Styles.theNumOfOrders4}>{CompanyInfo.Website}</p>
        </div>
            </div>
          </div>
          <div className={Styles.bodyLayout}>
              <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Styles.ProductsOfCompanyLight : Styles.ProductsOfCompanyDark}  >
              <div className={Styles.head}> 
                    <div>{ localStorage.getItem("auth_role_as") == 0? <Link style={{textDecoration :'none' }} to={`/chat/${CompanyInfo.CompanyEmail}`}>   <h2 style={{textDecoration :'none' , color: "darkMagenta" }}><FontAwesomeIcon icon={faFacebookMessenger}></FontAwesomeIcon> Contact Us </h2></Link>: <></>  }</div>
                    <div> <h2>Products</h2></div>
                    <div className={Styles.searchInputDiv}> <form><input type='text' id="myInput7" placeholder='Search here' onKeyUp={myFunction}   className={Styles.searchInput}/></form>
                    </div>
                    </div>
              <table id="myTable7" className={Styles.ordersTable}>
                        <thead className={Styles.tableHead}>
                        <tr className={Styles.tableRow}>
                         {/* <th><form><input type='text' onKeyUp={myFunction}  id="myInput3" placeholder='Search here'  className={style.InputSearch}/></form></th> */}
                        </tr>
                        </thead>
                        <tbody className={Styles.tableBody}>
                  <div className={Styles.cardLayout}>
                      <div className={Styles.scrollProducts}>
                {
                  products.length=== 0 ?loading? <div className={Styles.loadingLayout}><h1>Loading ..</h1>
                  <div>
                    <Stack spacing={1}>
                     
                       
                       <Skeleton variant="rectangular" width={210} height={118} />
                      
                       
                       </Stack>
                    <Stack spacing={1}>
                    
                       
                       <Skeleton variant="rectangular" width={210} height={118} />
                      
                       </Stack>
                    <Stack spacing={1}>
                     
                       
                       <Skeleton variant="rectangular" width={210} height={118} />
                       
                    
                       </Stack>
                       </div>
                  
                  </div> :<h1>There are No Products</h1>:
                    products.map((item,index)=>{
                            return (
                              <tr className={Styles.tableRow}>
                              <td className={Styles.hideTableRow}>{item.productName}</td>
                            <td className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Styles.tableColomn  : Styles.tableColomnDark }>
                          
                               <Card  sx={{ maxWidth: 365  ,  backgroundColor : "transparent" , color:"#2196F3"}}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500]  , color:"#2196F3"}} aria-label="recipe">
                             <img src={"http://localhost:8000/"+CompanyInfo.photo} alt='LogoUser'/>
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                            
                            </IconButton>
                          }
                          title={CompanyInfo.name}
                          subheader={item.productName}
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={"http://localhost:8000/"+item.productImage}
                          alt="Add Image"
                        />
                        <CardContent>
                          <Typography variant="body2" overflow="auto" maxHeight="40px" minHeight="40px" color="#2196F3">
                          {item.productCategory}
                        
                          
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                          <Link to={`/productPage/${item.companyId}/${item.id}`} className={Styles.btn}>View Product</Link>
                          </IconButton>
                          <IconButton aria-label="share">
                          
                          </IconButton>
                        
                        </CardActions>
                      
                      </Card>
                              </td>
                      </tr>
                              ) })
                          }
                      </div>
                  </div>
                </tbody>
              </table>
              </div>
              
          </div>
          <div className={Styles.LocateAbout}>
                  <About Description={CompanyInfo.Description}/>
              </div>
    </div>
    </>

)
}
