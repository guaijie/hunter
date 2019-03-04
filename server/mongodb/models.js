const mongoose=require('mongoose');
const userSchema=require('./schemas/userSchema.js')

let models={
  users:userSchema
}

for(key in models){
  let schema=models[key];
  mongoose.model(key,schema)
}


var user= new mongoose.model('users')({username:'jie'})
console.log(user.crypto('ddd'))

module.exports={
  getModel(name){
    return mongoose.model(name)
  }
};


