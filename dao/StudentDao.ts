import { getConnection } from "typeorm";
// import IBaseDao from './interfaces';
import { StudentEntity } from "../entity/StudentEntity";
import IBaseDAO from './BaseDao';
import StudentRepository from '../repository/StudentRepository';

export class StudentDao implements IBaseDAO<StudentEntity>  {
    private data?: any;
    constructor() {
    }

    public getAll() {
    }

    public getOne(id?: string | number) {
        let studentRepository: StudentRepository = new StudentRepository();
        this.data = studentRepository.getStudent(id);
        return this.data;
    }
    public getMany() { }
    public update() { }
    public save() { }
    public delete() { }
}