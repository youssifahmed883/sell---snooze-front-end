import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import styles from "../../stylesheet/CompanyPageDashboard/EditProduct.module.css";
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';

export default function EditProductInfo() {

  const id =useParams();
  const navigate =useNavigate();
  const[ProductName,setProductName]=useState("");
  const[ProductCategory,setProductCategory]=useState("");
  const[ProductModel,setProductModel]=useState("");
  const[ProductQuantity,setProductQuantity]=useState("");
  const[ProductPrice,setProductPrice]=useState("");
  const[ProductDescription,setProductDescription]=useState("");
  const[ProductPhoto,setProductPhoto]=useState("");
  const[OldProductPhoto,setOldProductPhoto]=useState('');
  const [loading , setLoading]=useState(true);
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/productInformation/${id.Productid}`).then(res=>{
            console.log(res.data.Product[0].ProductName);
        setProductName(res.data.Product[0].productName)
        setProductCategory(res.data.Product[0].productCategory)
        setProductModel(res.data.Product[0].productModel)
        setProductQuantity(res.data.Product[0].productQuantity)
        setProductPrice(res.data.Product[0].productPrice)
        setProductDescription(res.data.Product[0].productDescription)
        setProductPhoto(res.data.Product[0].productImage)
        setLoading(false)
        setOldProductPhoto(res.data.Product[0].productImage);
  })
  },[id.Productid]);
console.log(ProductPhoto);
  const setProduct = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('productName', ProductName);
    formData.append('productCategory', ProductCategory);
    formData.append('productModel', ProductModel);
    formData.append('productQuantity', ProductQuantity);
    formData.append('productDescription',ProductDescription)
    formData.append('productPrice',ProductPrice)
    formData.append('file',OldProductPhoto)
    formData.append('companyId',localStorage.getItem('auth_id'))
    axios.post(`http://localhost:8000/api/UpdateproductInformation/${id.Productid}`,formData).then(res=>{
      navigate('/ProfilePage/ShowProducts')
      swal('Success Update','success')
      }
    );
    // console.log(formData.get('file'));
}

  return (
    // ProductName
    // ProductCategory
    // ProductModel
    // ProductQuantity
    // ProductPrice
    // ProductDescription
    // ProductPhoto
      <div className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.divThemeLight : styles.divThemeDark }>
       
        <div className={localStorage.getItem("dark_mode") == 0 ?styles.div1: styles.div1Dark }>
          <h2  className={styles.AddHeader}>Edit Product</h2>
          <form>
            <div  className={styles.changePhotolayout}>
            { loading? <Skeleton variant="circular" width={90} height={90} />: <img  id="profileImge" className={styles.productPhoto} src={'http://localhost:8000/'+ProductPhoto} alt='username'/>}
            <input className={styles.inputPhoto} type="file"
            onChange={(e)=>{
              profileImge.src = URL.createObjectURL(e.target.files[0]);
                        setOldProductPhoto(e.target.files[0]);
                        console.log(OldProductPhoto);
            }}
            />
            
            </div>
           
             <TextField id="standard-basic" label="Product Name" variant="standard" 
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
              onChange={(e)=>setProductName(e.target.value)}
              value={ProductName}required />
         
             <TextField id="standard-basic" label="Product Category" variant="standard" 
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
              onChange={(e)=>setProductCategory(e.target.value)}
              value={ProductCategory} required/>
           
             <TextField id="standard-basic" label="Product Model" variant="standard" 
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
              onChange={(e)=>setProductModel(e.target.value)}
              value={ProductModel} required/>
          
             <TextField id="standard-basic" label="Product Quantity" variant="standard" 
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
              onChange={(e)=>setProductQuantity(e.target.value)}
              value={ProductQuantity} required />
          
                    <TextField id="standard-basic" label="Product Price" variant="standard" 
                     type="number"
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
              onChange={(e)=>setProductPrice(e.target.value)}
              value={ProductPrice} required />

           

            <TextField id="standard-basic" label="Product description" variant="standard" 
               
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
              onChange={(e)=>setProductDescription(e.target.value)}
              value={ProductDescription} required/>
              

            <input className={styles.heroBtn}
            onClick={setProduct}
            type="submit">
            </input>
            
            
          </form>
        </div>
    </div>

  );
}
