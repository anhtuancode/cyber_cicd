import demoSevice from "../services/demo.sevice";
import {responseError, responseSuccess} from "../common/helpers/response.helper";
const demoController = {
    students: (req, res) => {
        const result = demoSevice.students();
        res.json(result);
    },
    prisma: async (req, res, next) =>{
        try {
            const result = await demoSevice.prisma(req,res,next);
            // 200: success
            // 400: fail
            // 404: not found
            // 500: the broken server
            // const response ={
            //     status: 'success',
            //     statusCode: 200,
            //     message: 'Get student list successfully',
            //     data: result,
            //     doc: "domain.com/doc-api"
            // }
    
            const response = responseSuccess(result, 'Get student list successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            console.log(error);
            const response = responseError(error.message, error.statusCode, error.status);
            res.status(response.statusCode).json(response);   
        }
    },
    middleware: async (req, res, next) =>{
        try {
            const result = await demoSevice.middleware(req,res,next);
            const response = responseSuccess(result, 'Get student list successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    },
    sendEmail: async (req, res, next) =>{
        try {
            const result = await demoSevice.sendEmail(req);
            const response = responseSuccess(result, 'Send email successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    }
}

export default demoController;