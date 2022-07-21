/* eslint-disable no-unused-vars */

import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import swal from 'sweetalert';
import style from '../../stylesheet/tableDashBoard.module.css'

export default function OrdersPage(props) {
    const[dataOrders,setDataOrders]=useState([]);
    const[loading ,setloading]=useState(true)
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/getOrdersForUser/${localStorage.getItem('auth_email')}`).then(res=>{
            if(res.data.status === 200){
                setDataOrders(res.data.order)
                setloading(false)
            }
        })
    },[]);
  console.log(dataOrders);
  const myFunction =(e)=>{
    e.preventDefault()

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput3");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable3");
    tr = table.getElementsByTagName("tr");

    console.log(tr.length);
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
    return (
        <>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? style.themeDivLight : style.themeDivDark }>
          <div className={style.container}  >
                                    <table id="myTable3"  className={localStorage.getItem('dark_mode') === 0 ? style.ordersTable : style.ordersTableDark}>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>User Name</th>
                                                <th>Product Name</th>
                                                <th>Product Model</th>
                                                <th>productPhoto</th>
                                                <th>Status</th>
                                                <th><form><input type='text' onKeyUp={myFunction}  id="myInput3" placeholder='Search here'  className={style.InputSearch}/></form></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {    dataOrders.length === 0? loading?<h1>loading ... </h1> :<h1>No Orders</h1>:
                                        dataOrders.map((item,index)=>{
                                            return <>
                                            <tr className={style.content}>
                                                <td className={style.tablecol}> { <img className={style.tablePhoto} src={'http://localhost:8000/'+item.userPhoto} alt='imgs'/>}</td>
                                                <td className={style.tablecol}> { item.username}</td>
                                                <td className={style.tablecol}>{item.productName}</td>
                                                <td className={style.tablecol}> {item.productModel}</td>
                                                <td className={style.tablecol}><img className={style.tablePhoto} src={'http://localhost:8000/'+item.productPhoto} alt='imgs'/></td>
                                                <td className={style.tablecol} colspan="2">{item.status === null? "Orderd" :item.status }</td>
                                            </tr>
                                            </>
                                        })
                                        }
                                  </tbody>
                              </table>
                        </div>
                  </div>
        </>
    );
}