const User = require("../models/user");
const ERROR_LIST = require("../helpers/errorList");
const ERROR_MESSAGE = require("../helpers/errorMessage");
const ResponseStatus = require("../helpers/responseStatus");
const Validator = require('validatorjs');

const createUser = async(req, res, next)=>{
    try{
        const validate = new Validator(req.body,{
            name: "string",
            mobile: "string",
            email: "string",
            address: "string",
            age: "date",
            pass: "string"
        });
        if(validate.fails()){
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
        }
        const exist = await User.findOne({
            mobile:req.body.mobile,
            email:req.body.email,
        });
        if(exist){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("This mobile number and email already exist", exist));
        }
        let create = new User({
            ...req.body
        })
        create = await create.save();
        if(create){
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("user created successfully", create));
        }
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.failure("user not created successfully", {}));
    }catch(err){
        return res
            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    }
};

const getUser = async(req, res, next) =>{
    try {
        const result = await User.findOne({
            mobile:req.query.mobile,
            email:req.query.email,
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

const updateUser = async (req, res, next) => {
    try{

    }catch (err) {

    }
}

const deleteUser = async (req, res, next) => {
    try {
        const Delete = await User.deleteOne({
            mobile:req.query.mobile,
            email:req.query.email
        });
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


/*const getUser = async(req, res, next)=>{
    try{
        const user = await User.findOne({
            mobile:req.query.mobile
        },"-pass -_id -__v");
        if(!user){ 
            throw "user not  found";
        }
        res
        .status(201)
        .json({message:"user found", user:user});
    }catch(err){
        console.log(err);
        res
        .status(400)
        .json({message:"user not found"});  
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            mobile: req.query.mobile
        });
        if (!user) {
            throw "user not  found";
        }
    }
    catch (err) {
        console.log(err);
    }
}



 */



module.exports = {
    createUser:createUser, getUser, updateUser, deleteUser

}

