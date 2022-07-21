/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import Style from '../../stylesheet/CompanyPageDashboard/addAdvertisment.module.css';
import TextField from '@mui/material/TextField';

export default function AddAdvertisement(props) {
  const navigate =useNavigate();

  const CompanyuserName = localStorage.getItem("auth_name");
  const[category,setPostCategory]=useState("");
  const[description,setPostDescriptin]=useState("");
  const[file,setPostPhoto]=useState("");
  const[username,setPostUser]=useState("");
  const[userphoto,setphotoUser]=useState(localStorage.getItem('auth_photo'));

const data = { username, category , description,file };

const setPosts = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', CompanyuserName);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('file', file);
    formData.append('userPhoto',userphoto)
    axios.post(`http://127.0.0.1:8000/api/addPost`,formData).then(
      swal('Success insertion',"","success"),
      navigate('/ProfilePage/ShowAdvertisements')
    );
    console.log(typeof(file));
}
  return (
    <div className={localStorage.getItem("dark_mode") == 0 ? Style.div1:Style.div1Dark}>
          <h2 className={Style.AddHeader} >Add Advertisement</h2>
        <form  onSubmit={setPosts}>
        
        <TextField id="standard-basic" label="Product Category" 
        sx ={{
          margin: "20px 0",
          input :{
            color: "#2196F3"
          }
          ,
          label :{
            color: "#2196F3"
          }
        }} 
        className={Style.inputField} variant="standard"
      onChange={(e)=>setPostCategory(e.target.value)}
     
      required
       />
                <label>Write the description of post</label>
                <textarea id="disc"  onChange={(e)=>setPostDescriptin(e.target.value)} rows="5" required>
                </textarea>
                <label className={Style.selectImgeLabel} >Select image:</label>
                <input  onChange={(e)=>setPostPhoto(e.target.files[0])} type="file" required />
        <button className={Style.heroBtn}   type="submit">Submit</button>
        <div className={Style.verticalGap}></div>
        </form>
    </div>
  )
}
