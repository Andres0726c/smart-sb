export interface CancelPolicy {
    deletionDate?:       null;
    startDate?:          Date;
    endDate?:            Date;
    idPolicy?:           number;
    idCause?:            number;
    observation?:        string;
    immediate?:          number;
    applicationProcess?: string;
}