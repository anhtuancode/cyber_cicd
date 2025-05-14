import express from "express";
import demoRouter from "./demo.router";
import articleRouter from "./article.router";
import authRouter from "./auth.router";
import roleRouter from "./role.router";
import permissionRouter from "./permission.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger";
import userRouter from "./user.router";
import chatRouter from "./chat.router";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "../common/graphql/schema.graphql";
import root from "../common/graphql/root.graphql";
import ruru from "../common/graphql/init.ruru";

const rootRouter = express.Router();

// Serve the GraphiQL IDE.
rootRouter.get("/ruru", ruru);

rootRouter.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    context: (req) => {
      const accessToken = req.headers?.authorization?.split(" ")[1];

      return {
        accessToken: accessToken,
      };
    },
  })
);

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get("/api-docs", (req, res, next) => {

  const UrlServerCurrent = `${req.protocol}://${req.get("host")}`

  const ServerCurrent = swaggerDocument.servers.find((item)=>{
   return item.url === UrlServerCurrent;
  })

  if(!ServerCurrent){
    swaggerDocument.servers.unshift({url: ServerCurrent, description: "Server is running on local"});
  }

  const handlerSwaggerUi = swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  handlerSwaggerUi(req, res, next);
});

rootRouter.use("/demo", demoRouter);
rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/role", roleRouter);
rootRouter.use("/permission", permissionRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouter);

export default rootRouter;
