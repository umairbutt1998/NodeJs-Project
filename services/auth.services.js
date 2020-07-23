const user = require('../model/auth.model');

const mongoUserCreate = (newuser) => {
    console.log("service data " , newuser)
    return newuser.save();
}
//code for checking the provide email is exist or not 
const checkUser = (email) => {
    return user.findOne({email})
}
const createUser =(newUser) => {
    console.log("services", newUser)
    return newUser.save()
}
//exit
const userservices = {
    mongoUserCreate,
    //also add here the variable of checkUser.
    checkUser
}

module.exports = userservices;
