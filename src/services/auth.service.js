import {
  BadRequestException,
  UnAuthorizedException,
} from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";
import logger from "../common/winston/init.winston";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant";
import { OAuth2Client } from "google-auth-library";
import { where } from "sequelize";

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

const authService = {
  register: async (req, res, next) => {
    const { fullName, email, password } = req.body;

    const userExist = await prisma.users.findUnique({
      where: { email: email },
    });

    if (userExist) {
      throw new BadRequestException(
        "Email is exist please choose the other one"
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userNew = await prisma.users.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashPassword,
      },
    });

    console.log(userNew);

    delete userNew.password;

    return userNew;
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const userExist = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!userExist)
      throw new BadRequestException("Email isn't exist, please register");

    if(!userExist?.password) throw new BadRequestException("Please login by google or facebook")

    const isPassword = bcrypt.compareSync(password, userExist.password);

    if (!isPassword) {
      logger.error(`${userExist.id}`);
      throw new BadRequestException("Password is wrong, please check again");
    }

    const UserToken = tokenService.createTokens(userExist.id);

    return UserToken;
  },
  refreshToken: async (req) => {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken) throw new UnAuthorizedException("Dont have accessToken");
    if (!refreshToken)
      throw new UnAuthorizedException("Dont have refreshToken");

    const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    if (decodeAccessToken.userId !== decodeRefreshToken.userId)
      throw new UnAuthorizedException("Token isnt suitable");

    const tokens = tokenService.createTokens(decodeRefreshToken.userId);

    return tokens;
  },
  getInfo: async (req) => {
    delete req.user.password;
    return req.user;
  },
  googleLogin: async (req) => {
    const { code } = req.body;

    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      "postmessage"
    );

    const { tokens } = await oAuth2Client.getToken(code);

    const google_decode = jwt.decode(tokens.id_token);

    if (!google_decode.email_verified)
      throw new BadRequestException("Email isnt suitable");

    let userExist = await prisma.users.findUnique({
      where: {
        email: google_decode.email,
      },
    });

    if (!userExist) {
      userExist = await prisma.users.create({
        data: {
          email: google_decode.email,
          fullName: google_decode.name,
          avatar: google_decode.picture,
          googleId: google_decode.sub,
        },
      });
    }

    const tokenSystem = tokenService.createTokens(userExist.id);

    return tokenSystem;
  },
};

export default authService;
