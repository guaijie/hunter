const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('userModel');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');


/*判断用户输入是否为空*/
router.use((req,res,next)=>{
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


/*用户登入*/
let login=(req,res,next)=>{
  let Conditions={_id:0,username:1,password:1,sessionToken:1,phone:1};
  UserModel.findOne({username:req.user.username},Conditions)
  .then((doc)=>{
    if(doc){
      password=crypto.createHash('md5').update(req.user.password).digest('base64');
      if(doc.password===password){
        userInfo=doc.toObject();
        userInfo.password=undefined;
        res.cookie('sessionToken',userInfo.sessionToken,{
          domain:'',
          path:'/user',
          maxAge:24*60*60*1000,
          httpOnly:true,
          signed:true
        });
        userInfo.sessionToken=undefined;
        res.status(200).json({success:true,msg:'登入成功!',userInfo})
      }else{
        res.status(200).json({success:false,msg:'密码错误！'})
      }
    }else{
      res.status(200).json({success:false,msg:'账户尚未注册！'})
    }
  })
  .catch((err)=>{
    console.log(err.name)
    next(err)

  })
}

router.route('/')
.get(login)
.post(login)

module.exports = router
