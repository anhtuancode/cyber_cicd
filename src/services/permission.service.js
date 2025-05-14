import prisma from "../common/prisma/init.prisma";

const permissionService = {
   create: async function (req) {
      return `This action create`;
   },

   findAll: async function (req) {
      return `ok`;
   },

   findOne: async function (req) {
      return `This action returns a id: ${req.params.id} permission`;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} permission`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} permission`;
   },
   groupByModule: async function (req) {
      const roleId = +req.params.id;
      const listPermission = await prisma.permissions.findMany({
         include:{
            RolePermission:{
               where:{
                  roleId: roleId,
                  isActive: true
               }
            }
         }
      });

      const result = {};
      listPermission.forEach(item=>{
         if(Array.isArray(result[item.module])){
            result[item.module].push(item);
         }else{
            result[item.module]=[];
            result[item.module].push(item);
         }
      });

      return result;
   },
};

export default permissionService;