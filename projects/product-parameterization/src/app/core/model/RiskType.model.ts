import { Clauses } from "./Clauses.model";

export interface servicePlans {
    id: string;
    nmName: string;
    dsDescription: string;
    clauses?: Clauses[];
}