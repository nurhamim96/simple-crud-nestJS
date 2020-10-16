import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatkulDTO, MatkulQueryDTO, MatkulQueryResult } from 'src/dtos/matkul.dto';
import MatkulEntity from 'src/models/matkul.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

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

    async findWithPaging(queryParams: MatkulQueryDTO): Promise<MatkulQueryResult> {
        const offset: number = queryParams.page > 1 ? (queryParams.rowsPerPage * (queryParams.page -1)) : 0;
        let query: SelectQueryBuilder<MatkulEntity> = this.matkulRepository.createQueryBuilder('matkulAlias');

        if(queryParams.term) {
            let { term } = queryParams;
            term = `%${term}%`;
            query = query
                .andWhere('matkulAlias.matkul LIKE : term,', {term});
        }

        if(queryParams.order && queryParams.sort) {
            const sort: 'ASC' | 'DESC' = queryParams.sort.toUpperCase() as 'ASC' | 'DESC';
            const orderCols: { [key: string]: string } = {
                matkul: 'matkulAlias.matkul',
            };
            query = query.orderBy(orderCols[queryParams.order], sort);
        } else {
            query = query.orderBy('matkulAlias.matkul', 'ASC');
        }

        query.offset(offset);
        query.limit(queryParams.rowsPerPage);

        const result: [MatkulEntity[], number] = await query.getManyAndCount();


        return {
            result: result[0],
            totalRows: result[1]
        }
    }
}
