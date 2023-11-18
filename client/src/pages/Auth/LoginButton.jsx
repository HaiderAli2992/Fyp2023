import {GoogleLogin} from 'react-google-login';


const clientId= "234850608613-n7u9ta3ue6lgaff0u5q2ad1c260bpote.apps.googleusercontent.com"



function Login(){

    const onSuccess=(res)=>{
        console.log("Login Success! Current User: ",res.profileObj)
        var obj=res.profileObj
        // console.log(obj.email)
        // alert("User with image"+obj.email)
        
    }
    const onFailure=(res)=>{
        console.log("Login Failed! Current User: ",res)
    }


  return(
     <div id="signInButton">
         <GoogleLogin 
    buttonText='Login'
    clientId={clientId}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
    />
     </div>
  )
}

export default Login;
