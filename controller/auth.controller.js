const mongoservices = require('../services/auth.services');
const bycrpt = require("bcryptjs");
const { json } = require('body-parser');
const userSchema = require('../Schema/auth.schema');



module.exports.createUser = async (req , res) =>{
    console.log("my data is", req.body)
    
    const validation = userSchema.signUpSchema.validate(req.body);
    if (validation.error){
        console.log(validation.error);
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    } 

    


    try{
        //code for checking the provide email is exist or not 
        const email = req.body.email
        console.log("email", email)
        
        const user = await mongoservices.checkUser(email)
        if(user){
            res.status(401).json({
                message: "User has been Already Register"
            })
        }
        const newuser = new User(req.body);
        // exit
        const data = await mongoservices.mongoUserCreate(newuser)
        res.status(201).json({
            message: "Account is successfully created and email has been send."
        });
        console.log("my data ", data)
    }
    catch(error){
        res.json(error)

    }
}

module.exports.login = async (req , res) =>{
    console.log("Login", req.body)

    const validation = userSchema.loginSchema.validate(req.body);
    if (validation.error){
        console.log(validation.error);
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    } 
    try{
     //   const email = req.body.email
      //  const Loginpassword = req.body.password (in two lines ko replace krdaina hn single line ma,next line)
        const {email ,password}= req.body
        const user = await mongoservices.checkUser(email)
        console.log("user", user)
        if(user)
           //is compare password
           bycrpt.compare(password, user.password).then(isMatch => {
               if(isMatch){
                   res.status(201).json({
                       message: "Successfully login"
                   })
               }
               else{
                   res.status(401).json({
                       message:"Password is not correct"
                   })
               }
           })
           else{
               res.status(404).json({
                   message:"User is not Found"
               })
           }
    }
    catch(error){
    

    }
}