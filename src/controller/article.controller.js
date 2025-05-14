import { responseSuccess } from "../common/helpers/response.helper";
import articleService from "../services/article.service";

const articleController = {
    findAll: async (req, res, next) =>{
        try {
            const result = await articleService.findAll(req,res,next);
            const response = responseSuccess(result, 'Get article list successfully')
    
            res.status(response.statusCode).json(response)   
        } catch (error) {
            next(error);
        }
    }
}

export default articleController;