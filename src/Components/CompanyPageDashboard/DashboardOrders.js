/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import swal from 'sweetalert';
import style from '../../stylesheet/tableDashBoard.module.css'


export default function DashboardOrders(props) {
    const[dataOrders,setDataOrders]=useState([]);
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/getDashBoardOrders/${localStorage.getItem('auth_name')}`).then(res=>{
            if(res.data.status === 200){
                setDataOrders(res.data.order)
                setloading(false)
            }
        })
    },[]);
    
    const[loading ,setloading]=useState(true)
    const[ShowPhotovalue ,setShowPhoto]=useState("");
    const[ShowTheDiv ,setShowTheDiv]=useState(true);

    const SubmitDesision = (e,id)=>{
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("id", id)
        formdata.append("status", e.target.value)

        axios.post('http://127.0.0.1:8000/api/UpdateStatus',formdata).then(res=>{
            if(res.data.status===200){
                swal('Sucsess Transform','','success')
            }
        })
    }

    const deleteTheOrder=(e,id)=>{
        e.preventDefault();
        const thirdClickedfuda = e.currentTarget;
        thirdClickedfuda.innerText = "Deleting";
        axios.delete(`http://127.0.0.1:8000/api/deleteOrderInTable/${id}`).then(res=>{
            swal('sucsess delete','','success');
            thirdClickedfuda.closest('tr').remove() ;
    }
    )}
    const myFunction =(e)=>{
        e.preventDefault()
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput4");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable4");
        tr = table.getElementsByTagName("tr");
        console.log(tr.length);
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
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
    const ShowPhoto =(e) =>{
        setShowPhoto(e);
        setShowTheDiv(false);
    }
    const hideDiv =(e) =>{
        setShowPhoto("");
        setShowTheDiv(true);

    }
    return (
        <>
        <div className={ ShowTheDiv?  style.hiddenDiv : style.hiddenDivhide}>
        <div className={style.hiddenDivLayout}>
       <div> <button className={style.hiddenDivLayoutBTN} onClick={hideDiv}>Cancel</button></div>
        <div><img className={style.hiddenImgLayout} src={ShowPhotovalue} ></img></div>
        </div>
            

        </div>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? style.themeDivLight : style.themeDivDark }>
            <div className={style.container}  >
            <table id="myTable4"  className={localStorage.getItem('dark_mode') == 0 ? style.ordersTableDark : style.ordersTableDark}>
                                        <thead className={localStorage.getItem('dark_mode') == 0 ? <></> : style.headDark}>
                                            <tr>
                                                <th>User</th>
                                                <th>User Name</th>
                                                <th>Product Name</th>
                                                <th>Product Model</th>
                                                <th>productPhoto</th>
                                                <th>Location</th>
                                                <th>Number</th>
                                                <th>Payment Photo</th>
                                                <th>Confirmation</th>
                                                <th>Shipping</th>
                                                <th>Shipped</th>
                                                <th>Remove</th>
                                                <th><form><input type='text' onKeyUp={myFunction}  id="myInput4" placeholder='Search here'  className={style.InputSearch}/></form></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                        dataOrders.length === 0? loading?<h1>loading ... </h1> :<h1>No Orders </h1>:
                                        dataOrders.map((item,index)=>{
                                            return <>
                                            <tr>
                                                <td > { <img className={style.tablePhoto} src={'http://localhost:8000/'+item.userPhoto} alt=""/>}</td>
                                                <td > { item.username}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.productModel}</td>
                                                <td><img className={style.tablePhoto} src={'http://localhost:8000/'+item.productPhoto} alt=""/></td>
                                                <td>{item.location}</td>
                                                <td>{item.PhoneNumber}</td>
                                                <td>{<img className={style.tablePhoto} src={'http://localhost:8000/'+item.PaymentPhoto} alt="" onClick={(e)=>ShowPhoto(e.target.src)}/>}</td>

                                               
                                                
                                                <td><button className={style.tableButton } value='confirm' onClick={(e)=>SubmitDesision(e,item.id)} >Confirmation</button></td>
                                                <td><button className={style.tableButton} value='shipping' onClick={(e)=>SubmitDesision(e,item.id)}>Shipping</button></td>
                                                <td><button className={style.tableButton} value='shipped' onClick={(e)=>SubmitDesision(e,item.id)} >Shipped</button></td>
                                                <td colspan="2"><button className={style.tableButton} value='remove' onClick={(e)=>deleteTheOrder(e,item.id)} >Remove </button></td>
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