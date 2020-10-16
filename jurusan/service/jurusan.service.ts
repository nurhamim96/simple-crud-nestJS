import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JurusanDTO, JurusanQueryDTO, JurusanQueryResult } from 'src/dtos/jurusan.dto';
import JurusanEntity from 'src/models/jurusan.entity';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class JurusanService {
    constructor(
        @InjectRepository(JurusanEntity)
        private readonly jurusanRepository: Repository<JurusanEntity>
    ) {}

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

    async findWithPaging(queryParams: JurusanQueryDTO): Promise<JurusanQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page - 1)) : 0;
        let query: SelectQueryBuilder<JurusanEntity> = this.jurusanRepository.createQueryBuilder('jurusanAlias');

        if(queryParams.term) {
            let { term } = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('jurusanAlias.jurusan LIKE : term,', {term}); 
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const orderCols: { [key: string]: string } = {
                jurusan: 'jurusanAlias.jurusan',
            };
            query = query.orderBy(orderCols[queryParams.order], sort);
        } else {
            query = query.orderBy('jurusanAlias.jurusan', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [JurusanEntity[], number] = await query.getManyAndCount();

        return {
            result: result[0],
            totalRows: result[1]
        }
    }
}
