import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JurusanDTO, JurusanResponse, JurusanResponses } from 'src/dtos/jurusan.dto';
import JurusanEntity from 'src/models/jurusan.entity';
import { ResponseRebuildInterceptor } from 'src/response/response.interceptor';
import { ApiExceptionResponse } from 'src/response/response.type';
import { JurusanService } from '../service/jurusan.service';

@Controller('jurusan')
export class JurusanController {
    constructor(
        private readonly jurusanService: JurusanService
    ) {}

    @Post()
    @ApiOperation({ description: 'API create jurusan' })
    @ApiBadRequestResponse({ description: 'Form data validation failed.', type: ApiExceptionResponse })
    @ApiCreatedResponse({ description: 'Success to create jurusan', type: JurusanResponse })
    @UseInterceptors(ResponseRebuildInterceptor)
    async create(@Body() jurusanDTO: JurusanDTO): Promise<JurusanEntity> {
        return await this.jurusanService.create(jurusanDTO);
    }

    @Get()
    @ApiOperation({ description: 'List of jurusan'})
    @ApiOkResponse({ description: 'If success get list of jurusan'})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<JurusanResponses> {
        const data = [] = await this.jurusanService.findAll();
        return {data};
    }

    @Put()
    @ApiOperation({ description: 'API update jurusan'})
    @ApiBadRequestResponse({ description: 'Form data validation failed', type: ApiExceptionResponse })
    @ApiOkResponse({ description: 'Success to update jurusan', type: JurusanResponse})
    @ApiNotFoundResponse({ description: 'Not found', type: ApiExceptionResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async update(@Body() jurusanDTO: JurusanDTO): Promise<JurusanEntity> {
       return await this.jurusanService.update(jurusanDTO.id, jurusanDTO); 
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ description: 'API delete'})
    @ApiNotFoundResponse({ description: 'Not found', type: ApiExceptionResponse})
    @ApiNoContentResponse({ description: 'Successfully delete jurusan.'})
    async delete(@Param('id') id: string): Promise<any> {
        return await this.jurusanService.delete(id);
    }

}
