const JOI = require("@hapi/joi");


const signUpSchema = JOI.object().keys({
     firstname: JOI.string().min(3).max(30).required(),
     lastname: JOI.string().min(3).max(30).required(),
     email: JOI.string().min(15).max(30).required().email(),
     password: JOI.string().min(5).max(30).required()
    })

const loginSchema = JOI.object().keys({
    
    email: JOI.string().min(15).max(30).required().email(),
    password: JOI.string().min(5).max(30).required(),
})

module.exports = {
    signUpSchema,
    loginSchema
}