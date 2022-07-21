/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Styles from '../../stylesheet/ProductPage/AboutProduct.module.css'
import axios from 'axios'
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faHandHolding, faHandLizard, faHandPaper, faHandPointer, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function AboutProduct(props) {

    const{productDescription,photo,phone
        ,Website,CompanyEmail,productName,productImage,productQuantity,productPrice,id,productModel,orderd,companyUserName}=props;

    const navigate =useNavigate();
    const [CardNumber , setCardNumber] =useState("");
    const [ location, setLocation] =useState("");
    const [PhoneNumber , setPhoneNumber] =useState("");
    const[ProductPhoto,setProductPhoto]=useState("");
  
      
    const SubmitOrder =() =>{
        if(CardNumber.length <8){
            alert("Error Write the complete number")
        }else{
       
            var formdata =new FormData();
            formdata.append('id' ,id);
            formdata.append('quantity' ,productQuantity-1);
            formdata.append('userPhoto' ,localStorage.getItem('auth_photo'));
            formdata.append('username' ,localStorage.getItem('auth_email'));
            formdata.append('productName' ,productName);
            formdata.append('productModel' ,productModel);
            formdata.append('productPhoto' ,productImage);
            formdata.append('productId' ,id);
            formdata.append('companyEmail' ,companyUserName);
            formdata.append('visaCard' ,CardNumber);
            formdata.append('location' ,location);
            formdata.append('PhoneNumber' ,PhoneNumber);
           
            formdata.append('file',ProductPhoto)
            axios.post(`http://127.0.0.1:8000/api/insertTheOrder`,formdata).then(res=>{
                navigate('/OrdersPage')
                swal("Success Order",'','success')
        
            })
        
         
        }
    }

    const CancelOrder =() =>{
        axios.delete(`http://127.0.0.1:8000/api/deleteOrder/${localStorage.getItem('auth_email')}/${id}`).then(res=>{
            navigate('/OrdersPage')
            swal("Success Cancel Order",'','success')
    })
    }
    localStorage.getItem("Address")
    const [showDiv , serShowDiv] = useState(false);

    
    const ShowThePayForm =() =>{
        serShowDiv(true)
    }
    const HideThePayForm =() =>{
        serShowDiv(false)
    }
    return (
        <>
        <div className={ showDiv ? Styles.heddinDivShow :Styles.heddinDiv}>
            <div className={localStorage.getItem('dark_mode')==0? Styles.heddinForm :Styles.heddinFormDark}>
                <div className={Styles.cancelBtn} onClick={HideThePayForm}>
                    X
                </div>
                <form className={Styles.payForm}>

                   <p className={Styles.Logo}> <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon></p>
                   <div className={Styles.ProductPriceInfo}>
                   <h4 > It must pay 20% of product which is <span style={{color: 'red'}} >{productPrice/5} EGP</span>  <br/>
                    And sent it by vodafone cash by photo
                   </h4>
                   </div>
                   <TextField id="standard-basic" sx ={{
              margin: "10px 0",
              width: "80%",
                 input :{
                    color: "#2196F3"
                        }
                       ,
                       label :{
                         color: "#2196F3"
                        }
          }}  type="number" required  label="VisaCard Number"  variant="standard"  onChange={(e)=>setCardNumber(e.target.value)} />
                   <TextField id="standard-basic"   required  sx ={{
              margin: "10px 0",
              width: "80%",
                 input :{
                    color: "#2196F3"
                        }
                       ,
                       label :{
                         color: "#2196F3"
                        }
          }}label="Location" variant="standard"  onChange={(e)=>setLocation(e.target.value)} />
                   <TextField id="standard-basic"  sx ={{
              margin: "10px 0",
              width: "80%",
                 input :{
                    color: "#2196F3"
                        }
                       ,
                       label :{
                         color: "#2196F3"
                        }
          }} type="number" required  label="Phone Number" variant="standard"  onChange={(e)=>setPhoneNumber(e.target.value)} />
                   <> <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>setProductPhoto(e.target.files[0])}
        required
        /></>
                   <Button variant="outlined"  onClick={SubmitOrder} >Submit</Button>
                </form>
            </div>
        </div>
    <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? Styles.productDescription : Styles.productDescriptionDark} >
        <div className={Styles.bigRow}>
            <div className={Styles.col1}>
                <div className={Styles.row1}>
                {productImage == undefined ?   <Skeleton variant="rectangular" width={300} height={208} /> :<img src={"http://localhost:8000/"+productImage} alt='Product Information'/>}
               
                </div>
            </div>
            <div className={Styles.col2}>
                <div className={Styles.companyInfo}>
                    <div className={Styles.companyPhoto}>
                    {productImage == undefined ?   <Skeleton variant="circular" width={100} height={100} /> : <img src={"http://localhost:8000/"+photo}></img>}

                    </div>
                    <div className={Styles.companyInfoName}>

                    {productImage == undefined ? <Box sx={{ width: 300 }}>
                  <Skeleton />
                     <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                     </Box>
                     :
                     <div className={Styles.companyUserName}>{companyUserName}</div>}
                    <div className={Styles.CompanyEmail}>{CompanyEmail}</div>
                    </div>
                    {  localStorage.getItem('auth_role_as')==0 ? <div className={Styles.ContactBtn}><Link style={{textDecoration :'none' , color:'white'}} to={`/chat/${CompanyEmail}`}>Contact Us</Link></div>: <></>}
                </div>
                {productImage == undefined ? 
                <Box sx={{ width: 600 ,margin: 5 }}>
                  <Skeleton />
                     <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                     </Box>
                     :<>
                <div className={Styles.cardDiv}>
                    <p>Phone : {phone} </p>
                    <p>Website : {Website} </p>
                   
                </div>
                <div className={Styles.productDescriptions}>
                    <h2>{productName}</h2>
                    <h2>Model : {productModel}</h2>
                   
                </div>
                
                <div className={Styles.productDescriptions}>
                    <p><FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon> Price {productPrice}</p>
                    <p> <FontAwesomeIcon icon={faHandPointer}></FontAwesomeIcon> Quantity : {productQuantity}</p>
                   
                </div>
                <div className={Styles.productDescriptions}>
                    <h2>Product Description :</h2>
                    <p>{productDescription}</p>
                   
                   
                </div></>
                }

                <div className={Styles.productDescriptionsBtn}>
                {
                parseInt(localStorage.getItem("auth_role_as")) ===1?
                <div></div>
                :  parseInt(localStorage.getItem("Address")) === 0 ? <div style={{marginTop: '2%', color:'red'}}> Please Insert the adderss first to order</div>   :orderd? <button className={Styles.herobtn}  onClick={CancelOrder}>Cancel Order</button>:productQuantity == 0   ? 
                <button className={Styles.herobtn} onClick={SubmitOrder} disabled={true} style={{backgroundColor : 'red' ,color : 'white' , border: '0px'}} > No Ordes</button>
                    : <button className={Styles.herobtn} onClick={ShowThePayForm} >Order Now</button>
                }
            </div>
            </div>
    
    </div>
    </div>
    </>
)
}
