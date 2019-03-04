const crypto=require('crypto');
const HMAC_SECRET='guai'
const KEY='9cd5b4cf89949207'
const IV='e6db271db12d4d47'

let validateMethods=(...methods)=>(req,res,next)=>{
  methods.length!==0
  ?methods.some((val)=>val.toUpperCase()==req.method)
    ?next()
    :next({status:400})
  :next()
} 

let validatePaths=(...paths)=>(req,res,next)=>{
  paths.length!==0
  ?paths.some((val)=>val==req.path)
    ?next()
    :next({status:400})
  :next()
} 

let validateField=(field,msg)=>(req,res,next)=>{
  if(req['data'][field]){
    next()
  }else{
    res.status(200).json({
      success:false,
      msg:msg
    })
  }
}

let cryptoDataByHamc=(data)=>{
  let hmac=crypto.createHmac('md5',HMAC_SECRET);
  return hmac.update(data).digest('base64')
}

let cryptoDataByCipher =(data)=>{
  let cipher=crypto.createCipheriv('aes-128-cbc',KEY,IV);
  let encrypted=cipher.update(data,'utf8','base64');
  encrypted+=cipher.final('base64');
  return encrypted
} 

let deCipherData =(data)=>{
  let decipher=crypto.createDecipheriv('aes-128-cbc',KEY,IV);
  let decrypted=decipher.update(data,'base64','utf8');
  decrypted+=decipher.final('utf8');
  return decrypted
} 


// let a=cryptoDataByCipher('123');
// console.log(1,a);
// console.log(1,deCipherData(a))

module.exports={
  validateMethods,
  validatePaths,
  validateField,
  cryptoDataByHamc,
  cryptoDataByCipher,
  deCipherData
}