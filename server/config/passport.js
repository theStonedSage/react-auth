const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local');
const jwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const { use } = require('../routes/root');
const extractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwtConfig');

passport.use('register',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false
},(username,password,done)=>{

    try{
        // console.log('enter 1')
        User.findOne({name:username},(err,usr)=>{
            if(usr){
                // done(err,user,{err_mesage})
                return done(null,false,{msg:'username already taken'});
            }
            else{
                // console.log('enter 2')
                bcrypt.hash(password,10).then((pwd)=>{
                    const u = new User({
                        name:username,
                        password:pwd,
                    })
                    u.save((err)=>{
                        return done(null,u);
                    })
                })
            }
        })
    }
    catch(err){
        done(err);
    }
}))

passport.use('login',new localStrategy({
    usernameField:'email',
    passwordField:'password',
    session:false
},(username,password,done)=>{
    try{
        User.findOne({name:username},(err,user)=>{
            if(user){
                //user is presnt
                bcrypt.compare(password,user.password).then(res=>{
                    if(!res){
                        return done(null,false,{msg:"Incorrect password"});
                    }
                    else{
                        return done(null,user)
                    }
                })
            }
            else{
                // user is not present 
                return done(null,false,{msg:'Username doesnor exist'});
            }
        })
    }
    catch(err){
        done(err);
    }
}));

opts = {
    jwtFromRequest:extractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey:jwtSecret.secret
}

passport.use('jwt',new jwtStrategy(opts,(jwt_payload,done)=>{
    try{
        // console.log(jwt_payload);
        User.findOne({name:jwt_payload.id},(err,usr)=>{
            if(err) console.log(err);
            if(!usr){
                return done(null,false,{msg:'user not found in db'});
            }
            else{
                return done(null,usr);
            }
        })
    }catch(err){
        done(err)
    }
}))


