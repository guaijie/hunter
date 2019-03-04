const express = require('express');
const UserModel=require('../../mongodb/models.js').getModel('users');
const router = express.Router();
const querystring = require('querystring');
const crypto=require('crypto');
const {
  validateMethods,
  validatePaths,
  validateField,
  deCipherData
}=require('../util.js');
const ObjectID = require('mongodb').ObjectID;

router.use(validateMethods('post','get'));
router.use(validatePaths('/'));

/*判断用户输入是否为空*/
router.route('/')
.all((req,res,next)=>{
  let data=req.signedCookies;
  console.log(data)
  req.data=data;
  next()
})
.all(validateField('sessionToken','用户尚未登录！'))
.all((req,res,next)=>{
  let _id=deCipherData(req.data.sessionToken);
  console.log(_id)
  UserModel.findOne({_id})
  .then((doc)=>{
    console.log(doc)
    if(doc){
      res.status(200)
      .json(doc.toJSON())
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