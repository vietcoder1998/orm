import { getConnection } from "typeorm";
// import IBaseDao from './interfaces';
import { ProfileEntity } from "../entity/ProfileEntity";
import IBaseDAO from './BaseDao';
import ProfileRepository from '../repository/ProfileRepository';

export class ProfileDao implements IBaseDAO<ProfileEntity>  {
    private data?: any;
    constructor() {
    }

    public getAll() {
    }

    public getOne(id?: string | number) {
        let profileRepository: ProfileRepository = new ProfileRepository();
        this.data = profileRepository.getProfile(id).then((res)=> console.log(res));
        return this.data;
    }

    public getMany() {

    }

    public update() {

    }
    
    public save() {

    }

    public delete() {

    }
}