import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as swaggerDocument from './swagger.json';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import { StudentDao } from './dao/StudentDao';
import { Logger } from "tslog";
import connectDB from './migrations/Index';

class App {
  private httpServer: any;
  constructor() {
    this.httpServer = express();
    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());
    this.httpServer.set("views", path.join(__dirname, "views"));
    this.httpServer.set("view engine", "ejs");
    this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    connectDB();
  }

  public Start(port: number | string) {
    return new Promise((resolve, reject) => {

      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }

  public action(api?: string, method?: string, body?: any, param?: any) {
    this.httpServer.get('/:id', function (req?: any, res?: any) {
      let studentDao = new StudentDao();
      console.log(req.params)
      studentDao.getOne(req.params.id).then((data?: any) => {
        if (data) {
          res.send(data)
        }
      });
    })
  }
}

dotenv.config();
const port = process.env.SERVER_PORT;

let newApp = new App();
newApp.Start(port);
newApp.action();
