const User = require("../Models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.login=async(req,res)=>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).send({
                message:"Username and Password Required"
            })
        }
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).send({
                message:"Invalid Username"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({
                message:"Invalid Password"
            })
        }
        const token = jwt.sign({_id:user.id, username:user.username}, process.env.JWT_SECRET,{expiresIn:"14d"})
        res.status(200).send({
            message:"Login Success",
            token:token
        })
    } catch (error) {
         return res.status(400).send({
                message:error
            })
    }
}