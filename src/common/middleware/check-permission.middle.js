import { BadRequestException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma";

const checkPermission = async (req, res, next) =>{
    try {
        const user = req.user;
        const roleId = user.roleId;
        if(roleId === 1){
            next();
        }



        // 1- endpoint users call
        const routePath = req.route.path
        const baseURL = req.baseUrl;
        const endpoint = `${baseURL}${routePath}`;

        const method = req.method;

        const isPermisson = await prisma.rolePermission.findFirst({
            where:{
                roleId: roleId,
                Roles:{
                    isActive: true
                },
                Permissions:{
                    endpoint: endpoint,
                    method: method
                },
                isActive: true
            }
        })

        if(!isPermisson){
            throw new BadRequestException("Dont have permission to access");
        }
        // 2- endpoint in database

        next();
    } catch (error) {
        next(error)
    }
}

export default checkPermission;