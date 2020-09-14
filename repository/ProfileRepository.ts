import { Connection, getConnection, Entity } from 'typeorm';
import { logger } from './../config/Logger';
import { ProfileEntity } from '../entity/ProfileEntity';
import { ConfigResponse } from '../config/Response';
import { SUCCESS, SUCCESS_CREATE, SUCCESS_DELETE, SUCCESS_UPDATE, SUCCESS_GET_PROFILE } from '../const/Message';
import { UserEntity } from '../entity/UserEntity';
import randomID from '../config/RandomID';
import { ProfileBody } from '../models/Profile';

export default class ProfileRepository {
    private connection: Connection;
    private profile: any;
    private configResponse: typeof ConfigResponse;

    constructor() {
        this.connection = getConnection();
    }

    public async getProfile(id: string | number) {
        await this.connection
            .createQueryBuilder()
            .select()
            .from(ProfileEntity, "p")
            .where(`p.id = ${id}`)
            .getRawOne()
            .then((res) => {
                if (res) {
                    this.profile = JSON.stringify(res);
                }
            }).catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_GET_PROFILE, JSON.parse(this.profile));
    }

    public async getProfiles(ids?: Array<string | number>, pi?: number, ps?: number) {
        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .select("profile")
            .getMany()
            .then((res) => {
                if (res) {
                    this.profile = res;
                }
            }).catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS, this.profile)
    }

    public async insertProfile(id?: string, body?: ProfileBody) {
        let profile = new ProfileEntity();
        profile.id = id;
        profile.firstname = "";
        profile.lastname = "";
        profile.birthday = 0;
        profile.address = "";
        profile.playername = ""
        profile.description = "";

        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .insert()
            .values(profile)
            .execute()
            .then((res) => {
                if (res) {
                    console.log(body)
                }
            })
        return ConfigResponse(200, SUCCESS_CREATE, this.profile.id)
    }

    public async updateProfile(id: string, body?: ProfileBody) {
        let profile = new ProfileEntity();
        profile.firstname = body.firstname;
        profile.lastname = body.lastname;
        profile.birthday = body.birthday;
        profile.description = body.description;
        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .update("profile")
            .set(profile)
            .where(`id=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_UPDATE, -1)
    }

    public async deleteProfile(id?: string) {
        let profile = new ProfileEntity();
        profile.firstname = "";
        profile.lastname = "";
        profile.birthday = 0;
        profile.address = "";
        profile.playername = ""
        profile.description = "";
        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .update("profile")
            .set(profile)
            .where(`id=${id}`)
            .execute()
            .catch(err => logger.error(err));
            return ConfigResponse(200, SUCCESS_DELETE)
    }
}