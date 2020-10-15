import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity('matkul')
export default class MatkulEntity {
    
    @PrimaryColumn({type: 'varchar', length: 64, nullable: false})
    @Generated('uuid')
    id: string;

    @Column()
    matkul: string;
}