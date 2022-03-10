const Mongoose = require("mongoose");
const productSchema = new Mongoose.Schema({
    productName:{
        type:String,
        require:true,
    },
    productDesign:{
        type:String,
        require:true
    },
    productMaterial:{
        type:String,
        require:true
    },
    productStatus:{
        type:Boolean,
        require:true
    },
    productQuantity:{
        type:Number,
        require:true
    },
    designWorker:{
        type:String,
        require:true
    }

});

const ProductModel = Mongoose.model("product", productSchema);

module.exports = ProductModel;
