import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity({ name: "role" })
export class RoleEntity {
    @PrimaryGeneratedColumn({ name: "id_role", type: "int"})
    public id_role: number;

    @Column({ name: "description", default: "", nullable: true, type: "varchar", length: "120" })
    public description: string;

    @Column({ name: "name", default: "", nullable: true, type: "varchar", length: "45" })
    public name: string;
}