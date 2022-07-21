/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router ,Routes, Route , Navigate} from 'react-router-dom';
import Header from './Components/Header';
import Setting from './Components/Setting/Setting';
import EditProfile from './Components/Setting/EditProfile';
import EditPassword from './Components/Setting/EditPassword';
import Theme from './Components/Setting/Theme';
import Login from  './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Company from './Components/HomePage/Company'
import Companies from './Components/Companies/Companies'
import ErrorPage from './Components/ErrorPage';
import ProductPage from './Components/ProductPage/ProductPage';
import ProfilePage from './Components/Profile/ProfilePage';
import CompanyPage from './Components/CompanyPageDashboard/CompanyPage'
import AddProduct from './Components/CompanyPageDashboard/AddProduct'
import AddAdvertisement from './Components/CompanyPageDashboard/AddAdvertisement'
import ShowProducts from './Components/CompanyPageDashboard/ShowProducts'
import ShowAdvertisements from './Components/CompanyPageDashboard/ShowAdvertisements'
import EditInformation from './Components/CompanyPageDashboard/EditInformation'
import axios from 'axios'
import Forget from './Components/Auth/Forget';
import CompleteSignupForCompany from './Components/signupForCompany';
import DashBoardEdit from './Components/Setting/DashBoardEdit';
import Emailing from './Components/emailing';
import ListCategoryCompany from './Components/Companies/listCategoryCompany';
import EditProductInfo from './Components/CompanyPageDashboard/EditProductInfo';
import EditAddvertInfo from './Components/CompanyPageDashboard/editAddvert';
import DashboardOrders from './Components/CompanyPageDashboard/DashboardOrders';
import OrdersPage from './Components/HomePage/ordersPage';

// API 
axios.defaults.baseURL ="http://127.0.0.1:8000/"
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

if(localStorage.getItem('auth_token')){
  var userName=localStorage.getItem('auth_name');
  var userEmail=localStorage.getItem('auth_email');
 }else{
  userName='UserName';
  userEmail='Example.@gmail';
}
  var CompanyuserName= "google";


function App() {

  let [companyInformation, setcompanyInformation] = useState([]);

  var userEmail=localStorage.getItem('auth_email');

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/listCompany').then(res2=>
    {
      setcompanyInformation(res2.data);
    });
  },[]);

  const header = {Home:"Home",About:"About",Contact:"Contact",Login:"Login",Setting:"Setting"}

  const chat=companyInformation;

  return (
    <Router>
        <React.Fragment>
        <Header chats={chat} headers={header}/>
          <Routes>

              <Route  path="/" element= {localStorage.getItem('auth_token') ?  <Company/> : <Login/>}/>
              <Route  path="chat/:reciverEmail" element={<Emailing />}/>
              <Route  path="campany/:companyId" element={<Companies />}/>
              <Route  path="productPage/:companyId/:Productid" element={<ProductPage/>}/>
              <Route  path="EditProduct/:Productid" element={<EditProductInfo />}/>
              <Route  path="DashboardOrders" element={<DashboardOrders />}/>
              <Route  path="OrdersPage" element={<OrdersPage />}/>
              <Route  path="setting" element={<Setting/>}>
                  <Route  path="EditProfile" element={ localStorage.getItem('auth_role_as')=== "0" ? <EditProfile /> :<DashBoardEdit />}/>
                  <Route  path="EditPassword" element={<EditPassword />}/>
                  <Route  path="Theme" element={<Theme />}/>
              </Route>
              <Route  path="/Category/:Industry" element={<ListCategoryCompany  />}/>
              <Route  path="/EditAddvertisment/:addId" element={<EditAddvertInfo  />}/>
              <Route  path="signup" element={<Signup />}/>
              <Route  path="login/signup" element={<Signup />}/>
              <Route  path="completeCompanyInfo" element={<CompleteSignupForCompany />}/>
              <Route  path="forget" element={<Forget />}/>
              <Route  path="login/forget" element={<Forget />}/>
              <Route  path="login" element={localStorage.getItem('auth_token') ? <Navigate to='/' replace={true}/> : <Login/>}/>
              <Route  path="ProfilePage" element={localStorage.getItem('auth_role_as')=== "0" ? <ProfilePage   /> : localStorage.getItem('auth_role_as')=== "1"  ? <CompanyPage  /> : <Login/>}/>
              <Route  path="ProfilePage" element={<CompanyPage  />}>
                    <Route  path="AddProduct" element={<AddProduct />}/>
                    <Route  path="ShowProducts" element={<ShowProducts  />}/>
                    <Route  path="AddAdvertisement" element={<AddAdvertisement CompanyuserName={CompanyuserName} />}/>
                    <Route  path="ShowAdvertisements" element={<ShowAdvertisements />}/>
                    <Route  path="EditInformation" element={<EditInformation />}/>
              </Route>
              <Route  path="*" element={<ErrorPage />}/>
          </Routes>
        </React.Fragment>
    </Router>
  );
}
export default App;
