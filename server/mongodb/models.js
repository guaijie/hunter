const mongoose=require('mongoose');
const userSchema=require('./schemas/userSchema.js')

let models={
  userModel:userSchema
}

for(key in models){
  let schema=models[key];
  mongoose.model(key,schema)
}


var user= new mongoose.model('userModel')()
// console.log(user.crypto('ddd'))

module.exports={
  getModel(name){
    return mongoose.model(name)
  }
};


