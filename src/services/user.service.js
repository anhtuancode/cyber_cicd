import prisma from "../common/prisma/init.prisma";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
} from "../common/constant/app.constant";

export const userService = {
  create: async function (req) {
    return "ok";
  },

  findAll: async function (req) {
    let { page, pageSize, search } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize;
    search = search || "";

    const skip = (page - 1) * pageSize;
    const where = { fullName: { contains: search } };

    const users = await prisma.users.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: "desc" },
      where: where,
    });

    const totalItem = await prisma.users.count({
      where: where,
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      items: users || [],
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
    };
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} user`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} user`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} user`;
  },

  avatarLocal: async function (req) {
    const file = req.file;
    if (!file) throw new Error("No file uploaded");

    const user = req.user;
    const userId = Number(user.id);

    if (user?.avatar) {
      const oldFilePath = path.join("images", user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        avatar: file.filename,
      },
    });

    return {
      folder: "images/",
      filename: file.filename,
      imgUrl: `images/${file.filename}`,
    };
  },

  avatarCloud: async (req) => {
    const file = req.file;
    const user = req.user;
    const userId = Number(user.id);

    if (!file) throw new Error("No file uploaded");

    // Configuration
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_API_KEY,
      api_secret: CLOUD_API_SECRET,
    });

    if (user?.avatar) {
      await cloudinary.uploader.destroy(user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream({folder: "images"},(error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(file.buffer);
    });

    await prisma.users.update({
      where:{
        id: userId
      },
      data:{
        avatar: uploadResult.public_id
      }
    })

    return {
      folder: uploadResult.asset_folder,
      filename: file.originalname,
      imgUrl: uploadResult.secure_url
    };
  },
};
