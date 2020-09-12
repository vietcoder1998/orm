import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: "role" })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: "id_role"})
    public roleID: string;

    @Column({ name: "description", default: "", nullable: true, type: "varchar", length: "120" })
    public description: string;

    @Column({ name: "name", default: "", nullable: true, type: "varchar", length: "45" })
    public name: string;
}