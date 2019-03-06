let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema=new Schema({
  username:String,
  password:String,
  userType:Number,
  sessionToken:{type:String},
  phone:{type:String},
  avator:{type:String,'default':'male'},
});

userSchema.static('validatePassword',function(){

})


userSchema.method('crypto',function(data){
  
})


module.exports=userSchema;