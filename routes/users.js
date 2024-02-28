const express= require("express");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const {UserModel, userValid, loginValid, createToken} = require("../models/userModel")
const {auth} = require("../middlewares/auth");
const {verifyToken} = require("../middlewares/verifyToken");
const {config} = require("../config/secret")
// const { taskModel } = require("../models/taskModel");


const router = express.Router();

router.get("/" , async(req,res)=> {
  res.json({msg:"users endpoint work"})
})

router.get("/success", verifyToken, async (req, res) => {
  let data = await taskModel.find({});
  res.json(data);
});

router.post("/",async(req,res) => {
  let valdiateBody = userValid(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();
    user.password = "******";
    res.status(201).json(user)
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({msg:"Email already in system try login",code:11000})
    }
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})

router.get("/task", async (req,res)=>{
  let data = await UserModel.find({});
  res.json(data);
  data.filter
});

router.post("/login", async (req, res) => {
  let validateBody = loginValid(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "User and password not match 1" });
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "User and password not match 2" });
    }
    
    let token = createToken(user._id);
    // res.cookie('token', token, { httpOnly: true, sameSite: 'strict'});
    // Utilisation de res.json() pour envoyer à la fois le message et le nom de l'utilisateur
    res.status(200).json({ msg: 'Login successful', token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
})

module.exports = router;