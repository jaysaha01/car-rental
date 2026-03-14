const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    require:true
  },
  email:{
    type:String,
    trim:true,
    unique:true,
    require:true
  },
  phone:{
    type:Number,
    trim:true,
    unique:true,
    require:true
  },
  password:{
    type:String,
    trim:true,
    require:true
  },
  usertype:{
    type: String,
    enum: ['Owner', 'Renter', 'Admin'],
    default: 'Renter',
    require:true
  },
  avtar:{
    default:"https://images.icon-icons.com/157/PNG/256/user_22110.png",
    type:String,
    trim:true,
  }
});

const user = mongoose.model('user', userSchema);

module.exports = user
