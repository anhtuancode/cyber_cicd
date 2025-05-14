import { BadRequestException } from "../common/helpers/exception.helper";
import transporter from "../common/nodemailer/instance.nodemailer";
import prisma from "../common/prisma/init.prisma";
import logger from "../common/winston/init.winston";

const demoSevice = {
  students: () => {
    return "hello";
  },
  prisma: async (req, res, next) => {
    // lỗi không kiểm soát được
    // res.a.a

    // Lỗi kiểm soát được
    const passdb = 1234;
    const passUser = 1234;
    if (passdb !== passUser) {
      console.log("Error");
      logger.error("Password wrong");
      throw new BadRequestException("Password isn't correct");
    } else {
      logger.info("Password successful");
    }

    const result = await prisma.user.findMany();
    return result;
  },
  middleware: async () => {
    return "middleware";
  },
  sendEmail: async (req) => {
    const {from, to, subject, text, html} = req.body;



    // send mail with defined transport object
    const info = await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
    


    console.log("Message sent: %s", info.messageId);
  },
};

export default demoSevice;
