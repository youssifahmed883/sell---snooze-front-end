/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Style from '../../stylesheet/CompanyPageDashboard/showAddDashboard.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemoveFormat, faTrash } from '@fortawesome/free-solid-svg-icons';


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



export default function ShowAdvertisements(props) {



   
    const[DashBoardPosts,setDashBoardPosts ]=useState([]);
    const[PrevDashBoardPosts,setPrevDashBoardPosts ]=useState(DashBoardPosts);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      axios.get(`http://localhost:8000/api/getpostDashbard/${localStorage.getItem('auth_name')}`).then(res=>{
        setDashBoardPosts(res.data)
        setLoading(false)
      })
    },[]);
    console.log(DashBoardPosts);
    const deletepost = (e) => {
        console.log(e);
      const res =  axios.delete(`http://localhost:8000/api/deleteAddvertisment/${e}`).then(res=>{
      swal("Success Delete",'','success')
      setDashBoardPosts((PrevDashBoardPosts)=>{
        return PrevDashBoardPosts.filter(DashBoardPosts => DashBoardPosts.id !== e)
      })
      });
    }
    const myFunction =(e)=>{
      e.preventDefault()
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput5");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable5");
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

  return (<div className={Style.LargeDiv}>
    <div className={Style.cardslayout}>
      <div className={Style.NumOfOrders}>
        <center><span>Number Of Posts</span></center>

        <p  className={Style.theNumOfOrders}>{DashBoardPosts.length}</p>
        </div>
      <div className={Style.NumOfOrders2}>
        <center><span>Number Of Messages</span></center>

        <p  className={Style.theNumOfOrders2}>{localStorage.getItem("numofmessages")}</p>
        </div>
        </div>
      <div className={localStorage.getItem("dark_mode") == 0 ?Style.div2:Style.div2Dark } >

        <div className={Style.TopLayout}>
             
            <h2 className={Style.AddHeader}>Your Advertisements</h2>
           
            <input type='text' id="myInput5"  className={Style.inputSearch} placeholder='Search Here ' onKeyUp={myFunction} />
            </div>
            
            <table id="myTable5" className={Style.ordersTable}>
                <thead className={Style.tableHead}>
                    <tr className={Style.tableRow}>
                         {/* <th><form><input type='text' onKeyUp={myFunction}  id="myInput3" placeholder='Search here'  className={style.InputSearch}/></form></th> */}
                    </tr>

                </thead>
                <tbody className={Style.tableBody}>
                <div className={Style.tableLayout}>
          <div className={Style.productList}>
            {

            loading? <>
                <Skeleton variant="rectangular" width={210} height={118} sx={{margin : 1}}  />
                <Skeleton variant="rectangular" width={210} height={118} sx={{margin : 1}}  />

            </> : DashBoardPosts.length === 0? <h1>No Addvertisment For Your</h1>:
            DashBoardPosts.map((item,index)=>{
              return(
                <tr className={Style.tableRow}>
                    <td className={Style.hideTableRow}>{item.category}</td>
                    <td className={Style.tableColomn}>
                  <div >
         

                  <div className={localStorage.getItem("dark_mode") == 0 ? <></>:Style.cardTheme} >
                  <Card  sx={{ maxWidth: 300    , backgroundColor : "transparent" , color:"#2196F3"}}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500]  , color:"#2196F3"}} aria-label="recipe">
                             <img src={"http://localhost:8000/"+item.companyPhoto} alt='LogoUser'/>
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                            
                            </IconButton>
                          }
                          title={item.Companyusername}
                          subheader={item.category}
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={"http://localhost:8000/"+item.filepath}
                          alt="Add Image"
                        />
                        <CardContent>
                          <Typography variant="body2" overflow="auto" maxHeight="40px" minHeight="40px" color="#2196F3">
                          {item.description}
                        
                          
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                          <Link  className={Style.styleLink} to={`/EditAddvertisment/${item.id}`}><FontAwesomeIcon  icon={faEdit}/></Link>
                          </IconButton>
                          <IconButton aria-label="share">
                          <button className={Style.styleLink2}  onClick={(e)=>deletepost(item.id)} ><FontAwesomeIcon  icon={faTrash}/></button>
                          </IconButton>
                        
                        </CardActions>
                      
                      </Card>
                      </div>
          </div>
          </td>
                  </tr>
              )
              })
              }
              
              </div>
              </div>
            </tbody>
        </table>
      </div>
      </div>
)
}
