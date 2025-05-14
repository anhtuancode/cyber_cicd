import { Server } from "socket.io";
import prisma from "../prisma/init.prisma";

const createRoomId = (userIdSender, userIdRecipient) => {
   // quy tắc sắp xếp cần phải tuân thủ hạn chế thay đổi
   const roomId = [userIdSender, userIdRecipient].sort((a, b) => a - b).join("_");
   // console.log({ roomId });
   return `chat_${roomId}`;
};

const arrUserChat = [];
const objectUserChat = {};

const initSocket = (httpServer) => {
   const io = new Server(httpServer, {
      /* options */
   });

   io.on("connection", (socket) => {
      console.log(`socket id`, socket.id);
      // userId
      const userId = socket.handshake.query.userId;
      console.log({ userId });

      socket.join(userId);

      // arrUserChat.push({
      //    id: socket.id,
      //    userId,
      // });
      objectUserChat[`${userId}`] = socket.id;

      // emit: bắn sự kiện cho FE
      // on: lắng nghe sự kiện tự FE bắn cho BE

      socket.on("JOIN_ROOM", (payload) => {
         console.log("JOIN_ROOM", { payload });
         const { userIdSender, userIdRecipient } = payload;

         const roomId = createRoomId(userIdSender, userIdRecipient);

         socket.join(roomId);
      });

      socket.on("SEND_MESSAGE", async (payload) => {
         console.log("SEND_MESSAGE", { payload });
         const { message, userIdSender, userIdRecipient } = payload;

         const roomId = createRoomId(userIdSender, userIdRecipient);

         const createdAt = new Date();

         io.to(roomId).emit("RECEIVE_MESSAGE", {
            roomId: roomId,
            payload: {
               message: message,
               userIdSender: userIdSender,
               userIdRecipient: userIdRecipient,
               createdAt: createdAt,
            },
         });

         // lưu db
         await prisma.chats.create({
            data: {
               message: message,
               userIdSender: userIdSender,
               userIdRecipient: userIdRecipient,
               createdAt: createdAt,
            },
         });

         const room = io.sockets.adapter.rooms.get(roomId);

         if (room.size === 1) {
            console.log(room.size, userIdRecipient);
            // arrUserChat.forEach();
            const socketId = objectUserChat[`${userIdRecipient}`];
            io.to(socketId).emit("HONG_BIET", {
            // io.to(userIdRecipient.toString()).emit("HONG_BIET", {
               roomId: roomId,
               payload: {
                  message: message,
                  userIdSender: userIdSender,
                  userIdRecipient: userIdRecipient,
                  createdAt: createdAt,
               },
            });
         }
      });

      socket.on("LEAVE_ROOM", (payload) => {
         console.log("LEAVE_ROOM", { payload });
         const { userIdSender, userIdRecipient } = payload;
         const roomId = createRoomId(userIdSender, userIdRecipient);
         socket.leave(roomId);
      });
   });
};

export default initSocket;