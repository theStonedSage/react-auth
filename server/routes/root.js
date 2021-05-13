const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig')
require('../config/passport');

router.get("/",(req,res)=>{
    res.send({
        message:"hello"
    })
})

router.post("/register",(req,res,done)=>{
    
    passport.authenticate('register',(err,user,info)=>{
        // console.log(err,user,info);
        if(err){
            console.log(err);
        }
        if(info){
            res.send({
                msg:info.msg,
                success:false
            })
        }
        else{
            User.findOne({name:user.name},(err,u)=>{
                if(err) res.status(500).send({msg:'internal server error',success:false});
                else
                res.status(200).send({
                    success:true,
                    msg:'user succesfully registered'
                })
            })
        }
    })(req,res,done);
})

router.post("/login",(req,res,done)=>{
    passport.authenticate('login',(err,user,info)=>{
        if(err){
            console.log(err);
        }
        if(info){
            res.send({
                msg:info.msg,
                success:false
            })
        }
        else{
            req.login(user,err=>{
                const token = jwt.sign({id:user.name},jwtSecret.secret);
                res.status(200).send({
                    success:true,
                    auth:true,
                    token:token,
                    msg:'user found and loggen in'
                })
            })
        }
    })(req,res,done);
})

router.get('/getData',(req,res,done)=>{
    passport.authenticate('jwt',{session:false},(err,user,info)=>{
        if(err){
            console.log(err);
        }
        if(info){
            res.send({
                msg:info.msg,
                success:false
            })
        }
        else{
            res.status(200).send({
                auth:true,
                name:user.name,
                msg:'user found in db'
            })
        }
    })(req,res,done)
})

module.exports = router;