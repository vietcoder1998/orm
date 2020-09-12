import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { ProfileEntity } from './ProfileEntity';

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: "id_user" })
    public id_user: string;

    @Column({ name: "username", default: "", nullable: true, type: "varchar", length: "45" })
    public username: string;

    @Column({ name: "password", default: "", nullable: true, type: "varchar", length: "45" })
    public password?: string;

    @Column({ name: "token", default: null, nullable: true })
    public token?: string;

    @JoinTable({ name: "role_id", } )
    public role_id?: string;

    @Column({ name: "created_date", default: -1, type: "int", nullable: true })
    public created_date?: number;

    @Column({name: "active", default: 1, type: "int", nullable: true})
    public active?: number;

    @OneToOne(type => ProfileEntity, {onUpdate: "CASCADE", onDelete: "NO ACTION", nullable: true,})
    @JoinColumn({name: "id_profile", referencedColumnName: "id_profile"})
    profile: ProfileEntity
}