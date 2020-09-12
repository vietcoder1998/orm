import { getConnection } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import IBaseDAO from './BaseDao';
import UserRepository from '../repository/UserRepository';

export class UserDao implements IBaseDAO<UserEntity>  {
    private data?: any;
    private userRepository: UserRepository = new UserRepository();

    public getAll() {
    }

    public getOne(id?: string) {
        this.data = this.userRepository.getUser(id);
        return this.data;
    }

    public getMany(ids?: Array<number|string>) {
        this.data = this.userRepository.getUsers(ids);
        return this.data;
    }

    public update(id?: string, body?: Object) {
        this.data =  this.userRepository.updateUser(id, body);
        return this.data;
    }
    
    public save(user?: UserEntity) {
        this.data = this.userRepository.insertUser(user);
        return this.data;
    }

    public delete(id?: string) {
        this.data = this.userRepository.unactiveUser(id);
        return this.data;
    }
}