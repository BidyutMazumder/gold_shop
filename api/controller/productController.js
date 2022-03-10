const Product = require("../models/product");
const ERROR_LIST = require("../helpers/errorList");
const ERROR_MESSAGE = require("../helpers/errorMessage");
const ResponseStatus = require("../helpers/responseStatus");
const Validator = require('validatorjs');


const createProduct = async (req, res, next) => {
    try{
        const validate = new Validator(req.body, {
            productName: "string",
            productDesign: "string",
            productMaterial:"string",
            productStatus:"boolean",
            productQuantity:"integer",
            designWorker:"string"
        });
        if(validate.fails()){
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
        }
        const exist  = await Product.findOne({
            productName:req.body.productName,
        });
        if(exist){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("Product already exist", exist));
        }
        let create = new Product({
            ...req.body
        });
        create = await create.save();

        if(create){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("product created successfully", create));
        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.failure("product could not be created",{}));

    }catch (err) {
        return res
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    }
}

const getProduct = async(req, res, next) =>{
    try {
        const result = await Product.findOne({
            productName:req.query.productName,
        }, "-_id -__v");
        if (!result) {
            return res
                .status(ERROR_LIST.HTTP_NOT_FOUND)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NOT_FOUND, {}));
        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, result));
    } catch (err) {
        return err
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    }
}

const updateProduct = async (req, res, next) => {
    try{

    }catch (err) {

    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const Delete = await Product.deleteOne({ productName:req.query.productName,});
        if(Delete){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Delete successfully", {}));
        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.failure("Product not found", {}));
    }catch (err) {
        return res
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    }

}

module.exports = {
    createProduct: createProduct, getProduct, updateProduct, deleteProduct
}
