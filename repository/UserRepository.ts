import { Connection, getConnection } from 'typeorm';
import { logger } from './../config/Logger';
import { UserEntity } from '../entity/UserEntity';
import { ConfigResponse } from '../config/Response';
import { SUCCESS, SUCCESS_CREATE, SUCCESS_DELETE, SUCCESS_UPDATE } from '../const/Message';

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
            }).catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS, this.user)
    }

    public async insertUser(user?: any) {
        this.user = user;
        user.id_user = "abc";
        await this.connection.getRepository(UserEntity)
            .insert(this.user)
            .then((res) => {
                if (res) {
                    this.user = JSON.stringify(res);
                }
            })
            .catch(err => logger.error(err));

        return ConfigResponse(200, SUCCESS_CREATE)
    }

    public async unactiveUser(id: string) {
        await this.connection.getRepository(UserEntity)
            .createQueryBuilder()
            .update("user")
            .set({ active: -1 })
            .where(`id_user=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_UPDATE, -1)
    }

    public async updateUser(id: string, body?: any) {
        let user: UserEntity = new UserEntity;
        console.log(body)
        user.username = body.username;
        user.password = body.password;
        user.created_date = body.created_date;

        await this.connection.getRepository(UserEntity)
            .createQueryBuilder()
            .update("user")
            .set({ ...user })
            .where(`id_user=${id}`)
            .execute()
            .catch(err => logger.error(err));
        return ConfigResponse(200, SUCCESS_DELETE, -1)
    }
}