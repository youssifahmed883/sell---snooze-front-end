/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from '../../stylesheet/Companies/listCompanyCategory.module.css'

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


export default function ListCategoryCompany( props) {

    let Industry =useParams();
    const[industryList,setIndustryList]=useState([]);
    const[CompanyName,setCompanyName]=useState('');
    const[loading,setloading]=useState(true);
    const[result,setresult]=useState('');
    const[industry,setIndustry]=useState('');

    useEffect(()=>{
        const fetchData = async () => {
            await  axios.get(`http://localhost:8000/api/getCompanyCategory/${Industry.Industry}`).then(res=>{
                setIndustryList(res.data)
                setloading(false);
            });
          }
          // call the function
          fetchData()
    },[Industry.Industry]);

    const myFunction =(e)=>{
        e.preventDefault()
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput6");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable6");
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
    return(<>
      <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ?  style.themeDivLight : style.themeDivDark }>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ?  style.containerLight : style.containerDark}>
          <div className={localStorage.getItem("dark_mode") == 0 ?  style.header :style.headerDark }>
          <div className={localStorage.getItem("dark_mode") == 0 ?style.TopLayout:style.TopLayoutDark}>
              <div></div>
              <h2>{Industry.Industry}</h2>
            <input type='text' id="myInput6"  className={style.inputSearch} placeholder='Search Here ' onKeyUp={myFunction}/>
            </div>
          </div>
          <table id="myTable6" className={style.ordersTable}>
                <thead className={style.tableHead}>
                    <tr className={style.tableRow}>
                        {/* <th><form><input type='text' onKeyUp={myFunction}  id="myInput3" placeholder='Search here'  className={style.InputSearch}/></form></th> */}
                    </tr>
                </thead>
                <tbody className={style.tableBody}>
                <div className={style.tableLayout}>
          <div className={localStorage.getItem("dark_mode") == 0 ?  style.layout : style.layoutDark}>

        { industryList.length === 0? loading?

        <div className={style.bigLoadig}>
        <h2>Loading..</h2>
        <div className={style.LoadingLayout}>
          <div>
        <Skeleton  variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
        </div>
        <div><Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} /></div>
        <div><Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} /></div>
        </div>
        
        
        </div>
        
        :<h1 style={{color: '#3B5081'}}>No companies work in that category</h1> :
        industryList.map((item) => {
            return (
                <tr className={style.tableRow}>
                <td className={style.hideTableRow}>{item.name}</td>
                <td className={style.tableColomn}>
                <Link className={style.TheLinkToCompany} to={`/campany/${item.CompanyId}`} >
             
                <div className={localStorage.getItem("dark_mode") == 0 ? style.cardThemek:style.cardThemeDark} >

                        <Card  className={style.cardElevation} sx={{ maxWidth: 345   ,backgroundColor:"transparent", 
                        color:"#2196F3" ,
                        borderRadius : "7px"
                        
                        }}>
                        <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: red[500]  , color:"#2196F3"}} aria-label="recipe">
                             <img src={"http://localhost:8000/"+item.photo} alt='LogoUser'/>
                            </Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                            
                            </IconButton>
                          }
                          title={item.name}
                          
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={"http://localhost:8000/"+item.photo}
                          alt="Add Image"
                        />
                        <CardContent>
                          <Typography variant="body2" overflow="auto" maxHeight="40px" minHeight="40px" color="#2196F3">
                          {item.created_at}
                        
                          
                          </Typography>
                        </CardContent>
                        
                      </Card>
                      </div>
                        </Link>
                        </td>
                  </tr>
          );
            })}
              </div>
              </div>
              </tbody>
        </table>
        </div>
      </div>
  </>)
}