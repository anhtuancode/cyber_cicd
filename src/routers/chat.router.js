import express from 'express';
import { chatController } from '../controller/chat.controller';
import protect from '../common/middleware/protect.middleware';

const chatRouter = express.Router();

// Tạo route CRUD
chatRouter.post('/', chatController.create);
chatRouter.get('/', protect, chatController.findAll);
chatRouter.get('/:id', chatController.findOne);
chatRouter.patch('/:id', chatController.update);
chatRouter.delete('/:id', chatController.remove);

export default chatRouter;