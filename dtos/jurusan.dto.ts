import { ApiProperty } from "@nestjs/swagger";
import JurusanEntity from "src/models/jurusan.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.inteface";


export class JurusanDTO {

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly jurusan: string;
}

export class JurusanResponse implements IApiResponse {
    status: ResponseStatus;
    data: JurusanDTO;
}

export class JurusanResponses {
    status?: ResponseStatus;
    data: JurusanEntity | JurusanEntity[];
    paging?: PagingData;
}

export class JurusanQueryDTO {
    term?: string;
    order?: 'jurusan';
    sort?: 'asc' | 'desc' = 'asc';
    page?: number;
    rowsPerPage?: number;
}

export class JurusanQueryResult {
    result: JurusanEntity[] | JurusanEntity;
    totalRows: number;
}