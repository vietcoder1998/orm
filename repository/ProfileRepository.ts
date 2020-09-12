import { Connection, getConnection } from 'typeorm';
import { logger } from './../config/Logger';
import { ProfileEntity } from '../entity/ProfileEntity';
import { ConfigResponse } from '../config/Response';
import { SUCCESS, SUCCESS_CREATE, SUCCESS_DELETE, SUCCESS_UPDATE, SUCCESS_GET_PROFILE } from '../const/Message';
import { UserEntity } from '../entity/UserEntity';

export default class ProfileRepository {
    private connection: Connection;
    private profile: any;

    constructor() {
        this.connection = getConnection();
    }

    public async getProfile(id: string | number) {
        await this.connection
            .createQueryBuilder()
            .select("*")
            .from(ProfileEntity, "p")
            .innerJoin(subQuerry => {
                return subQuerry
                    .select()
                    .from(UserEntity, "u")
                    .where(`u.id_user=${id}`)
            }, "u")
            .where("u.id_profile = p.id_profile")
            .getMany()
            .then((res) => {
                if (res) {
                    console.log(res)
                }
            }).catch(err => logger.error(err));

        return ConfigResponse(200, SUCCESS_GET_PROFILE, this.profile);
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

    public async insertProfile(profile?: any) {
        this.profile = profile;
        profile.id_user = "abc";
        await this.connection.getRepository(ProfileEntity)
            .insert(this.profile)
            .then((res) => {
                if (res) {
                }
            })
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_CREATE)
    }

    public async unactiveProfile(id: string) {
        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .update("profile")
            .where(`id_profile=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_UPDATE, -1)
    }

    public async updateProfile(id: string, body?: any) {
        let profile: ProfileEntity = new ProfileEntity;

        await this.connection.getRepository(ProfileEntity)
            .createQueryBuilder()
            .update("profile")
            .set({ ...profile })
            .where(`id_user=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_DELETE, -1)
    }
}