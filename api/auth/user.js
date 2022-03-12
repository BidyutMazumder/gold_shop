const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ERROR_LIST = require("../helpers/errorList");
const ERROR_MESSAGE = require("../helpers/errorMessage");
const ResponseStatus = require("../helpers/responseStatus");
const Validator = require('validatorjs');
const User = require("../models/user");

const login = async (req, res, next) =>{
    try{
        const { email, password } = req.body;
        const validate = new Validator(req.body, {
            email: "string",
            pass: "string"
        });
        if(validate.fails()){
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
        }
        const account = await User.findOne({
            email:req.body.email,
        });
        if(!account){
            return res
                .status(ERROR_LIST.HTTP_NOT_FOUND)
                .send(ResponseStatus.failure("Account not found", {}));
        }
        //
        const checkPass = await bcrypt.compare(pass, exist.pass)
        if (!checkPass) {
            return res
                .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
        }
        const token = await jwt.sign({
            name: account.name,
            mobile: account.mobile,
            email: account.email,
            age: account.age,
            address: account.address
        }, process.env.JWT_SECRET, { expiresIn: '50000d' });
        return res
            .status(ERROR_LIST.HTTP_OK)
            .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, token));
    }catch(err){
        return res
            .err.next(err);
    }
}