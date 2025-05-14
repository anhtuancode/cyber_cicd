import express from "express";
import articleController from "../controller/article.controller";
import protect from "../common/middleware/protect.middleware";
import checkPermission from "../common/middleware/check-permission.middle";

const articleRouter = express.Router();

articleRouter.use(protect);

articleRouter.get("/", protect, checkPermission ,articleController.findAll);

export default articleRouter;