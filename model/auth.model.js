const mongodp = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongodp.Schema({
     FirstName:{
         type:String,
         req: true,

     },
     LastName:{
        type:String,
        req: true,
     },
     email:{
        type:String,
        req: true,
     },
     password:{
         type:String,
         req: true,
     }
})
UserSchema.pre('save', async function (next){
    try{
        console.log("password is : ", this.password)
        const salt = await bcrypt.genSalt(10);
        console.log("salt is : ", salt)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        console.log("hash is : ", hash)
    }
    catch{

    }
})
module.exports = User = mongodp.model("User",UserSchema);

