const express = require('express');;
const mongoose= require('mongoose');
const user = express.Router();

const userLogin=require('./userLogin.js');
const userRegister=require('./userRegister.js')
// const usersList=require('./usersList.js')

/*连接数据库*/
user.use(function(req,res,next){
  mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{
    next();
  })
  .catch((err)=>{
    console.log(err.name)
    next(err);
  })

})

/*用户登入*/
user.use('/',(req,res,next)=>{
  next({status:400})
})
user.use('/userLogin',userLogin)
/*用户注册*/
user.use('/userRegister',userRegister)
/*获取注册用户信息列表*/
// user.use('/usersList',usersList)


user.use(function(req,res,next){
  mongoose.disconnect();
})

module.exports = user;
