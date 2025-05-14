import { responseSuccess } from "../common/helpers/response.helper";
import authService from "../services/auth.service";

const authController = {
    register: async (req,res,next) => {
        try {
            const result = await authService.register(req,res,next);
            const response = responseSuccess(result, 'Register successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },
    login: async (req,res,next) => {
        try {
            const result = await authService.login(req,res,next);
            const response = responseSuccess(result, 'Login successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },
    refreshToken: async (req,res,next) => {
        try {
            const result = await authService.refreshToken(req,res,next);
            const response = responseSuccess(result, 'Login successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },
    getInfo: async (req,res,next) => {
        try {
            const result = await authService.getInfo(req,res,next);
            const response = responseSuccess(result, 'Get Info user successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },
    googleLogin: async (req,res,next) => {
        try {
            const result = await authService.googleLogin(req,res,next);
            const response = responseSuccess(result, 'Login google successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },

}

export default authController;