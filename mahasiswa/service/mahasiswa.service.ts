import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MahasiswaEntity from 'src/models/mahasiswa.entity';
import { Mahasiswa } from 'src/models/mahasiswa.interface';
import { Repository } from 'typeorm';

@Injectable()
export class MahasiswaService {
    constructor(
        @InjectRepository(MahasiswaEntity) private readonly mahasiswaRepository: Repository<MahasiswaEntity>
        ) {}

    async create(mahasiswa: Mahasiswa): Promise<Mahasiswa> {
        return this.mahasiswaRepository.save(mahasiswa);
    }

    async update(id: string, mahasiswa: Mahasiswa): Promise<any> {
        return this.mahasiswaRepository.update(id, mahasiswa);
    }

    async delete(id: string): Promise<any> {
        return this.mahasiswaRepository.delete(id);
    }

    async findAll(): Promise<Mahasiswa[]> {
        return this.mahasiswaRepository.find();
    }

    async findOne(id: string): Promise<Mahasiswa> {
        return this.mahasiswaRepository.findOne({id});
    }   
}
