const Mongoose = require("mongoose");
const workerSchema = new Mongoose.Schema({
    workerName:{
        type:String,
        require:true
    },
    workerPhone:{
        type:String,
        require:true
    },
    workerNationalId:{
        type:String,
        require:true
    },
    workerTinID:{
        type:String,
        require:true
    }
});

const workerModel = Mongoose.model("worker", workerSchema);
module.exports = workerModel;