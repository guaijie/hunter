const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('users');
const router = express.Router();
const querystring = require('querystring');
const {
  validateMethods,
  validatePaths,
  validateField,
  cryptoDataByHamc,
  cryptoDataByCipher
}=require('../util.js');

/*路由拦截*/
router.use(validateMethods('post'));
router.use(validatePaths('/'));

/*用户登入*/
let login=(req,res,next)=>{
  let Conditions={_id:1,username:1,password:1};
  let user =new UserModel(req.data);
  UserModel.findOne(user,Conditions)
  .then((doc)=>{
    if(doc){
      res.cookie('sessionToken',cryptoDataByCipher(doc._id.toString()),{
        domain:'',
        path:'/user',
        maxAge:24*60*60*1000,
        httpOnly:true,
        signed:true
      });
      res.status(200).json({success:true,msg:'登入成功!'})
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
.post(validateField('password','密码不能为空！'))
.post((req,res,next)=>{
  let pwd=req.data.password;
  req.data.password=cryptoDataByHamc(pwd);
  next()
})
.post(login)

module.exports = router
