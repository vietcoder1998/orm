import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as swaggerDocument from './swagger.json';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import connectDB from './migrations/Index';
import { UserDao } from './dao/UserDao';
import { ProfileDao } from './dao/ProfileDao';

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

  public UserService() {
    this.httpServer.get('/user/:id', (req?: express.Request, res?: express.Response) => {
      let userDao: UserDao = new UserDao();
      let response = userDao.getOne(req.params.id);
      response.then((data?: any) => res.send(data))

    })

    this.httpServer.post('/user/create', (req?: express.Request, res?: express.Response) => {
      let userDao: UserDao = new UserDao();
      let data = req.body;
      let response = userDao.create(data);
      response.then((data?: any) => res.send(data))
    })

    this.httpServer.post('/user/:id', (req?: express.Request, res?: express.Response) => {
      let userDao: UserDao = new UserDao();
      let response = userDao.update(req.params.id, req.body);
      response.then((data?: any) => res.send(data))
    })

    this.httpServer.post('/user/:id/unactive', (req?: express.Request, res?: express.Response) => {
      let userDao: UserDao = new UserDao();
      let response = userDao.delete(req.params.id);
      response.then((data?: any) => res.send(data))
    })
  }

  public ProfileService() {
    this.httpServer.get('/profile/:id', (req?: express.Request, res?: express.Response) => {
      let profileDao: ProfileDao = new ProfileDao();
      let response = profileDao.getOne(req.params.id)
      response.then((data?: any) => res.send(data))
    })

    this.httpServer.post('/profile/:id', (req?: express.Request, res?: express.Response) => {
      let profileDao: ProfileDao = new ProfileDao();
      let response = profileDao.update(req.params.id, req.body)
      response.then((data?: any) => res.send(data))
    })

    this.httpServer.post('/profile/:id/create', (req?: express.Request, res?: express.Response) => {
      let profileDao: ProfileDao = new ProfileDao();
      let response = profileDao.create(req.params.id, req.body)
      response.then((data?: any) => res.send(data))
    })
  }
}

dotenv.config();
const port = process.env.SERVER_PORT;
let newApp = new App();
newApp.Start(port);
newApp.UserService();
newApp.ProfileService();
