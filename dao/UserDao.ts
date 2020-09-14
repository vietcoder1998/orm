import { getConnection } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import IBaseDAO from './BaseDao';
import UserRepository from '../repository/UserRepository';
import { UserBody } from '../models/User';

export class UserDao implements IBaseDAO<any>  {
    private data?: any;
    private userRepository: UserRepository = new UserRepository();

    public getOne(id?: string) {
        this.data = this.userRepository.getUser(id);
        return this.data;
    }

    public getMany(ids?: Array<number|string>) {
        this.data = this.userRepository.getUsers(ids);
        return this.data;
    }

    public update(id?: string, body?: UserBody) {
        this.data =  this.userRepository.updateUser(id, body);
        return this.data;
    }
    
    public create(body?: UserBody) {
        this.data = this.userRepository.insertUser(body);
        return this.data;
    }

    public delete(id?: string) {
        this.data = this.userRepository.unactiveUser(id);
        return this.data;
    }
}