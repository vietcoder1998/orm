import { Connection, getConnection } from 'typeorm';
import { logger } from './../config/Logger';
import { UserEntity } from '../entity/UserEntity';
import { ConfigResponse } from '../config/Response';
import { SUCCESS, SUCCESS_CREATE, SUCCESS_DELETE, SUCCESS_UPDATE } from '../const/Message';
import randomID from '../config/RandomID';
import { UserBody } from '../models/User';

export default class UserRepository {
    private connection: Connection;
    private user: any;

    constructor() {
        this.connection = getConnection();
    }

    public async getUser(id: string | number) {
        await this.connection.getRepository(UserEntity)
            .findOne(id)
            .then((res) => {
                if (res) {
                    this.user = res
                } else {

                }
            }).catch(err => logger.error(err));

        return ConfigResponse(200, SUCCESS, this.user);
    }

    public async getUsers(ids?: Array<string | number>, pi?: number, ps?: number) {
        await this.connection.getRepository(UserEntity)
            .createQueryBuilder("user")
            .getMany()
            .then((res) => {
                if (res) {
                    this.user = res;
                }
            })
        return ConfigResponse(200, SUCCESS, this.user)
    }

    public async insertUser(user?: UserBody) {
        await this.connection
            .createQueryBuilder()
            .insert()
            .into(UserEntity)
            .values(user)
            .execute()
            .then((res) => {
                if (res) {
                    console.log(res)
                }
            })
        return ConfigResponse(200, SUCCESS_CREATE)
    }

    public async unactiveUser(id: string) {
        await this.connection.getRepository(UserEntity)
            .createQueryBuilder()
            .update("user")
            .set({ active: -1 })
            .where(`id=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_UPDATE, -1)
    }

    public async updateUser(id: string, body?: any) {
        let user: UserEntity = new UserEntity;
        user.username = body.username;
        user.password = body.password;
        user.created_date = body.created_date;
        await this.connection.getRepository(UserEntity)
            .createQueryBuilder()
            .update("user")
            .set({ ...user })
            .where(`id=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_DELETE, -1)
    }
}