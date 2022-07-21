/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import style from "../../stylesheet/CompanyPageDashboard/editDashboardInfo.module.css";
import TextField from '@mui/material/TextField';
import { color } from "@mui/system";


export default function EditInformation() {
  const navigate =useNavigate();
  const CompanyEmail = localStorage.getItem("auth_email");

  const [Headquarters, setHeadquarters] = useState("");
  const [numOfWorkers, setnumOfWorkers] = useState("");
  const [Phone, setPhone] = useState("");
  const [Industry, setIndustry] = useState("");
  const [Website, setWebsite] = useState("");
  const [Description, setDescription] = useState("");

  const saveData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Headquarters", Headquarters);
    formData.append("numOfWorkers", numOfWorkers);
    formData.append("Phone", Phone);
    formData.append("Industry", Industry);
    formData.append("Website", Website);
    formData.append("Description", Description);
    axios
      .post(`http://localhost:8000/api/UpdateCumpanyInfo/${localStorage.getItem('auth_id')}`, formData)
      .then(
      swal("Success insertion",'','success'),
      navigate("/ProfilePage")
      );
  }
  var userEmail=localStorage.getItem("auth_email");
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/getCompanyInfo/${userEmail}`).then(res=>{
      setHeadquarters(res.data[0].Headquarters)
      setnumOfWorkers(res.data[0].numOfWorkers)
      setPhone(res.data[0].Phone)
      setIndustry(res.data[0].Industry)
      setWebsite(res.data[0].Website)
      setDescription(res.data[0].Description)
  })
  },[userEmail]);
  // console.log(Headquarters);

  return (
    <div className={localStorage.getItem("dark_mode") == 0? style.div1 : style.div1Dark}>
      <h2 className={style.AddHeader}>Edit Information</h2>
      <form onSubmit={saveData} className={style.InfoForm}>
       
        <TextField id="standard-basic" label="Headquarters" 
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
      className={style.inputField} variant="standard"
      onChange={(e)=>setHeadquarters(e.target.value)}
      value={Headquarters}
      required
       />


      
        <TextField id="standard-basic" label="Number of Workers" 
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
      className={style.inputField} variant="standard"
      onChange={(e)=>setnumOfWorkers(e.target.value)}
          value={numOfWorkers}
      required
       />

        
          <TextField id="standard-basic" label="Phone" 
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
      className={style.inputField} variant="standard"
      onChange={(e)=>setPhone(e.target.value)}
          value={Phone}
      required
       />
        <select
                className={style.inputField}
                name="Category"
                id="Category"
                onChange={(e)=>{
                    setIndustry(e.target.Industry)
                }}
                value={Industry}
                required
              >
                <option value="">----Select Industry----</option>
                <option value="cars"> 🚗 Cars</option>
                <option value="electronic">🔌 Electronic</option>
                <option value="kitchen"> 🥛 Kitchen</option>
                <option value="mobiles">📱 Mobiles</option>
                <option value="food">🍕 Food</option>
                <option value="plants">🍀 Plants</option>
                <option value="books">📚 Books</option>
                <option value="houses">🏡 Houses</option>
                <option value="clocks">⌚ Clocks</option>
                <option value="bicycles">🚲 Bicycles</option>
                <option value="clothes">👕 Clothes</option>
                <option value="accessories">💍 Accessories</option>
                <option value="videogames">🎮 Video games</option>
              </select>
      
        <TextField id="standard-basic" label="Website" 
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
      className={style.inputField} variant="standard"
      onChange={(e)=>setWebsite(e.target.value)}
      value={Website}
      required
       />
    
         <TextField id="standard-basic" label="Description" 
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
      className={style.inputField} variant="standard"
      onChange={(e)=>setDescription(e.target.value)}
          value={Description}
      required
       />
       
       
        {/* <label for="img">Select image:</label> */}
        {/* <input type="file" id="img" name="img" accept="image/*"/> */}
        <input className={style.heroBtn}  type="submit" />
       
      </form>
      <div className={style.verticalGap}></div>
    </div>
  );
}
