const Mongoose = require("mongoose");
const ownerSchema = new Mongoose.Schema({
    ownerName:{
        type:String,
        require:true
    },
    ownerNationalId:{
        type:String,
        require:true
    },
    ownerTin:{
        type:String,
        require:true
    },
    ownerAddress:{
        type:String,
        require:true
    }
});

const ownerModel = Mongoose.model("owner",ownerSchema);

module.exports = ownerModel;