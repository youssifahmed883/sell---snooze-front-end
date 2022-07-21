import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import styles from "../../stylesheet/CompanyPageDashboard/EditProduct.module.css";
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
export default function EditAddvertInfo() {

  const id =useParams();
  const navigate =useNavigate();
  const[ProductCategory,setProductCategory]=useState("");
  const[ProductDescription,setProductDescription]=useState("");
  const[ProductPhoto,setProductPhoto]=useState("");
  const[OldProductPhoto,setOldProductPhoto]=useState('');
  const [loading , setLoading]=useState(true);
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/getPostForUpdate/${id.addId}`).then(res=>{
        console.log(res.data);
        setProductCategory(res.data[0].category)
        setProductDescription(res.data[0].description)
        setProductPhoto(res.data[0].filepath)
        setLoading(false)
        setOldProductPhoto(res.data[0].filepath)
  })
  },[id.addId]);
  const setProduct = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('category', ProductCategory);
    formData.append('description',ProductDescription)
    formData.append('file',OldProductPhoto)
    axios.post(`http://localhost:8000/api/UpdateAddvertismentInformation/${id.addId}`,formData).then(
      swal('Success Update','','success'),
      navigate('/ProfilePage/ShowAdvertisements')
    );
}
  return (
    <div className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.divThemeLight : styles.divThemeDark }>
 
 <div className={localStorage.getItem("dark_mode") == 0 ?styles.div1: styles.div1Dark }>
      <h2 className={styles.AddHeader}>Edit Advertisement</h2>
      <form>
      <div  className={styles.changePhotolayout}>
        {loading ?   <Skeleton variant="circular" width={100} height={100} />: <img  id="profileImge3" className={styles.productPhoto} src={'http://localhost:8000/'+ProductPhoto} alt='username'/>}
        <input className={styles.inputPhoto} type="file"
        onChange={(e)=>{
          profileImge3.src = URL.createObjectURL(e.target.files[0]);
                    setOldProductPhoto(e.target.files[0]);
        }}
        />
        </div>
      
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
        <br />
      
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
