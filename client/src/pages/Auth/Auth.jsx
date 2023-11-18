import React, { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import toast from "react-hot-toast";
import { signup, login , googlelogin,googlesignup} from '../../actions/auth';
import './Auth.css'
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
// import LoginButton from './LoginButton'
import { glogIn, googlelogIn } from '../../api';
const clientId= "234850608613-n7u9ta3ue6lgaff0u5q2ad1c260bpote.apps.googleusercontent.com"


const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };


    gapi.load('client:auth2',start)
   })

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email && !password) {
      return toast.error("Please enter email and password");
    }
    if (isSignup) {
      if (!name) {
        return toast.error("Please enter name")
      }
      dispatch(signup({ name, email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('User registered successfully')
      toast.success('Logged in successfully')
    } else {

      
      dispatch(login({ email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('Logged in successfully')


      
    }

  }



  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
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
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }} onClick={()=>{
                  navigate('/forgotpassword')
                }}>
                  Forgot password?
                </p>
              )}
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
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>

        <div >

          {isSignup?
          <>
           <SingupButt/></>:<>
           <LoginButt />
          </>}
          
     
        </div>
      </div>
    </section>
  )
}


function LoginButt(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSuccess=(res)=>{
      console.log("Login Success! Current User: ",res.profileObj)
      var obj=res.profileObj
      var emailj=obj.email
      dispatch(googlelogin({ emailj }, navigate))
      // toast.success('Redirecting...')
      // toast.success('Logged in successfully')

      
  }
  const onFailure=(res)=>{
      console.log("Login Failed! Current User: ",res)
      toast.custom(<div>Failed</div>)
     
  }


return(
   <div id="signInButton">
       <GoogleLogin 
  buttonText='Login'
  clientId={clientId}
  onSuccess={onSuccess}
  onFailure={onFailure}
  cookiePolicy={'single_host_origin'}
  isSignedIn={false}
  />
   </div>
)
}


function SingupButt(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSuccess=(res)=>{
      var obj=res.profileObj
      var emailj=obj.email
      var namej=obj.name
      dispatch(googlesignup({ emailj, namej }, navigate))
      // toast.success('Redirecting...')
      // toast.success('Logged in successfully')

      
  }
  const onFailure=(res)=>{
      console.log("Login Failed! Current User: ",res)
      toast.custom(<div>Failed</div>)
     
  }


return(
   <div id="signInButton">
       <GoogleLogin 
  buttonText='Signup'
  clientId={clientId}
  onSuccess={onSuccess}
  onFailure={onFailure}
  cookiePolicy={'single_host_origin'}
  isSignedIn={false}
  />
   </div>
)
}

export default Auth