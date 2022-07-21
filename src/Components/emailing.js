/* eslint-disable no-unused-vars */
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faAddressCard, faAngleRight, faMailBulk, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from '../stylesheet/emailing.module.css'
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';





import InputAdornment from '@mui/material/InputAdornment';


import AccountCircle from '@mui/icons-material/AccountCircle';
export default function Emailing(props) {

    let [messages, setmessages] = useState([]);
    let [LastMessages, setLastMessages] = useState({});
    const[sendMessage,setsendMessage]=useState("");
    const[reciverPhoto,setreciverPhoto]=useState("");
    const[senderPhoto,setsenderPhoto]=useState(localStorage.getItem('auth_photo'));
    const [loading1 , setLoading1]= useState(true)
    const [loading2 , setLoading2]= useState(false)
    const [loading3 , setLoading3]= useState(true)
    const [loading4 , setLoading4]= useState(true)

    let { reciverEmail } = useParams();

    var elem = document.getElementById('pointer2');
    useEffect(() => {
        // Update the document title using the browser API
      
            axios.get(`http://127.0.0.1:8000/api/messages/${localStorage.getItem("auth_email")}/${reciverEmail}`).then(res => {
                setmessages(res.data.messages);
                setLastMessages(res.data.LastMessage);
                setLoading4(false);
                res.data.LastMessage  === null?
                <div></div>:
                    res.data.LastMessage.messageFrom === localStorage.getItem('auth_email')?
                    console.log("yes it is the same") :
                    axios.get(`http://127.0.0.1:8000/api/IsReadMessage/${localStorage.getItem("auth_email")}/${reciverEmail}`) ;
                setLoading1(false);
      
        }, );
        axios.get(`http://localhost:8000/api/getUserPhoto/${reciverEmail}`).then(res => {
            setreciverPhoto(res.data[0].photo);
            setLoading3(false);
        })
      
    },[reciverEmail]);

    if (loading1 === loading2 ){
        elem.scrollTop = elem.scrollHeight
        setLoading2(true)
    }
    const emails=messages;
    const sendEmail =(e)=>{
        e.preventDefault();
        console.log(e);
    let formData = new FormData();
    formData.append('messageFrom', localStorage.getItem('auth_email'));
    formData.append('messageTo', reciverEmail);
    formData.append('messageContent', sendMessage);
    formData.append('senderPhoto', senderPhoto);
    formData.append('ReciverPhoto', reciverPhoto);
    setsendMessage("")
    axios.post(`http://127.0.0.1:8000/api/sendMessage`,formData).then(
        setsendMessage(''),
        elem.scrollTop = elem.scrollHeight   ,
        document.querySelector('input').defaultValue = '',
    );
    }
    const sendEmailByEmter =(e)=>{
        if(e === "Enter"){
            let formData = new FormData();
    formData.append('messageFrom', localStorage.getItem('auth_email'));
    formData.append('messageTo', reciverEmail);
    formData.append('messageContent', sendMessage);
    formData.append('senderPhoto', senderPhoto);
    formData.append('ReciverPhoto', reciverPhoto);
    setsendMessage("")

    document.querySelector('input').defaultValue = '';
    elem.scrollTop = elem.scrollHeight +81*2;
    axios.post(`http://127.0.0.1:8000/api/sendMessage`,formData).then(
        setsendMessage(''),
        axios.get(`http://127.0.0.1:8000/api/messages/${localStorage.getItem("auth_email")}/${reciverEmail}`).then(res => {
            setmessages(res.data.messages);
            setLastMessages(res.data.LastMessage);
            res.data.LastMessage  === null?
            <div></div>:
                res.data.LastMessage.messageFrom === localStorage.getItem('auth_email')?
                console.log("yes it is the same") :
                axios.get(`http://127.0.0.1:8000/api/IsReadMessage/${localStorage.getItem("auth_email")}/${reciverEmail}`) ;
            setLoading1(false);
  
    }, ),
    axios.get(`http://localhost:8000/api/getUserPhoto/${reciverEmail}`).then(res => {
        setreciverPhoto(res.data[0].photo);
    })
    );
        }
    }

    return(
        <div className={parseInt(localStorage.getItem('dark_mode')) === 0  ? style.largeContainerLight : style.largeContainerDark}>
            <div>{reciverEmail}</div>
            <div className={parseInt(localStorage.getItem('dark_mode')) === 0  ? style.containerLight : style.containerDark }>
               
                <div  className={style.right}>
                    <div className={parseInt(localStorage.getItem('dark_mode')) === 0  ? style.topLight : style.topDark}>
                   { loading3 ? <Skeleton variant="circular" width={40} height={40} /> :<img src={"http://localhost:8000/"+reciverPhoto} alt='imgs' />}
                        <h4 className={style.reciverEmail}>{reciverEmail}</h4>
                    </div>
                    <div id='pointer2' className={style.middle}>
                    { 
                    loading4 ? <div style={{width: "50%" , marginTop: "100px" , marginLeft: "20px"}}><Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    </div>
                    :
                    emails.map((item,id)=>{
                    return <>
                       
                        <div   key={id}  className={item.messageFrom===reciverEmail ?  style.from:style.to}>
                        <p id={emails.length-1 === id ? 'pointer' : ''} >{item.messageContent} </p>
                        <br />
                        </div>
                    </>
                    })
                    }
                    </div>
                    <div className={localStorage.getItem('dark_mode') == 0  ? style.bottom : style.bottomDark }>
                      
                        <TextField id="outlined-basic"  className={style.inputField} label="Message" 
                        sx={{
                            margin: "auto",
                            width: "100%"
                        }}
                        value={sendMessage}
                        
                        onChange={(e)=>setsendMessage(e.target.value)}  onKeyDown={(e)=>sendEmailByEmter(e.key)} variant="outlined" />
                       
                </div>
            </div>
        </div>
    </div>
);
}