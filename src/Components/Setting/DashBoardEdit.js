/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import Style from '../../stylesheet/setting/settingEditDashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate ,useParams } from 'react-router-dom';

export default function DashBoardEdit() {
    const id =useParams();
    const edit="Edit profile",update="Update"
    var userPhoto=localStorage.getItem('auth_photo');
    const navigate =useNavigate();
    const [photo , setphoto]=useState(userPhoto);
    const [oldphoto , setoldphoto]=useState(userPhoto);
    const [loading , setLoading]=useState(true);

    var email = localStorage.getItem('auth_email');

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

    return (
    <div className={Style.edit}>
        <h1 className={Style.headerHeading}>{edit}</h1>
        <div className={Style.layout}>
            <form>
                <div className={Style.col}>
                    <div className={Style.row}>
                    {loading ?  <img id="profileImg" src={'http://localhost:8000/'+oldphoto} alt='username'/> : <img  id="profileImg" src={'http://localhost:8000/'+photo} alt='username'/>}
                    <input className={Style.updateBtn}  onChange={(e)=>{
                        setphoto(e.target.files[0]);
                        profileImg.src = URL.createObjectURL(e.target.files[0]);
                        console.log("src file ok");
                    }} type="file"  />
                    <input type="button"  onClick={UpdatePhoto} className={Style.btn} value="Save" />
                </div>
                <br />
                      {/*  inputs */}
                </div>
            </form>
        </div>
    </div>
)
}
