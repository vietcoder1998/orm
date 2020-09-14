import { PrimaryGeneratedColumn, Entity, Column, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { RoleEntity } from './RoleEntity';

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    public id: string;

    @Column({ name: "username", default: "", nullable: true, type: "varchar", length: "45" })
    public username: string;

    @Column({ name: "password", default: "", nullable: true, type: "varchar", length: "45" })
    public password?: string;

    @Column({ name: "token", default: null, nullable: true })
    public token?: string;

    @OneToOne(type => RoleEntity, { onUpdate: "NO ACTION", onDelete: "NO ACTION", nullable: true })
    @JoinColumn({ name: "id_role", referencedColumnName: "id_role", })
    public id_role?: number ;

    @Column({ name: "created_date", default: -1, type: "int", nullable: true })
    public created_date?: number;

    @Column({ name: "active", default: 1, type: "int", nullable: true })
    public active?: number;
}