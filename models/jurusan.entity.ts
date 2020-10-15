import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('jurusan')
export default class JurusanEntity {
    
    @PrimaryColumn({ type: 'varchar', length:64, nullable: false })
    @Generated('uuid')
    id: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    jurusan: string;
}