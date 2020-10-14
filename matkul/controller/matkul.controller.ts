import { Body, Controller, Delete, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { type } from 'os';
import { MatkulDTO, MatkulResponse, MatkulResponses } from 'src/dtos/matkul.dto';
import MahasiswaEntity from 'src/models/mahasiswa.entity';
import MatkulEntity from 'src/models/matkul.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { MatkulService } from '../service/matkul.service';

@Controller('matkul')
export class MatkulController {
    constructor(private readonly matkulService: MatkulService){}

    @Post()
    @ApiOperation({ description: "API create matkul"})
    @ApiBadRequestResponse({ description: 'From data valid failed.', type: ApiExceptionResponse})
    @ApiCreatedResponse({ description: 'Success to create matkul', type: MatkulResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() matkul: MatkulDTO): Promise<MatkulEntity> {
        return this.matkulService.crate(matkul);
    }

    @Put(':id')
    @ApiOperation({description: 'Api update matkul'})
    @ApiBadRequestResponse(({description: 'Form data valid failed.', type: ApiExceptionResponse}))
    @ApiOkResponse({description: 'Success to update matkul.', type: MatkulResponse})
    @ApiNotFoundResponse({description: 'Not found', type: ApiExceptionResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Param('id')id: string, @Body() matkul: MatkulDTO): Promise<MatkulEntity> {
        return await this.matkulService.update(id, matkul);
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({description: 'API delete matkul'})
    @ApiNotFoundResponse({description: 'Not found', type: ApiExceptionResponse})
    @ApiNoContentResponse({description: 'Successfully delete matkul'})
    async delete(@Param('id')id: string): Promise<any> {
        return this.matkulService.delete(id);
    }

    async findAll(): Promise<MatkulResponses> {
        const data = [] = await this.matkulService.findAll();
        return {data};
    }
}
