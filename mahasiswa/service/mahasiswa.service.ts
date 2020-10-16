import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MahasiswaDTO, MahasiswaQueryDTO, MahasiswaQueryResult } from 'src/dtos/mahasiswa.dto';
import MahasiswaEntity from 'src/models/mahasiswa.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class MahasiswaService {
    constructor(
        @InjectRepository(MahasiswaEntity) private readonly mahasiswaRepository: Repository<MahasiswaEntity>
        ) {}

    async create(mahasiswa: MahasiswaDTO): Promise<MahasiswaEntity> {
        return this.mahasiswaRepository.save(mahasiswa);
    }

    async update(id: string, mahasiswaDTO: MahasiswaDTO): Promise<MahasiswaEntity> {
        let mahasiswa: MahasiswaEntity = await this.mahasiswaRepository.findOne(id);

        if (!mahasiswa) throw new BadRequestException(`Mahasiswa with id: ${id} not found`);
        else {
            mahasiswa = this.mahasiswaRepository.merge(mahasiswa, mahasiswaDTO);
            return await this.mahasiswaRepository.save(mahasiswa);
        }
    }

    async delete(id: string): Promise<any> {
        return this.mahasiswaRepository.delete({id});
    }

    async findAll(): Promise<MahasiswaEntity[]> {
        return await this.mahasiswaRepository.find({relations: ['jurusanId', 'matkulId']});
    }

    async findWithPaging(queryParams: MahasiswaQueryDTO): Promise<MahasiswaQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<MahasiswaEntity> = this.mahasiswaRepository.createQueryBuilder('mahasiswaAlias').innerJoinAndSelect('mahasiswaAlias.jurusanId', 'jurusan').innerJoinAndSelect('mahasiswaAlias.matkulId', 'matkul');

        if(queryParams.term) {
            let { term } = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('mahasiswaAlias.name LIKE : term', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const orderCols: { [key: string]: string } = {
                name: 'mahasiswaAlias.name',
            };
            query = query.orderBy(orderCols[queryParams.order], sort);
        } else {
            query = query.orderBy('mahasiswaAlias.name', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [MahasiswaEntity[], number] = await query.getManyAndCount(); 

        return {
            result: result[0],
            totalRows: result[1],
            
        }
    }
}
