import { SrvRecord } from "dns";
import MatkulEntity from "src/models/matkul.entity";
import { PagingData, ResponseStatus } from "src/response/response.class";
import { IApiResponse } from "src/response/response.inteface";


export class MatkulDTO {

    readonly id: string;

    readonly matkul: string;
}

export class MatkulResponse implements IApiResponse {
    status: ResponseStatus;
    data: MatkulDTO;
}

export class MatkulResponses {
    status?: ResponseStatus;
    data: MatkulEntity | MatkulEntity[];
    paging?: PagingData;
}