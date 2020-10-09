import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Mahasiswa } from 'src/models/mahasiswa.interface';
import { MahasiswaService } from '../service/mahasiswa.service';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private readonly mahasiswaService: MahasiswaService){}

    @Post()
    async insert(@Body() mahasiswa: Mahasiswa): Promise<Mahasiswa> {
        return this.mahasiswaService.create(mahasiswa);
    }

    @Put(':id')
    async update(@Param('id')id: string, @Body()mahasiswa: Mahasiswa): Promise<Mahasiswa> {
        return this.mahasiswaService.update(id, mahasiswa);
    }

    @Delete(':id')
    async delete(@Param('id')id: string): Promise<Mahasiswa> {
        return this.mahasiswaService.delete(id);
    }

    @Get()
    async findAll(): Promise<Mahasiswa[]> {
        return this.mahasiswaService.findAll();
    }

    @Get()
    async findOne(@Param()Params): Promise<Mahasiswa> {
        return this.mahasiswaService.findOne(Params.id);
    }
}
