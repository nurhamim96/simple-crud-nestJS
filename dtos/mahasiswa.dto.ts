import { HttpModuleOptionsFactory } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import JurusanEntity from "src/models/jurusan.entity";
import MahasiswaEntity from "src/models/mahasiswa.entity";
import MatkulEntity from "src/models/matkul.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.inteface";

export class MahasiswaDTO {

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly nik: number;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly jurusanId: JurusanEntity;

    @ApiProperty()
    readonly matkulId: MatkulEntity;
}

export class MahasiswaResponse implements IApiResponse {
    status: ResponseStatus;
    data: MahasiswaDTO;
}

export class MahasiswaResponses {
    status?: ResponseStatus;
    data: MahasiswaEntity | MahasiswaEntity[];
    paging?: PagingData;
}

export class MahasiswaQueryDTO {
    term?: string;
    order?: 'name';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class MahasiswaQueryResult {
    result: MahasiswaEntity[] | MahasiswaEntity;
    totalRows: number;
}