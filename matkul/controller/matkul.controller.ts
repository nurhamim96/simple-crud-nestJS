import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MatkulDTO, MatkulResponse, MatkulResponses } from 'src/dtos/matkul.dto';
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

    @Get('paging')
    @ApiOperation({description: 'API search matkul'})
    @ApiOkResponse({description: 'If success search matkul', type: MatkulResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findWithPaging(
        @Query('term') term?: string,
        @Query('order') order?: 'matkul',
        @Query('sort') sort: 'asc' | 'desc' = 'asc',
    ): Promise<MatkulResponses> {
        const { result: data = [] } = await this.matkulService.findWithPaging({term, order, sort, page: 1, rowsPerPage: 3 })

        return {data};
    }

    @Get()
    @ApiOperation({description: 'API List matkul'})
    @ApiOkResponse({description: 'If success get list of matkul', type: MatkulResponse})
    @UseInterceptors(ResponseRebuildInterceptor)
    async findAll(): Promise<MatkulResponses> {
        const data = [] = await this.matkulService.findAll();
        return {data};
    }
}
