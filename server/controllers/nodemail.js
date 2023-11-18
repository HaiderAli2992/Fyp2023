import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"haider03484887745@gmail.com",
        pass:"cxzc ubeh jvjf pfwv"
    }
}) 


function SendEmail(subject,text,email){
    const mailOptions = {
        from:"haider03484887745@gmail.com",
        to:email,
        subject:subject,
        html:text
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error);
            res.status(401).json({status:401,message:"email not send"})
        }else{
            console.log("Email sent",info.response);
            res.status(201).json({status:201,message:"Email sent Succsfully"})
        }
    })

}


export default SendEmail;

