import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MahasiswaDTO, MahasiswaResponse, MahasiswaResponses } from 'src/dtos/mahasiswa.dto';
import MahasiswaEntity from 'src/models/mahasiswa.entity';
import { PagingData } from 'src/response/response.class';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { MahasiswaService } from '../service/mahasiswa.service';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private readonly mahasiswaService: MahasiswaService){}

    @Post()
    @ApiOperation({ description: 'API Create Mahasiswa' })
    @ApiBadRequestResponse({ description: 'Form data validation failed.', type: ApiExceptionResponse })
    @ApiCreatedResponse({ description: 'Success to Create Mahasiswa', type: MahasiswaResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async insert(@Body() mahasiswa: MahasiswaDTO): Promise<MahasiswaEntity> {
        return this.mahasiswaService.create(mahasiswa);
    }

    @Put(':id')
    @ApiOperation({ description: 'Api update mahasiswa'})
    @ApiBadRequestResponse({ description: 'Form data validation failed', type: ApiExceptionResponse })
    @ApiOkResponse({ description: 'Success to update mahasiswa', type: MahasiswaResponse })
    @ApiNotFoundResponse({ description: 'Not found', type: ApiExceptionResponse })
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Param('id')id: string, @Body() mahasiswa: MahasiswaDTO): Promise<MahasiswaEntity> {
        return await this.mahasiswaService.update(id, mahasiswa);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ description: 'API delete mahasiswa'})
    @ApiNotFoundResponse({ description: 'Not Found', type: ApiExceptionResponse })
    @ApiNoContentResponse({ description: 'Successfully delete mahasiswa.' })
    async delete(@Param('id')id: string): Promise<any> {
        return this.mahasiswaService.delete(id);
    }

    @Get()
    @ApiOperation({ description: 'API List Mahasiswa' })
    @ApiOkResponse({ description: 'If success get list of Mahasiswa', type: MahasiswaResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<MahasiswaResponses> {
        const data = [] = await this.mahasiswaService.findAll();
        return {data};
    }

    @Get('search')
    @ApiOperation({description: 'API search mahasiswa'})
    @ApiOkResponse({description: 'If success search mahasiswa', type: MahasiswaResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async search(
        @Query('term') term?: string,
        @Query('order') order?: 'type' | 'name',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<MahasiswaResponses> {
        const { result: data = [] } = await this.mahasiswaService.find({term, sort, page: 1, rowsPerPage: 3 });

        return {data};
    }
}
