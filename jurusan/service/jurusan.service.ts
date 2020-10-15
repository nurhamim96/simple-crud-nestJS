import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JurusanDTO } from 'src/dtos/jurusan.dto';
import JurusanEntity from 'src/models/jurusan.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class JurusanService {
    constructor(
        @InjectRepository(JurusanEntity)
        private readonly jurusanRepository: Repository<JurusanEntity>
    ) {}

    // async create(jurusan: JurusanDTO): Promise<JurusanEntity> {
    //     return this.jurusanRepository.save(jurusan);
    // }

    async create(jurusaDTO: JurusanDTO): Promise<JurusanEntity> {
        const jurusan : JurusanEntity = new JurusanEntity();
        jurusan.jurusan = jurusaDTO.jurusan;

        return await this.jurusanRepository.save(jurusaDTO);
    }

    async update(id: string, jurusanDTO: JurusanDTO): Promise<JurusanEntity> {
        let jurusan: JurusanEntity = await this.jurusanRepository.findOne(id);

        if(!jurusan) throw new BadRequestException(`Jurusan with id: ${id} not found`);
         else {
             jurusan = this.jurusanRepository.merge(jurusan, jurusanDTO);
             return await this.jurusanRepository.save(jurusan);
         }
    }

    async delete(id: string): Promise<DeleteResult> {
        const isExist: boolean = (await this.jurusanRepository.count({id})) > 0;
        if(!isExist) throw new NotFoundException(`Jurusan with id: ${id} not found`);
        else return await this.jurusanRepository.delete(id);
    }

    async findAll(): Promise<JurusanEntity[]> {
        return await this.jurusanRepository.find();
    }
}
