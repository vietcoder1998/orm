import { getConnection } from "typeorm";
// import IBaseDao from './interfaces';
import { ProfileEntity } from "../entity/ProfileEntity";
import IBaseDAO from './BaseDao';
import ProfileRepository from '../repository/ProfileRepository';
import { stringify } from "querystring";
import { ProfileBody } from '../models/Profile';

export class ProfileDao implements IBaseDAO<ProfileEntity>  {
    private data?: any;
    constructor() {
    }

    public getOne(id?: string | number) {
        let profileRepository: ProfileRepository = new ProfileRepository();
        this.data = profileRepository.getProfile(id);
        return this.data;
    }

    public getMany() {

    }

    public update(id?: string, body?: ProfileBody) {
        let profileRepository: ProfileRepository = new ProfileRepository();
        this.data = profileRepository.updateProfile(id, body);
        return this.data;
    }

    public create(id?: string, body?: ProfileBody) {
        let profileRepository: ProfileRepository = new ProfileRepository();
        this.data = profileRepository.insertProfile(id, body);
        return this.data;
    }

    public delete() {
    }
}