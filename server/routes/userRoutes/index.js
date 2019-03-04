const express = require('express');;
const mongoose= require('mongoose');
const router = express.Router();

const userLogin=require('./userLogin.js');
const userRegister=require('./userRegister.js')
const userInfo=require('./userInfo.js')
const {validateMethods,validatePaths}=require('../util.js');

/*路由拦截*/
router.use(validateMethods('post','get'));
router.use(validatePaths('/userInfo','/userLogin','/userRegister'));

/*连接数据库*/
router.use(function(req,res,next){
  mongoose.connect('mongodb://guai:123456@localhost:27017/test',{useNewUrlParser:true})
  .then(()=>{
    next();
  })
  .catch((err)=>{
    next(err);
  })
})

/*获取用户信息*/
router.use('/userInfo',userInfo)
/*用户登入*/
router.use('/userLogin',userLogin)
/*用户注册*/
router.use('/userRegister',userRegister)
/*获取注册用户信息列表*/
// user.use('/usersList',usersList)


router.use(function(req,res,next){
  mongoose.disconnect();
})

module.exports = router;
