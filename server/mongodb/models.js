const mongoose=require('mongoose');
const userSchema=require('./schemas/userSchema.js')

let models={
  userModel:userSchema
}

for(key in models){
  let schema=models[key];
  mongoose.model(key,schema)
}


var user= new mongoose.model('userModel')({username:'jie'})
console.log(user.crypto('ddd'))
mongoose.model('userModel').find()
.then(function(){
  console.log(this)
})
.catch(function(err){
  console.log(err)
})
module.exports={
  getModel(name){
    return mongoose.model(name)
  }
};


