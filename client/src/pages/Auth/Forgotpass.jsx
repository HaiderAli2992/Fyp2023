import React, { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import toast from "react-hot-toast";
import {  forgotpassword} from '../../actions/auth';
import './Auth.css'


const ForgotPassword = () => {
 
 
  const [email, setEmail] = useState("");
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email ) {
      return toast.error("Please enter email");
    }
      
      dispatch(forgotpassword({ email }, navigate))
      
      toast.success('Email successfully')

  }



  return (
    <section className="auth-section">
 
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
        
          <label htmlFor="email">
            <h4>Enter Your Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
Send Reset Email          </button>
        </form>
        <p>
        </p>

        <div >

     
        </div>
      </div>
    </section>
  )
}



export default ForgotPassword