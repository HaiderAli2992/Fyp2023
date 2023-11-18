import React, { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import toast from "react-hot-toast";
import {  forgotpassword} from '../../actions/auth';
import './Auth.css'


const ResetPassword = () => {
 const { id, token } = useParams();
  const [isloaded,setisloaded]=useState(false)
  const [isverified,setisverified]=useState(true)
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const userValid = async () => {
    const res = await fetch(`http://localhost:5000/user/validateResetRequest/${id}/${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json()

    if (data.status == 201) {
        
        console.log("user valid")
     
        setisloaded(true)
    } else {
       toast.error("User can't be validated")
    }
}

  const resetpassword= async()=>{
    
    const res = await fetch(`http://localhost:5000/user/updatepassword/${id}/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    });

    const data = await res.json()

    if (data.status == 201) {
        toast.success("Password updated successfully")
    } else {
        toast.error("! Token Expired generate new LInk",{
            position: "top-center"
        })
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password || !confpassword ) {
      return toast.error("Please enter all required fields");
    }

    if (password!=confpassword){
        return toast.error("Password & Confirm password must match");
    }
      
    //   dispatch(forgotpassword({ email }, navigate))
    resetpassword()

  }


  useEffect(() => {
    userValid()
    // setTimeout(() => {
    //     setisloaded(true)
    // }, 3000)
    if (isloaded){
        return
    }
}, [])


  return (
    <>
    {isloaded?(<>
        <section className="auth-section">
 
 <div className="auth-container-2">
   <img src={icon} alt="stack overflow" className="login-logo" />
   <form onSubmit={handleSubmit}>
   
   <label htmlFor="password">
       <div style={{ display: "flex", justifyContent: "space-between" }}>
         <h4>Enter Password</h4>
         
       </div>
       <input
         type="password"
         name="password"
         id="password"
         value={password}
         onChange={(e) => {
           setPassword(e.target.value);
         }}
       />

       </label>
 
     <label htmlFor="password">
       <div style={{ display: "flex", justifyContent: "space-between" }}>
         <h4>Enter Confirm Password</h4>
         
       </div>
       <input
         type="password"
         name="password"
         id="password"
         value={confpassword}
         onChange={(e) => {
           setconfPassword(e.target.value);
         }}
       />

       </label>

     
       <button type="submit" className="auth-btn">
       Reset Password       
        </button>
   </form>
   <p>
   </p>

   <div >


   </div>
 </div>
</section>
    </>):<></>}
    </>
  )
}



export default ResetPassword