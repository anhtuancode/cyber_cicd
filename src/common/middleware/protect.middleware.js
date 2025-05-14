import { ACCESS_TOKEN_SECRET } from "../constant/app.constant";
import { UnAuthorizedException } from "../helpers/exception.helper";
import jwt from "jsonwebtoken";
import prisma from "../prisma/init.prisma";


const protect = async (req, res, next) =>{
    try {
        const authHeader = req.headers.authorization || "";

        const [type, token] = authHeader.split(" ");
        if(!token) throw new UnAuthorizedException("Don't have token to use website");

        if(type !== "Bearer") throw new UnAuthorizedException("Token isnt suitable");


        const decode = jwt.verify(token, ACCESS_TOKEN_SECRET)

        const user = await prisma.users.findUnique({ 
            where:{
                id: decode.userId
            },
            include:{
                Roles: true
            }
        })

        if(!user) throw new UnAuthorizedException("Not found user");

        req.user = user;
        
        next();
    } catch (error) {
        next(error);
    }
}


export default protect;