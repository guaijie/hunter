let crypto=require('crypto');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const USER_SECRET='guaijie'

let userSchema=new Schema({
  id:Number,
  username:String,
  password:String,
  phone:String,
  sessionToken:String,
});


userSchema.method('crypto',function(data){
  let hmac=crypto.createHmac('md5',USER_SECRET);
  return hmac.update(data).digest('base64')
})


module.exports=userSchema;