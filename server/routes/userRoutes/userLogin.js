const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('users');
const router = express.Router();
const querystring = require('querystring');
const {
  validateMethods,
  validatePaths,
  validateField,
  cryptoDataByHamc,
}=require('../util.js');

/*路由拦截*/
router.use(validateMethods('post'));
router.use(validatePaths('/'));

/*用户登入*/
let login=(req,res,next)=>{
  let conditions={_id:0,password:0};
  let user =req.data;
  UserModel.findOne(user,conditions)
  .then((doc)=>{
    if(doc){
      doc=doc.toJSON();
      res.cookie('sessionToken',doc.sessionToken,{
        domain:'',
        path:'*',
        maxAge:24*60*60*1000,
        httpOnly:true,
        signed:true
      });
      doc.sessionToken=undefined
      res.status(200).json({success:true,msg:'登入成功!',user:doc})
    }else{
      res.status(200).json({success:false,msg:'用户名或密码错误！'})
    }
  })
  .catch((err)=>{
    next(err)

  })
}

router.route('/')
.post((req,res,next)=>{
  req.data=req.body
  next()
})
.post(validateField('username','用户名不能为空！'))
.post(validateField('password','用户密码不能为空！'))
.post(validateField('userType','用户类型不能为空！'))
.post((req,res,next)=>{
  let {password}=req.data;
  req.data.password=cryptoDataByHamc(password);
  next()
})
.post(login)

module.exports = router
