import { TableProps } from "@niagads/table";
export interface Collection {
    route: string;
    name: string;
    label?: string;
    description?: string;
}

export interface APIResponse {
    request: any;
    pagination: any;
    response: TableProps;
}
