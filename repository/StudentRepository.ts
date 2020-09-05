
import { StudentEntity } from '../entity/StudentEntity';
import { Connection, getRepository, getConnection } from 'typeorm';
import { logger } from './../config/Logger';

export default class StudentRepository {
    private student: Object;
    private students: Array<Object>;
    private connection: Connection;

    constructor() {
        this.connection = getConnection("default")
    }

    public async getStudent(id?: string | number) {
        await this.connection.getRepository(StudentEntity).findOne(id).then((res) => {
            if (res) {
                this.student = JSON.stringify(res);
                console.log(this.student)
            }
        }).catch(err => logger.error(err));

        return this.student;
    }
}