

import {GoogleLogout} from 'react-google-login'

const clientId= "234850608613-n7u9ta3ue6lgaff0u5q2ad1c260bpote.apps.googleusercontent.com"




function SignUp(){

    const onSuccess=(res)=>{
        console.log("Logout Success! Current User: ",res.profileobj)
    }
    const onFailure=(res)=>{
        console.log("Login Failed! Current User: ",res)
    }

    return(
        <div id="googleSignUpButton">
  <GoogleLogout
    buttonText='SignUp'
    clientId={clientId}
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={false}
    />

        </div>
    )
  
}

export default SignUp;
