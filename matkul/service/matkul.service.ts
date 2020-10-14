import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MahasiswaDTO } from 'src/dtos/mahasiswa.dto';
import { MatkulDTO } from 'src/dtos/matkul.dto';
import MatkulEntity from 'src/models/matkul.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatkulService {
    constructor(
        @InjectRepository(MatkulEntity) 
        private readonly matkulRepository: Repository<MatkulEntity>
    ) {}

    async crate(matkul: MatkulDTO): Promise<MatkulEntity> {
        return this.matkulRepository.save(matkul);
    }

    async update(id: string, matkulDTO: MatkulDTO): Promise<MatkulEntity> {
        let matkul: MatkulEntity = await this.matkulRepository.findOne(id);

        if(!matkul) throw new BadRequestException(`Matkul with id: ${id} not found`);
        else {
            matkul = this.matkulRepository.merge(matkul, matkulDTO);
            return await this.matkulRepository.save(matkul);
        }
    }

    async delete(id: string): Promise<any> {
        return this.matkulRepository.delete({id});
    }

    async findAll(): Promise<MatkulEntity[]> {
        return await this.matkulRepository.find();
    }
}
