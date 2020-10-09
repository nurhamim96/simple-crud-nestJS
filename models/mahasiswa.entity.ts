import { Column, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity('mahasiswa')
export default class MahasiswaEntity {

    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    name: string

    @Column()
    nik: number;

    @Column({type: 'varchar', length: 20, nullable: false})
    jurusan: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    address: string;
}