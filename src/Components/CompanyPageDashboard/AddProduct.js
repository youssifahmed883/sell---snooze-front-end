/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import swal from "sweetalert";
import styles from "../../stylesheet/CompanyPageDashboard/AddProduct.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddProduct() {
  const navigate =useNavigate();

  const CompanyuserName = localStorage.getItem("auth_email");
  const[ProductName,setProductName]=useState("");
  const[ProductCategory,setProductCategory]=useState("");
  const[ProductModel,setProductModel]=useState("");
  const[ProductQuantity,setProductQuantity]=useState("");
  const[ProductPrice,setProductPrice]=useState("");
  const[ProductDescription,setProductDescription]=useState("");
  const[ProductPhoto,setProductPhoto]=useState("");

  const setProduct = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('productName', ProductName);
    formData.append('productCategory', ProductCategory);
    formData.append('productModel', ProductModel);
    formData.append('productQuantity', ProductQuantity);
    formData.append('productDescription',ProductDescription)
    formData.append('productPrice',ProductPrice)
    formData.append('file',ProductPhoto)
    formData.append('companyId',localStorage.getItem('auth_id'))

    axios.post(`http://localhost:8000/api/addProduct`,formData).then(res=>{
      if(res.data.status === 200){
        swal('Success insertion',"","success")
        navigate("/ProfilePage/ShowProducts")
      }else{
        swal(' something Missing','',"warning")
      }
    }
    );
}

  return (
    <div  className={localStorage.getItem("dark_mode") == 0  ? styles.div1 : styles.div1Dark }>

      <h2 className={styles.h2OfAdding}>Add Product</h2>
      
      <form onSubmit={setProduct} >
       
        <TextField id="standard-basic" label="Product Name" 
          onChange={(e)=>setProductName(e.target.value)}
          required
          className={styles.marginInput}
           variant="standard" 
           sx ={{
            margin: "10px 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} />
          
         <TextField id="standard-basic" label="Product Category" variant="standard" 
          onChange={(e)=>setProductCategory(e.target.value)}
          required
          className={styles.marginInput}
          sx ={{
            margin: "10px 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} 
          />   
         
        
         <TextField id="standard-basic" label="Product Model" variant="standard" 
         onChange={(e)=>setProductModel(e.target.value)}
          required
          className={styles.marginInput}
          sx ={{
            margin: "1% 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} 
          /> 
       
          <TextField id="standard-number"   type="number" label="Product Quantity" variant="standard" 
         onChange={(e)=>setProductQuantity(e.target.value)}
          required
          className={styles.marginInput}
          sx ={{
            margin: "10px 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} 
          /> 
      
          <TextField id="standard-number"   type="number" label="Product Price" variant="standard" 
          onChange={(e)=>setProductPrice(e.target.value)}
          required
          className={styles.marginInput}
          sx ={{
            margin: "10px 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} 
          /> 
       
      
          <TextField id="standard-basic" label="Descrition" variant="standard" 
          onChange={(e)=>setProductDescription(e.target.value)}
          required
          className={styles.marginInput}
          sx ={{
            margin: "10px 0",
            input :{
              color: "#2196F3"
            }
            ,
            label :{
              color: "#2196F3"
            }
          }} 
          /> 
           
        <label for="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*"
        onChange={(e)=>setProductPhoto(e.target.files[0])}
        required
        />
        <input className={styles.heroBtn}
        type="submit">

        </input>
        
      </form>
      <div className={styles.verticalGap}></div>
    </div>
  );
}
