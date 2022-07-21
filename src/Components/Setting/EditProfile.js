/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import Style from '../../stylesheet/setting/settingEdit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate , useParams } from 'react-router-dom'

export default function EditProfile() {
    const id =useParams();
    const edit="Edit profile",update="Update"
    var userPhoto=localStorage.getItem('auth_photo');
    const [photo , setphoto]=useState(userPhoto);
    const [oldphoto , setoldphoto]=useState(userPhoto);
    const [address , setaddress]=useState("");
    const [city , setcity]=useState("");
    const [loading , setLoading]=useState(true);

    var email = localStorage.getItem('auth_email');
    const navigate =useNavigate();

    const  UpdatePhoto = useCallback((e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', photo);
        console.log(formData.file);

        const res = axios.post(`http://localhost:8000/api/UpdatePhotoUser/${email}`,formData).then(
            res=>{
                axios.post(`http://localhost:8000/api/UpdateUserPhotoInPosts/${email}`,formData);
                localStorage.setItem('auth_photo',res.data.userPhoto);
                setphoto(res.data.userPhoto);
                swal("success",'','success')
                setLoading(false)
                navigate('/setting/EditProfile')
            }
        )
    });
    const  UpdateBtn = useCallback((e) => {
        e.preventDefault();
        var formData =new FormData();
        formData.append('address',address);
        formData.append('city',city);
        formData.append('email',localStorage.getItem("auth_email"));
        localStorage.setItem('Address' , 1);
        localStorage.setItem('City' , city);

        const res = axios.post(`http://127.0.0.1:8000/api/ChangeLocation`,formData).then(
            res=>{
                swal("Success changing the location",'','success')
                navigate('/')
            }
        )
    });
  return (
    <div className={Style.edit}>
        <h1 className={Style.headerHeading}>{edit}</h1>
        <div className={Style.layout}>
            <form>
            <div className={Style.col}>
                    <div className={Style.row}>
                    {loading ?  <img id="profileImg9" src={'http://localhost:8000/'+oldphoto} alt='username'/> : <img  id="profileImg" src={'http://localhost:8000/'+photo} alt='username'/>}
                        <input className={Style.updateBtn}  onChange={(e)=>{
                            setphoto(e.target.files[0]);
                            profileImg9.src = URL.createObjectURL(e.target.files[0]);
                            console.log("src file ok");
                        }} type="file"  />
                        <input type="button"  onClick={UpdatePhoto} className={Style.btn} value="Save" />
                    </div>
                    <br />
                        {/*  inputs */}
                    <div className={Style.inputLayout}>
                    <div className={Style.row}>
                        <input type="text" className={Style.large} id="address" onChange={e=>setaddress(e.target.value)} placeholder="Address " />
                    </div>
                    <div className={Style.row}>
                            <br/>
                            <input type="text" className={Style.large}  onChange={e=>setcity(e.target.value)}id="city" placeholder="City" />
                        </div>
                        <div className={Style.row}>
                            <br />
                            <input type="submit" onClick={UpdateBtn} className={Style.btn} />
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}
