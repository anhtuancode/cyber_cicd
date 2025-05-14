import prisma from "../common/prisma/init.prisma";

export const chatService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    let { page, pageSize, search, userIdRecipient } = req.query;
    const userIdSender = req.user.id;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize;
    search = search || "";

    const skip = (page - 1) * pageSize;

    // index = (page - 1) *pageSize

    const where = { message: { contains: search } };

    const chats = await prisma.chats.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: "desc" },
      // where: where,
      where:{
         OR:[
            {
               userIdSender: Number(userIdSender),
               userIdRecipient: Number(userIdRecipient)
            },
            {
               userIdSender: Number(userIdRecipient),
               userIdRecipient: Number(userIdSender)
            }
         ]
      }
    });

    const totalItem = await prisma.chats.count({
      where: where,
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      items: chats || [],
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
    };
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} chat`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} chat`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} chat`;
  },
};
