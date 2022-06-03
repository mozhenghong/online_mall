export enum OrderType {
    ASC,
    DESC
}

export interface BasePage {
    pageSize: number;
    pageNum: number;
}

export interface ListBaseParam extends BasePage {
    orderType?: OrderType;
    orderBy?: string;
}
