export enum OrderType {
    ASC,
    DESC
}

export interface ListBaseParam {
    pageSize?: number;
    pageNum?: number;
    orderType?: OrderType;
    orderBy?: string;
}
