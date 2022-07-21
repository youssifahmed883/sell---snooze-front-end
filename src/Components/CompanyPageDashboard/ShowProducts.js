/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from '../../stylesheet/CompanyPageDashboard/ShowCompanyDashboardProduct.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
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
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from '@mui/material/Skeleton';

export default function ShowProducts(props) {

    const[DashBoardProducts,setDashBoardPeoducts ]=useState([]);
    const[DashBoardProductsSerch,setDashBoardPeoductsSerch ]=useState([]);
    const[PrevDashBoardProducts,setPrevDashBoardPeoducts ]=useState();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setPrevDashBoardPeoducts(DashBoardProducts);
      axios.get(`http://localhost:8000/api/getProducts/${localStorage.getItem('auth_id')}`).then(res=>{
        setDashBoardPeoducts(res.data)
        setLoading(false)
      })
    },[DashBoardProducts]);
    ;
    // console.log(DashBoardProducts);
    const deleteproduct = (e) => {
      const res =  axios.delete(`http://localhost:8000/api/deleteProduct/${e}`).then(res=>{
      swal("Success Delete",'','success')
      setDashBoardPeoducts((PrevDashBoardProducts)=>{
        return PrevDashBoardProducts.filter(DashBoardProducts => DashBoardProducts.id !== e)
      })
      });
    }
    const myFunction =(e)=>{
      e.preventDefault()
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput4");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable4");
      tr = table.getElementsByTagName("tr");

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
  return (
    <div className={styles.LargeDiv}>
    <div className={styles.cardslayout}>
      <div className={styles.NumOfOrders}>
        <center><span>Number Of Products</span></center>

        <p  className={styles.theNumOfOrders}>{DashBoardProducts.length}</p>
        </div>
      <div className={styles.NumOfOrders2}>
        <center><span>Number Of Messages</span></center>

        <p  className={styles.theNumOfOrders2}>{localStorage.getItem("numofmessages")}</p>
        </div>
      <div className={styles.NumOfOrders3}>
        <center><span>Company ID</span></center>

        <p  className={styles.theNumOfOrders3}>{localStorage.getItem("auth_id")}</p>
        </div>
        </div>
          <div className={localStorage.getItem("dark_mode") == 0?  styles.RightDiv:styles.RightDivDark}>
            <div className={styles.TopLayout}>
              <div></div>
            <h2 className={styles.productsHeading}>Your Products</h2>
            <input type='text' id="myInput4"  className={styles.inputSearch} placeholder='Search Here ' onKeyUp={myFunction} />
            </div>
                <div className={parseInt(localStorage.getItem('dark_mode'))=== 0 ?  styles.cardsLight :styles.cardsDark }>
                <table id="myTable4" className={styles.ordersTable}>
                  <thead className={styles.tableHead}>
                    <tr className={styles.tableRow}>
                         {/* <th><form><input type='text' onKeyUp={myFunction}  id="myInput3" placeholder='Search here'  className={style.InputSearch}/></form></th> */}
                    </tr>

                </thead>
                <tbody className={styles.tableBody}>
                <div className={styles.tableLayout}>
                {
                loading? <>
                
                <Skeleton variant="rectangular" width={210} height={118} sx={{margin : 1}} />
                <Skeleton variant="rectangular" width={210} height={118} sx={{margin : 1}}  />
                
                </>
                : DashBoardProducts.length === 0? <h1>No Products For Your</h1>:
                  DashBoardProducts.map((item,index)=>{
                  return (
                    <tr className={styles.tableRow}>
                    <td className={styles.hideTableRow}>{item.productName}</td> 
                    <td className={styles.tableColomn}>
                      
                <div className={localStorage.getItem('dark_mode')==  0 ? <></> :styles.themeCard}>    
                
              <Card  sx={{ maxWidth: 300  ,  backgroundColor : "transparent" , color:"#2196F3" ,

             
            
            }}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500]  , color:"#2196F3"}} aria-label="recipe">
                             <img src={"http://localhost:8000/"+localStorage.getItem("auth_photo")} alt='LogoUser'/>
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                            
                            </IconButton>
                          }
                          title={localStorage.getItem('auth_email')}
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
                          {item.productDescription}
                        
                          
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                          <Link  className={styles.styleLink} to={`/EditProduct/${item.id}`}><FontAwesomeIcon  icon={faEdit}/></Link>
                          </IconButton>
                          <IconButton aria-label="share">
                          <button className={styles.styleLink2}  onClick={(e)=>deleteproduct(item.id) } ><FontAwesomeIcon  icon={faTrash}/></button>
                          </IconButton>
                        
                        </CardActions>
                      
                      </Card>
                      <div className={styles.verticalGap}></div>
                      </div>




                  </td>
                  </tr>
                  )
                  })
                }
                  </div>
                </tbody>
              </table>
            </div>
          </div>
  </div>
)
}
