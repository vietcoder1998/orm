import { createConnection, Connection } from "typeorm";
import { StudentEntity } from '../entity/StudentEntity';
import { logger } from './../config/Logger';

export default function connectDB() {
    createConnection({
        name: "default",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "123456",
        database: "tuyensinh",
        entities: [
            StudentEntity
        ],
        synchronize: true,

    }).then((res) => {
        if (res) {
            logger.silly("Successs connect mysdl DB: tuyensinh")
        }
    })
}