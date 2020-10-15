import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import JurusanEntity from "./jurusan.entity";
import MatkulEntity from "./matkul.entity";


@Entity('mahasiswa')
export default class MahasiswaEntity {

    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    name: string

    @Column()
    nik: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    address: string;

    @ManyToOne(() => JurusanEntity, (jurusan: JurusanEntity) => jurusan.id, {cascade: true})
    @JoinColumn({ name: 'jurusan_id' })
    jurusanId: JurusanEntity;

    @ManyToMany(() => MatkulEntity, (matkul: MatkulEntity) => matkul.id, {cascade: true})
    @JoinTable({name: 'matkul_mahasiswa', joinColumn:{name: 'mahasiswa_id'}, inverseJoinColumn: {name: 'matkul_id'}})
    matkulId: MatkulEntity;


}