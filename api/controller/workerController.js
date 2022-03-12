const Worker = require("../models/worker");
const ERROR_LIST = require("../helpers/errorList");
const ERROR_MESSAGE = require("../helpers/errorMessage");
const ResponseStatus = require("../helpers/responseStatus");
const Validator = require('validatorjs');

const createWorker = async (req, res, next) => {
    try {
        const validate = new Validator(req.body, {
            workerName: "string",
            workerPhone: "string",
            workerNationalId: "string",
            workerTinID: "string"
        });
        if(validate.fails()){
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
        }
        const exist = await Worker.findOne({
            workerPhone:req.body.workerPhone,
            workerNationalId:req.body.workerNationalId,
            workerTinID:req.body.workerTinID,
        });
        if(exist){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("Phone no or NID or TIN ID exist", exist));
        }
        let create = new Worker({
            ...req.body
        });
        create = await create.save();
        if(create){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("worker created successfully", create));
        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.failure("worker not created", {}))
    }catch (err) {
        return res
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    }
}

const getWorker = async(req, res, next) =>{
    try {
        const result = await Worker.findOne({
            workerName:req.query.productName,
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

const updateWorker = async (req, res, next) => {
    try{

    }catch (err) {

    }
}

const deleteWorker = async (req, res, next) => {
    try {
        const Delete = await Worker.deleteOne({ workerName:req.query.productName,});
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


/*
const getWorker = async(req, res, next) =>{
    try{
        const worker = await Worker.findOne({
            workerName:req.query.productName,
        },"-_id -__v");
        if(!worker){
            throw "worker not found";
        }
        res.status(201)
            .json({message:"product found", Worker:worker});
    }catch (err) {
        console.log(err);
        res.status(400)
            .json({message:"worker not found"});
    }
}


 */

module.exports = {
    createWorker: createWorker, getWorker, updateWorker, deleteWorker
}
