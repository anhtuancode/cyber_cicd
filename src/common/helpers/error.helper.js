import { MulterError } from "multer";
import { BadRequestException, ForBiddenException, UnAuthorizedException } from "./exception.helper";
import {responseError} from "./response.helper";
import jwt from "jsonwebtoken";
export const handleError = (err, req, res, next) =>{
    console.log(err);

    let statusCode = err.statusCode || 500;

    if(err instanceof jwt.JsonWebTokenError){
        statusCode = (new UnAuthorizedException()).statusCode
    }
    if(err instanceof jwt.TokenExpiredError){
        statusCode = (new ForBiddenException()).statusCode
    }
    if(err instanceof MulterError){
        statusCode = (new BadRequestException()).statusCode;
    }

    const response = responseError(err.message, statusCode, err.status);
    res.status(response.statusCode).json(response);   
}