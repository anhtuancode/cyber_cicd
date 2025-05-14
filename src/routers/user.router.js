import express from 'express';
import { userController } from '../controller/user.controller';
import protect from '../common/middleware/protect.middleware';
import uploadLocal from '../common/multer/local.multer';
import uploadCloud from '../common/multer/cloud.multer';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.post('/', userController.create);
userRouter.get('/', protect ,userController.findAll);
userRouter.get('/:id', userController.findOne);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);


userRouter.post('/avatar-local', protect, uploadLocal.single('avatar'), userController.avatarLocal);
userRouter.post('/avatar-cloud', protect, uploadCloud.single('avatar'), userController.avatarCloud);


export default userRouter;