const Owner = require("../models/owner");
const ERROR_LIST = require("../helpers/errorList");
const ERROR_MESSAGE = require("../helpers/errorMessage");
const ResponseStatus = require("../helpers/responseStatus");
const Validator = require('validatorjs');


const createOwner = async (req, res, next) => {
    try{
        const validate = new Validator(req.body, {
            ownerName: "string",
            ownerNationalId: "string",
            ownerTin: "string" ,
            ownerAddress: "string"
        });
        if(validate.fails()){
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
        }
        const exist =  await Owner.findOne({
            //ownerName:req.body.ownerName,
            ownerNationalId:req.body.ownerNationalId,
            //ownerTin:req.body.ownerTin,
            //ownerAddress:req.body.ownerAddress,
        });
        if(exist){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("owner already exist", exist ));

        }
        let create = new Owner({
            ...req.body
        });
        create = await create.save();
        if(create){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("owner created successfully", create));

        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.failure("owner could not be created",{}));
    }
    catch (err) {
        return res
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR, err));
    }
}

const getOwner = async (req, res, next) => {
    try {
        const result = await Owner.findOne({
            ownerName:req.query.ownerName,
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

const updateOwner = async (req, res, next) => {
    try{

    }catch (err) {

    }
}

const deleteOwner = async (req, res, next) => {
   try {
       const Delete = await Owner.deleteOne({ ownerName:req.query.ownerName});
       if(Delete){
           return res
               .status(ERROR_LIST.HTTP_OK)
               .send(ResponseStatus.success("Delete successfully", {}));
       }
       return res
           .status(ERROR_LIST.HTTP_OK)
           .send(ResponseStatus.failure("Owner not found", {}));
   }catch (err) {
       return res
           .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
           .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
   }

}


module.exports = {
    createOwner:createOwner, getOwner, deleteOwner, updateOwner
}
