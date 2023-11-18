import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import SendEmail from './nodemail.js';


import Users from '../models/auth.js'

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.status(404).json({
        message: "User already exists."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      name, email, password: hashedPassword
    })
    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    res.status(200).json({
      result: newUser, token
    })
} catch (error) {
  res.status(500).json("Something went wrong...")
}
}


export const logInController = async (req, res) => {
  const { email, password } = req.body
  console.log("The emaik is ",email)
  try {
    const existingUser = await Users.findOne({ email })
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exists"
      })}

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

      if (!isPasswordCorrect) {
        return res.status(404).json({
          message: "Invalid Credentials"
        })
      }

      const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
      },
      process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

    res.status(200).json({
      result: existingUser, token
    })
  } catch (error) {
    res.status(500).json("Something went wrong...")
  }
}


export const googlelogInController = async (req, res) => {
  const { emailj} = req.body
  console.log("THe body is",emailj)
  try {
    const existingUser = await Users.findOne({ email:emailj })
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exists"
      })}

    console.log("User exist")
      const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id
      },
      process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

    res.status(200).json({
      result: existingUser, token
    })
  } catch (error) {
    res.status(500).json("Something went wrong...")
  }
}

export const googlesignUpController = async (req, res) => {
  const { emailj, namej } = req.body
  console.log("THe name and email is ", emailj,namej)
  try {
    console.log("Entering into Tru")
    const existingUser = await Users.findOne({ email:emailj })
    if (existingUser) {
      return res.status(404).json({
        message: "User already exists."
      })
    }

    var password = generateRandomPassword()

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            text-align: center;
        }
        h1 {
            color: #444444;
        }
        p {
            font-size: 16px;
        }
        .password {
            font-weight: bold;
            color: #e53e3e;
            font-size: 18px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Signup Confirmation</h1>
        <p>Thank you for signing up with us! Your account has been successfully created.</p>
        <p>Your automatically generated password is:</p>
        <div class="password">${password}</div>
        <p>Please make sure to change your password once you log in for the first time.</p>
    </div>
</body>
</html>
`;
    SendEmail("Signup Confirmation",emailHtml,emailj)
console.log("password is ",password)
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Users.create({
      name:namej, email:emailj, password: hashedPassword, verifytoken:""
    })
    console.log("")
    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    )

    console.log("Data has been sent")
    res.status(200).json({
      result: newUser, token
    })
} catch (error) {
  res.status(500).json("Something went wrong...")
}
}


export const forgotPasswordController = async (req, res) => {
  const { email} = req.body
  console.log("THe reset body is",email)
  try {
    const userfind = await Users.findOne({ email:email })
    if (!userfind) {
      return res.status(404).json({
        message: "User doesn't exists"
      })}
    
    const token = jwt.sign({_id:userfind._id},process.env.JWT_SECRET,{
      expiresIn:"300s"
  });
  console.log("Token created: ",token)
  console.log("User email is ",userfind.email)
  try {
    const setusertoken = await Users.findOneAndUpdate(
        { email: userfind.email },
        { verifytoken: token },
        { new: true }
    );
    if (!setusertoken) {
        console.log("No user found or updated.");
    } else {
        console.log("User's token is updated in database");
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                h1 {
                    color: #444444;
                }
                p {
                    font-size: 16px;
                }
                .password {
                    font-weight: bold;
                    color: #e53e3e;
                    font-size: 18px;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset Link</h1>
                <p>Thank you for requesting, Your password reset link is here.</p>
                <p>Please follow the link</p>
                <div class="password">http://localhost:3000/resetpassword/${userfind.id}/${setusertoken.verifytoken}</div>
                
            </div>
        </body>
        </html>
        `;

      
        SendEmail("Reset Email",emailHtml,email)
    }
} catch (error) {
    console.error("Error during findOneAndUpdate: ", error);
}
  } catch (error) {
    res.status(500).json("Something went wrong...")
  }
}


export const resetPassword =async(req,res)=>{
  const {id,token} = req.params;
  console.log("id and token"+id+token)
  try {
      const validuser = await Users.findOne({_id:id,verifytoken:token});
      console.log("The validated user")
      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);

      

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
          console.log("The token verification is "+validuser.verifytoken)
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
}

export const updatePassword =async(req,res)=>{

  const {id,token} = req.params;

  const {password} = req.body;

  console.log("update" +token)
  try {
      const validuser = await Users.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);

      if(validuser && verifyToken._id){
        console.log("user authenticated")
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await Users.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})


      }else{
        console.log("User hasn't authenticated")
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
    console.log("Error occured",error)
      res.status(401).json({status:401,error})
  }


}

function generateRandomPassword() {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  let hasNumber = false;
  let hasUppercase = false;

  for (let i = 0; i < length; i++) {
      const char = charset.charAt(Math.floor(Math.random() * charset.length));
      password += char;
      if (!hasNumber && '0123456789'.indexOf(char) !== -1) {
          hasNumber = true;
      }
      if (!hasUppercase && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(char) !== -1) {
          hasUppercase = true;
      }
  }

  // Ensure password meets all criteria
  if (!hasNumber) {
      password = password.substring(0, password.length - 1) + '0';
  }
  if (!hasUppercase) {
      password = password.substring(0, password.length - 1) + 'A';
  }

  return password;
}