import { createConnection, Connection } from "typeorm";
// import { StudentEntity } from '../entity/StudentEntity';
import { logger } from './../config/Logger';
// import config from "../ormconfig.json";
import { UserEntity } from '../entity/UserEntity';
import { ProfileEntity } from '../entity/ProfileEntity';

export default function connectDB() {
    createConnection({
        name: "default",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "123456",
        database: "werewolf",
        entities: [
            UserEntity,
            ProfileEntity
        ],
        synchronize: true,

    }).then((res) => {
        if (res) {
            logger.silly("Successs connect mysdl DB: werewolf")
        }
    })
}