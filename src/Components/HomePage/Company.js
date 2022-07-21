/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Info from "./Info";
import Chat from "./Chat";
import styles from "../../stylesheet/company.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function 
Company(props) {

  let [companyInformation, setcompanyInformation] = useState([]);
  let [listCompanyChats, setlistChats] = useState([]);
  const [companyLastMessage,setCompanyLastMessage] = useState({});
  var userEmail=localStorage.getItem('auth_email');

  
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/post/${userEmail}`).then(res=>{
    getLikedposts(res.data.likedPosts)
    getDisikedposts(res.data.DislikedPosts)
    setPosts( res.data.posts);
})

  axios.get(`http://127.0.0.1:8000/api/messagesList2/${userEmail}`).then(res2=>
  {
    setcompanyInformation(res2.data.messages);
  });
  axios.get(`http://127.0.0.1:8000/api/messagesList/${userEmail}`).then(res3=>
    {
      setlistChats(res3.data.messages);
      setCompanyLastMessage(res3.data.LastMessage);
    });
 },[userEmail]);

const ListOfEmails= [...listCompanyChats].reverse();
const chats= [...companyInformation].reverse();

const filteredArr2 = chats.reduce((acc, current) => {
  const x = acc.find((item) => item.messageTo === current.messageTo);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

const filteredArr3 = filteredArr2.reduce((acc, current) => {
  const x = acc.find((item) => item.messageFrom === current.messageTo);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);
  const [getlikedPosts,getLikedposts]=useState([]);
  const [getDislikedPosts,getDisikedposts]=useState([]);
  var userEmail = localStorage.getItem("auth_email");

  const filteredArrLikes = getlikedPosts.reduce((acc, current) => {
    const x = acc.find((item) => item.postid === current.postid);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const filteredArrDislikes = getDislikedPosts.reduce((acc, current) => {
    const x = acc.find((item) => item.postid === current.postid);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const filteredArr = ListOfEmails.reduce((acc, current) => {
    const x = acc.find((item) => item.messageFrom === current.messageFrom);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
 

  const [cars, setValueCars] = useState("cars");

  const [Electronic, setValueElectronic] = useState("Electronic");
  const [Kitchen, setValueKitchen] = useState("kitchen");
  const [Mobiles, setValueMobiles] = useState("mobiles");
  const [Food, setValueFood] = useState("food");
  const [Plants, setValuePlants] = useState("plants");
  const [Books, setValueBooks] = useState("books");
  const [Houses, setValueHouses] = useState("houses");
  const [Clocks, setValueClocks] = useState("clocks");
  const [Bicycles, setValueBicycles] = useState("bicycles");
  const [Clothes, setValueClothes] = useState("clothes");
  const [Accessories, setValueAccessories] = useState("accessories");
  const [Video, setValueVideo] = useState("video games");
  const [LargeCommentDivShow, setLargeCommentDivShow] = useState(false);
  const [ShowCommentDiv, setValueShowComment] = useState(false);
  const [setID, setTheId] = useState("");
  const [CommentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [getCommentContent, getTheCommentContent] = useState([]);

  localStorage.setItem("numofmessages",filteredArr.length);
  let [posts, setPosts] = useState([]);

 const ShowComment = (e) =>{
  setValueShowComment(true);
  setLargeCommentDivShow(true);
  setTheId(e);
  axios.get(`http://127.0.0.1:8000/api/getComments/${e}`).then(
    res=>{
      getTheCommentContent(res.data),
      setLoading(false)
    }
  )
  

 }
console.log(posts);
 const HideComment = (e) =>{
  setValueShowComment(false);
  setLargeCommentDivShow(false);
  getTheCommentContent([]);
  setLoading(true);  

 }
 const sendComment = (e) =>{
  e.preventDefault();
  let formdata =new FormData();
  formdata.append('postId',setID);
  formdata.append('username',localStorage.getItem('auth_name'));
  formdata.append('userPhoto',localStorage.getItem('auth_photo'));
  formdata.append('commentContent',CommentContent);
  setCommentContent("");

  
  axios.post(`http://127.0.0.1:8000/api/insertComment/${setID}`,formdata).then(
   
    axios.get(`http://127.0.0.1:8000/api/getComments/${setID}`).then(
    res=>{
      getTheCommentContent(res.data)
      console.log( posts);
      
    }
  )
    
  )
 }
 const sendCommentByEmter =(e)=>{
  if(e === "Enter"){
   
  let formdata =new FormData();
  formdata.append('postId',setID);
  formdata.append('username',localStorage.getItem('auth_name'));
  formdata.append('userPhoto',localStorage.getItem('auth_photo'));
  formdata.append('commentContent',CommentContent);
  setCommentContent("");
  
  
  axios.post(`http://127.0.0.1:8000/api/insertComment/${setID}`,formdata).then(
   
    axios.get(`http://127.0.0.1:8000/api/getComments/${setID}`).then(
    res=>{
      getTheCommentContent(res.data)
          
    }
  )
    
  )
 
  }}
  
  console.log(filteredArr[0] == undefined);
  return (
    <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.theHomeColorLight :styles.theHomeColorDark}>
      <div className={styles.verticalGap}></div>
    <div className={LargeCommentDivShow? styles.LargeCommentDivShow:styles.LargeCommentDivHide}>
      <div className={ShowCommentDiv? localStorage.getItem('dark_mode') == 0 ?  styles.commentDivShow : styles.commentDivShowDark:styles.commentDivHide}>
        <div className={styles.CommentTop}>
          <p className={styles.commentTitle}>Comments</p>
          <button onClick={HideComment} className={styles.heroBtn}>X</button>
        </div>
        <div className={styles.middle}>
      {  loading ?<h3>Loading...</h3>: getCommentContent.length == 0?<h3>No Comments Yet</h3>: getCommentContent.map((item, index) => {
              return (
                <>
                
          <div className={styles.commentLayout}>
            <div className={styles.leftCommentDiv}>
              <img className={styles.commenterPhoto} src={"http://localhost:8000/"+item.userPhoto}></img>
            </div>
            <div className={styles.RightCommentDiv}>
              <h4 className={styles.commentUserEmail}>
                {item.username}</h4>
                <p className={styles.commentContent}>
                {item.commentContent}
              </p>
            </div>

          </div></>)})}


        </div>
        <div className={styles.bottom}>
        <TextField id="standard-basic" width="100%" className={styles.commentInput} label="Comment"  sx ={{
              margin: "10px auto",
              input :{
                color: "#2196F3"
              }
              ,
              label :{
                color: "#2196F3"
              }
            }}  onKeyDown={(e)=>sendCommentByEmter(e.key)} onChange={(e)=>setCommentContent(e.target.value)} value={CommentContent} variant="standard" />
        
          
        </div>
      </div>
      </div>
      <div className={styles.homeLayout}>
      
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0 ? styles.leftDivLight :styles.leftDivDark}>
        <center>
              <h2 className={styles.headerLayout}> Messages </h2>
            </center>
          {/* first Edit */}
          {  parseInt(localStorage.getItem("auth_role_as")) === 0 ? (
           
            filteredArr3.map((item, index) => {
              return (
                <>
                {localStorage.getItem('auth_email')=== item.messageTo?
                  <Link to={`chat/${item.messageFrom}`}>
                  {" "}
                  <Chat
                    key={index}
                    photo={item.senderPhoto}
                    CompanyEmail={item.messageFrom}
                    phone={item.phone}
                    messageContent={item.messageContent}
                    IsRead={item.IsRead}
                    messageFrom={item.messageFrom}
                />
              </Link>
              :
                <Link to={`chat/${item.messageTo}`}>
                    {" "}
                    <Chat
                      key={index}
                      photo={item.ReciverPhoto}
                      CompanyEmail={item.messageTo}
                      phone={item.phone}
                      messageContent={item.messageContent}
                      IsRead={item.IsRead}
                      messageFrom={item.messageFrom}
                    />
                  </Link>
                }
                </>
              );
            })
          ) : (
            
            filteredArr.map((item, index) => {
              return (
                <>
                  <Link to={`chat/${item.messageFrom}`}>
                    {" "}
                    <Chat
                      key={index}
                      photo={item.senderPhoto}
                      messageFrom={item.messageFrom}
                      IsRead={item.IsRead}
                      messageContent={companyLastMessage.messageContent}
                    />
                  </Link>
                </>
              );
            })
          )}
        </div>
        <div className={styles.centerDiv}>
          {
            posts[0] == undefined ?
            <>
             <Stack spacing={1} margin={3}>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
          </Stack>
          <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Stack>
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </Stack>
          </>
          : 
        posts
            .map((item, index) => {
              return (
                <Info
                  key={index}
                  companyPhoto={item.companyPhoto}
                  filteredArrLikes={filteredArrLikes}
                  filteredArrDislikes={filteredArrDislikes}
                  index={item.id}
                  src={item.filepath}
                  description={item.description}
                  dislikes={item.dislikes}
                  likes={item.likes}
                  userEmail={userEmail}
                  category={item.category}
                  title={item.Companyusername}
                  ShowComment={ShowComment}
                 
                />
              );
            })
            .reverse()}
        </div>
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0? styles.rightDivLight : styles.rightDivDark}>
          <div className={styles.categoryLinks}>
            <div className={styles.category}>
              <Link to={`/Category/${cars}`}> 🚗 Cars</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Electronic}`}> 🔌 Electronic</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Kitchen}`}> 🥛 Kitchen</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Mobiles}`}> 📱 Mobiles</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Food}`}> 🍕 Food</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Plants}`}> 🍀 Plants</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Books}`}> 📚 Books</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Houses}`}> 🏡 Houses</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Clocks}`}> ⌚ Clocks</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Bicycles}`}> 🚲 Bicycles</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Clothes}`}> 👕 Clothes</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Accessories}`}> 💍 Accessories</Link>
            </div>
            <div className={styles.category}>
              <Link to={`/Category/${Video}`}> 🎮 Video games</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
