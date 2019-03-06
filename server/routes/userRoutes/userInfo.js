const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('users');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');
const {
  validateMethods,
  validatePaths,
  validateField,
}=require('../util.js');
const ObjectID = require('mongodb').ObjectID;

router.use(validateMethods('post','get'));
router.use(validatePaths('/'));

router.route('/')
.all((req,res,next)=>{
  req.data=req.signedCookies;
  next()
})
.all(validateField('sessionToken','用户尚未登录！'))
.all((req,res,next)=>{
  let conditions={_id:0,password:0,sessionToken:0};
  let sessionToken=req.data.sessionToken;
  console.log(sessionToken)
  UserModel.findOne({sessionToken},conditions)
  .then((doc)=>{
    if(doc){
      res.status(200)
      .json({
        success:true,
        user:doc.toJSON()
      })
    }else{
      res.status(200)
      .json({
        success:false,
        msg:'用户不存在！'
      })
    }
  })
  .catch(err=>{
    next(err)
  })
})

module.exports = router