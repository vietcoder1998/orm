import { PrimaryGeneratedColumn, Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: "profile" })
export class ProfileEntity {
    @OneToOne(type => UserEntity, { onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true, })
    @JoinColumn({ name: "id", referencedColumnName: "id" })
    user: UserEntity;

    @PrimaryGeneratedColumn({ name: "id", type: "uuid" })
    public id: string;

    @Column({ name: "firstname", default: "", nullable: true, type: "varchar", length: 45 })
    public firstname: string;

    @Column({ name: "lastname", default: "", nullable: true, type: "varchar", length: 45 })
    public lastname?: string;

    @Column({ name: "address", default: null, nullable: true })
    public address?: string;

    @Column({ name: "playername", default: null, nullable: true })
    public playername?: string;

    @Column({ name: "created_date", default: -1, type: "varchar", nullable: true, length: 45 })
    public birthday?: number;

    @Column({ name: "description", default: 1, type: "varchar", nullable: true, length: 45 })
    public description?: string;

    @Column({ name: "active", default: 1, type: "int", nullable: true  })
    public active?: number;
}