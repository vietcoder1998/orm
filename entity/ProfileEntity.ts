import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: "profile" })
export class ProfileEntity {
    @PrimaryGeneratedColumn({ name: "id_profile"  })
    public id_profile: string;

    @Column({ name: "firstname", default: "", nullable: true, type: "varchar", length: 45 })
    public firstname: string;

    @Column({ name: "lastname", default: "", nullable: true, type: "varchar", length: 45 })
    public lastname?: string;

    @Column({ name: "address", default: null, nullable: true })
    public address?: string;

    @Column({ name: "playername",default: null, nullable: true  })
    public playername?: string;

    @Column({ name: "created_date", default: -1, type: "varchar", nullable: true, length: 45 })
    public birthday?: number;

    @Column({name: "active", default: 1, type: "varchar", nullable: true, length: 45})
    public description?: number;
}