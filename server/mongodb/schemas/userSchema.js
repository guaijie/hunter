let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema=new Schema({
  id:Number,
  username:String,
  password:String,
  phone:String,
});

userSchema.static('validatePassword',function(){

})


userSchema.method('crypto',function(data){
  
})


module.exports=userSchema;