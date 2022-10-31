import { ElementTableSearch } from "./ElementTableSearch.model";

export interface ModalConfig
{
    title                      : string;
    description                : string;
    displayedColumns           : string[];
    service                    : string;
    sendData                   : ElementTableSearch[];
    isMultiSelection           : boolean;
    modalHeader                : ModalHeader[];
    hasPaginator: boolean;
    parameter?: string;
    
    setDataService(element:any): ElementTableSearch;
}


export interface ModalHeader
{
    tagId: string;
    columnLabel: string;
}