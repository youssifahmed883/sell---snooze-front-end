/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import swal from 'sweetalert';
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../stylesheet/signupForCompany.module.css";

export default function CompleteSignupForCompany() {
  const [passwordShown, setPasswordShown] = useState(false);
  const CompanyEmail = localStorage.getItem("auth_email");

  const [Headquarters, setHeadquarters] = useState("");
  const [numOfWorkers, setnumOfWorkers] = useState("");
  const [Phone, setPhone] = useState("");
  const [Industry, setIndustry] = useState("");
  const [Website, setWebsite] = useState("");
  const [Description, setDescription] = useState("");
  const navigate =useNavigate();

  // CompanyEmail	Headquarters	numOfWorkers	Phone	Industry	Website	Description	photo
  const saveData = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("CompanyEmail", CompanyEmail);
    formData.append("Headquarters", Headquarters);
    formData.append("numOfWorkers", numOfWorkers);
    formData.append("Phone", Phone);
    formData.append("Industry", Industry);
    formData.append("Website", Website);
    formData.append("Description", Description);
    formData.append("CompanyId",  localStorage.getItem('auth_id'));

    axios.post(`http://localhost:8000/api/completeCompantRegister`, formData).then(res=>{
        localStorage.setItem('completeRigester',1)
        navigate('/')
        window.location.reload()
        swal("Success Register",'','success');
      }
      );
  };

  const togglePassword = useCallback(() => {
    setPasswordShown(!passwordShown);
  });

  const [showSecondDiv, setShowSecondDiv] = useState({ display: "block" });
  const [showThirdDiv, setShowThirdDiv] = useState({ display: "none" });

  const ShowSecondDiv = useCallback(() => {
    setShowSecondDiv({ display: "block" });
    setShowThirdDiv({ display: "none" });
  });

  const ShowThirdDiv = useCallback(() => {
    setShowThirdDiv({ display: "block" });
    setShowSecondDiv({ display: "none" });
  });
  return (
    <>
      <div className={style.container}>
        <div style={showSecondDiv} className={style.secondDiv}>
          <h2>Write your company information</h2>

          <div className={style.inputs}>
            <div className={style.oneinput}>
              <input
                type="text"
                className={style.inputField}
                id="Headquarters"
                placeholder="Headquarters"
                onChange={(e)=>setHeadquarters(e.target.value)}
                required
              />
            </div>
            <div className={style.oneinput}>
              <input
                type="number"
                className={style.inputField}
                id="CompanySize"
                placeholder="Number Of Workers"
                onChange={(e)=>setnumOfWorkers(e.target.value)}
                required
              />
            </div>
            <div className={style.twoInputField}>
              <input
                type="number"
                className={style.inputField}
                id="Phone"
                placeholder="Phone"
                onChange={(e)=>setPhone(e.target.value)}
                required
              />
              <select
                className={style.inputField}
                name="Category"
                id="Category"
                onChange={(e)=>{
                    setIndustry(e.target.value)
                }}
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
            </div>

            <div className={style.oneinput}>
              <input
                type="text"
                className={style.inputField}
                id="Website"
                placeholder="Website"
                onChange={(e)=>setWebsite(e.target.value)}
                required
              />
            </div>
            <div className={style.oneinput}>
              <input
                type="text"
                className={style.inputField}
                id="disc"
                placeholder="Description"
                onChange={(e)=>setDescription(e.target.value)}
                required
              />
            </div>
            <div className={style.twoInputs}>
            <button className={style.herobtn} onClick={saveData} type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
