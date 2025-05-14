import pool from "./src/common/mysql2/pool.mysql2";
import express, { raw } from "express";
import sequelize, { models } from "./src/common/sequelize/connect.sequelize";
import { DataTypes } from "sequelize";
import rootRouter from "./src/routers/root.router";
import { handleError } from "./src/common/helpers/error.helper";
import logger from "./src/common/winston/init.winston";
import logApi from "./src/common/morgan/init.morgan";
import cors from "cors";
import { createServer } from "http";
import initSocket from "./src/common/socket/init.socket";


const app = express();
const port = 3069;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// SEQUELIZE ORM
const permission = sequelize.define(
  "Permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    module: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deletedAt: {
      type: "TIMESTAMP",
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: sequelize.literal("CURRENT_TIMESTAMP"),
      defaultValue: null,
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      defaultValue: null,
    },
  },
  {
    tableName: "Permissions",
    timestamps: false,
  }
);
// code first => đồng bộ code => database
permission.sync({ alter: true });

// database first
// đồng bộ database => code
// npx sequelize-auto -h localhost -d AppFood_CyberSoft -u root -x 1234 -p 3307  --dialect mysql -o src/models -a src/models/additional.json -l esm

//middleware
app.use(express.static("."))
app.use(express.json());
app.use(logApi());
app.use(cors());





app.use(rootRouter);
app.use(handleError);


const httpServer = createServer(app);

initSocket(httpServer)

httpServer.listen(3069, () => {
  logger.info(`Server online at http://localhost:3069`, { tag: "SERVER" });
});
