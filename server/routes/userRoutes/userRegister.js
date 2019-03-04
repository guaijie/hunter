const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('users');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');
const {
  validateMethods,
  validatePaths,
  validateField,
  cryptoDataByHamc,
  cryptoDataByCipher
}=require('../util.js');

router.use(validateMethods('post'));
router.use(validatePaths('/'));


/*用户注册*/
let signUp=(req,res)=>{
  let user=new UserModel(req.data);
  user.save((err,doc)=>{
    if(err){
      next(err)
    }else{
      res.cookie('sessionToken',cryptoDataByCipher(doc._id.toString()),{
        domain:'',
        path:'/user',
        maxAge:24*60*60*1000,
        httpOnly:true,
        signed:true
      });
      res.status(200).json({
        success:true,
        msg:'注册成功！',
      })
    }
  })
}

router.route('')
.post((req,res,next)=>{
  req.data=req.body
  console.log(req.data)
  next()
})
.post(validateField('username','用户名不能为空！'))
.post(validateField('password','密码不能为空！'))
.post(validateField('userType','用户类型不能为空！'))
.post((req,res,next)=>{
  let user=req.data;
  UserModel.findOne({username:user.username})
  .then((doc)=>{
    if(doc){
      res.status(200).json({success:false,msg:'用户名已存在，请重新注册！'})
    }else{
      next();
    }
  })
  .catch((err)=>{
    next(err)
  })

})
.post((req,res,next)=>{
  console.log(req.data.password)
  req.data.password=cryptoDataByHamc(req.data.password)
  next();
})
.post(signUp)

module.exports = router
