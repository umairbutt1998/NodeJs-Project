const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const bodyparser = require("body-parser")
const user = require("./Router/auth.router")


mongoose.connect( process.env.MONGODB_CONNECTION_STRING,{
    usernewparser: true,
    useUnifiedTopology: true,

}).then(() => console.log("DB Connected"))
.catch((error) => {
console.log("error connection",error.message )
})
const app = express(); 

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//app.get('/',(req, res)=> res.json("api is correctly call"));
//app.use(express.json);
app.use("/user", user);



const PORT = process.env.PORT || 3002

app.listen(PORT , () => {
    console.log(`server start on: ${PORT}`)
})
