import React, { useEffect, useState } from 'react'
import AboutProduct from './AboutProduct'
import Styles from '../../stylesheet/ProductPage/ProductPage.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function   ProductPage(props) {

    const[CompanyInfo , setCompanyInfo]=useState({});
    const[products , setProducts]=useState({});
    const[orders , setorders]=useState(false);
   
    var id =useParams();
    useEffect(()=>{
            axios.get(`http://localhost:8000/api/productPage/${id.companyId}/${id.Productid}/${localStorage.getItem('auth_email')}`).then(res=>{
                if(res.data.status === 200){
                setCompanyInfo(res.data.CompanyInfo[0])
                setProducts(res.data.Product[0])

                if(res.data.order.length === 0){
                    setorders(false)
                }else{
                    setorders(true)
                }
            }
        }, []);
    },[id.Productid, id.companyId]);
    localStorage.setItem('productQuantity',products.productQuantity)
    console.log(products);

    return (
    <>
    
       
        <AboutProduct CompanyEmail={CompanyInfo.CompanyEmail} phone={CompanyInfo.phone} Website={CompanyInfo.Website} photo={CompanyInfo.photo} productDescription={products.productDescription} companyUserName={CompanyInfo.name} orderd={orders} productModel={products.productModel} id={products.id} productName={products.productName} productImage={products.productImage} productQuantity={products.productQuantity}  productPrice={products.productPrice}  ></AboutProduct>
        
    </>
)
}
