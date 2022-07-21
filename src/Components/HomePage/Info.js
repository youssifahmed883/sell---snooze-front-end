/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { faComment, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from '../../stylesheet/add.module.css';
import  { useCallback, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Info(props) {
    const {index,userEmail,numOfComment,ShowComment,src,title,category,description,likes,dislikes,filteredArrLikes,filteredArrDislikes,companyPhoto}=props;
    var x=[];
   
    filteredArrLikes.map((item,idx)=>{
    if(item.postid=== index){
            x=index;
        }})
    if(x=== index){
        x=true;
    }else{
        x=false;
    }
    var x2=[];
    filteredArrDislikes.map((item,idx)=>{
    if(item.postid=== index){
            x2=index;
        }})
        if(x2 === index){
            x2=true;
        }else{
            x2=false;
        }
    const [like, actionLike] = useState(x);
    const [comment, actioncomment] = useState(numOfComment);
    const [dislike, actionDisLike] = useState(x2);
    const [numOfLikes,setNumOfLikes]=useState(likes);
    const [numOfDisLikes,setNumOfDisLikes]=useState(dislikes);

    const  likeOnClick = useCallback(() => { 
        let formData = new FormData();    //formdata object
        formData.append('likes', numOfLikes+ 1);
        let formDatadisLike = new FormData();    //formdata object
        formDatadisLike.append('dislikes', numOfDisLikes);
        let saveLikedPosts = new FormData();
        saveLikedPosts.append('useremail' ,userEmail);
        saveLikedPosts.append('postid' ,index);
        console.log(likes);
        if(like === false ){
            actionLike(!like)
            console.log(like)
            setNumOfLikes(numOfLikes+1)
            const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-like/${index}`, formData)
            const res2 = axios.post(`http://127.0.0.1:8000/api/add-likePost`, saveLikedPosts)
            if(dislike === !false){
                setNumOfDisLikes(numOfDisLikes -1)
                actionDisLike(false);
                formDatadisLike.append('dislikes', numOfDisLikes- 1);
                const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-dislike/${index}`, formDatadisLike)
                const res2 = axios.post(`http://127.0.0.1:8000/api/removeDislike/${index}/${userEmail}`, formDatadisLike)
            }
            }else{
                actionLike(!like)
                console.log(like);
                setNumOfLikes(numOfLikes -1)
                formData.append('likes', numOfLikes+ -1);
                const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-like/${index}`, formData)
                const res3 = axios.post(`http://127.0.0.1:8000/api/removeLike/${index}/${userEmail}`);
                }
        console.log(numOfLikes)
        console.log(like)
    } );

    const disLikeOnClick = useCallback(() => { 
        let saveDislikedPosts = new FormData();
        saveDislikedPosts.append('useremail' ,userEmail);
        saveDislikedPosts.append('postid' ,index);
        if(dislike === false ){
            let formData = new FormData();    //formdata object
            formData.append('likes', numOfLikes);
            actionDisLike(!dislike)
            console.log(dislike);
            setNumOfDisLikes(numOfDisLikes+1)
            let formDatadisLike = new FormData();    //formdata object
            formDatadisLike.append('dislikes', numOfDisLikes +1);
            const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-dislike/${index}`, formDatadisLike)
            const res2 = axios.post(`http://127.0.0.1:8000/api/add-dislikePost`, saveDislikedPosts)
            if(like === !false){
                setNumOfLikes(numOfLikes -1)
                actionLike(false);
                formData.append('likes', numOfLikes -1);
                const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-like/${index}`, formData)
                const res3 = axios.post(`http://127.0.0.1:8000/api/removeLike/${index}/${userEmail}`);
            }
        }else{
            actionDisLike(!dislike)
            console.log(dislike)
            setNumOfDisLikes(numOfDisLikes-1)
            let formDatadisLike = new FormData();
            formDatadisLike.append('dislikes', numOfDisLikes -1);
            const res = axios.post(`http://127.0.0.1:8000/api/edit-post-reactions-dislike/${index}`, formDatadisLike)
            const res3 = axios.post(`http://127.0.0.1:8000/api/removeDislike/${index}/${userEmail}`);
            }
        console.log(like)
    } );
   const incrementComment =()=>{
    actioncomment(comment + 1 )
   }
return (
<div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.addLight :styles.addDark}>
    
        <div className={styles.addHeader}>
            <div className={styles.avatardiscription}>
                <div className={styles.avatarInfo}>
                    <div className={styles.avatarPhoto}><img src={'http://localhost:8000/'+companyPhoto }alt='LogoUser'/></div>
                    <div className={styles.avatarDisc}>
                    <p style={{fontSize :"0.9em" , color :"#2196F3"}}>{title}</p>
                </div>
            </div>
            </div>
                <div className={styles.addPhotos}>
                    <img src={'http://localhost:8000/'+src}  alt="..."/>
                </div>
                <div className={styles.categoryName}>
                    <p>{category}</p>
                </div>
            <div className={styles.addDiscrition}>
                <p>{description}</p>
            </div>
            <div className={styles.addReact}>
            <button onClick={likeOnClick} style={
                parseInt(localStorage.getItem('dark_mode')) === 0?
                index===x ? like ? {backgroundColor: 'white',color:'red'}:{backgroundColor: 'red',color:'white'} : like? {backgroundColor: 'red',color:'white'}:{backgroundColor: 'white',color:'red'} 
                :
                index===x ? like ? {backgroundColor: '#181A1B',color:'red'}:{backgroundColor: 'red',color:'white'} : like? {backgroundColor: 'red',color:'white'}:{backgroundColor: '#181A1B',color:'red'} 
                }  className={ styles.reactIconslike}><FontAwesomeIcon  icon={faHeart}/>  {numOfLikes}</button>




                <button  style={{backgroundColor : 'transparent' ,border : "1px solid green" , color :'green' , }}  onClick={(e)=>ShowComment(index)} ><FontAwesomeIcon icon ={faComment}></FontAwesomeIcon>{comment}</button>







                <button onClick={disLikeOnClick}  style={
                            parseInt(localStorage.getItem('dark_mode')) === 0?
                    index===x2 ? dislike ? {backgroundColor: 'white',color:'lightblue'}:{backgroundColor: 'lightblue',color:'white'} : dislike? {backgroundColor: 'lightblue',color:'white'}:{backgroundColor: 'white',color:'lightblue'}
                    :index===x2 ? dislike ? {backgroundColor: '#181A1B',color:'lightblue'}:{backgroundColor: 'lightblue',color:'white'} : dislike? {backgroundColor: 'lightblue',color:'white'}:{backgroundColor: '#181A1B',color:'lightblue'}
                    } className={styles.reactIconsDislike} ><FontAwesomeIcon  icon={faHeartBroken}/> {numOfDisLikes}</button>
            </div>
            </div>
        </div>
        )
}
