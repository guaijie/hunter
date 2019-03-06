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
}=require('../util.js');

router.use(validateMethods('post'));
router.use(validatePaths('/'));


/*用户注册*/
let signUp=(req,res)=>{
  let user=new UserModel(req.data);
  let sessionToken=cryptoDataByHamc(user._id.toString());
  user.sessionToken=sessionToken;
  user.save((err,doc)=>{
    if(err){
      next(err)
    }else{
      doc=doc.toJSON();
      doc._id=undefined;
      doc.password=undefined;
      doc.sessionToken=undefined;
      res.cookie('sessionToken',sessionToken,{
        domain:'',
        path:'*',
        maxAge:24*60*60*1000,
        httpOnly:true,
        signed:true
      });
      res.status(200).json({
        success:true,
        msg:'注册成功！',
        user:doc
      })
    }
  })
}

router.route('')
.post((req,res,next)=>{
  req.data=req.body
  next()
})
.post(validateField('username','用户名不能为空！'))
.post(validateField('password','用户密码不能为空！'))
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
  req.data.password=cryptoDataByHamc(req.data.password)
  next();
})
.post(signUp)

module.exports = router
