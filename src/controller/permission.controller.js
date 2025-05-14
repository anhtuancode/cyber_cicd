import { responseSuccess } from "../common/helpers/response.helper";
import permissionService from "../services/permission.service";

const permissionController = {
   create: async function (req, res, next) {
      try {
         const result = await permissionService.create(req);
         const response = responseSuccess(result, `Create permission successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await permissionService.findAll(req);
         const response = responseSuccess(result, `Get all permissions successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await permissionService.findOne(req);
         const response = responseSuccess(result, `Get permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await permissionService.update(req);
         const response = responseSuccess(result, `Update permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await permissionService.remove(req);
         const response = responseSuccess(result, `Remove permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   groupByModule: async function (req, res, next) {
      try {
         const result = await permissionService.groupByModule(req);
         const response = responseSuccess(result, `Get permission successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};

export default permissionController;