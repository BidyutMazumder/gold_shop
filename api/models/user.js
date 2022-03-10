const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        require:false
    },
    pass:{
        type:String,
        required:true
    }
});

const UserModel = Mongoose.model("user", UserSchema);

module.exports = UserModel;