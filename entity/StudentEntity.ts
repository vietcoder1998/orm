import { PrimaryGeneratedColumn, Entity, Column} from 'typeorm';

@Entity({name: "thisinh"})
export class StudentEntity {
    @PrimaryGeneratedColumn({name: "thisinhID"})
    private thisinhID: number;

    @Column({name: "tenthisinh", default: "", nullable: true})
    private tenthisinh: string;

    @Column({name: "birthday", default: -1, nullable: true})
    private birthday?: number;

    @Column({name: "diachi", default: null, nullable: true})
    private diachi?: string;
    
    public getThisinhID() : number {
        return this.thisinhID
    }

    public getTenthisinh() : string {
        return this.tenthisinh
    }

    public getNgaySinh() : number {
        return this.birthday;
    }

    public getDiaChi() : string {
        return this.diachi;
    }

    public setThiSinhID(thisinhID?: number): void {
        this.thisinhID = thisinhID;
    }

    public setTenThiSinh(tenthisinh?: string): void {
        this.tenthisinh = tenthisinh;
    }

    public setNgaySinh(birthday?: number): void {
        this.birthday = birthday;
    }

    public setDiaChi(address: string): void {
        this.diachi = address;
    }
}
