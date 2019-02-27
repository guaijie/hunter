const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('userModel');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');


/*判断用户输入是否为空*/
router.use('/',(req,res,next)=>{
  let user=querystring.stringify(req.body)?req.body:req.query;
  req.user=user;
  if(!user.username){
    res.status(200).json({
      success:false,
      msg:'用户名不能为空！'
    })
  }else if(!user.password){
    res.status(200).json({
      success:false,
      msg:'密码不能为空！'
    })
  }else{
    next();
  }
})

/*用户注册时手机号不能为空*/
router.use('/',(req,res,next)=>{

  if(!req.user.phone){
    res.status(200).json({
      success:false,
      msg:'手机号不能为空！'
    })
  }else{
    next();
  }

})

/*判断用户名是否存在*/
router.use('/',(req,res,next)=>{
  let user=req.user;
  UserModel.findOne({username:user.username})
  .then((doc)=>{
    if(doc){
      res.status(200).json({success:false,msg:'用户名已存在，请重新注册！'})
    }else{
      let data=Buffer.from(req.user.username+req.user.password.substr(0,3));
      user.sessionToken=crypto.createHash('md5').update(data).digest('base64');
      next();
    }
  })
  .catch((err)=>{
    console.log(err.name)
    next(err)
  })

})

/*把密码转成md5*/
router.use('/',function(req,res,next){

  req.user.password=crypto.createHash('md5').update(req.user.password).digest('base64');
  next();

})

/*用户注册*/
let signUp=(req,res)=>{
  
  let user=new UserModel(req.user);
  user.save((err,doc)=>{
    if(err){
      console.log(err.name)
      next(err)
    }else{
      res.status(200).json({
        success:true,
        msg:'注册成功！',
        userInfo:{
          phone:req.user.phone,
          username:req.user.username,
          sessionToken:req.user.sessionToken,
          isOnline:false
        }
      })
    }
  })

}
router.route('/')
.get(signUp)
.post(signUp);

module.exports = router
