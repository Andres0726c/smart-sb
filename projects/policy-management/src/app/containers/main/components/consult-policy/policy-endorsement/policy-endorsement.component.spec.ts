import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ConsultPolicyService } from "../services/consult-policy.service";
import { PolicyEndorsementComponent } from "./policy-endorsement.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
  } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { of, throwError } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { ResponseDTO } from "./../../../../../../../../policy-management/src/app/core/interfaces/commun/response";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('PolicyEndorsementComponent response 200', () => {

    let component: PolicyEndorsementComponent;
    let fixture: ComponentFixture<PolicyEndorsementComponent>;
    let ref: DynamicDialogRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [],
        providers: [
            PolicyEndorsementComponent,
            DynamicDialogRef,
            {
            provide: DynamicDialogConfig,
            useValue: { data: { policyNumber: 100000000001653 } },
            },
        ],
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();

        fixture = TestBed.createComponent(PolicyEndorsementComponent);
        component = fixture.componentInstance;

        const response: ResponseDTO<any> = {
        body: [
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "0",
                    applicationprocess: "Emisión",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Activo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "1",
                    applicationprocess: "Cancelación",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Inactivo",
                    observation: ""
                }
        ],
        dataHeader: {
            code: 200,
            status: 'OK',
            errorList: [],
            hasErrors: false,
            currentPage: 9,
            totalPage: 22,
            totalRecords: 106,
        },
        };
        
        jest
        .spyOn(component.consultPolicyService, 'getPolicyEndorsementByPolicyNumber')
        .mockReturnValue(of(response));
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('close modal', () => {
        expect(component.close()).toBeUndefined();
    });

    it('close Observation', () => {
        expect(component.closeObservation()).toBeUndefined();
    });

    it('view Observation', () => {
        let rowPolicyEndorsement = {
            turnOverPeriod:"Mensual",
            endorsementNumber: "1",
            applicationprocess: "Cancelación",
            issueDate: "2022-10-20 09:58:42.771",
            inceptionDate:"2022-10-20 09:58:42.771",
            expirationDate:"2022-12-31 12:53:00.000",
            status: "Inactivo",
            observation: ""
        };
        expect(component.viewObservations(rowPolicyEndorsement)).toBeUndefined();
    });

    it('view Observation null', () => {
        let rowPolicyEndorsement = {
            turnOverPeriod:"Mensual",
            endorsementNumber: "1",
            applicationprocess: "Cancelación",
            issueDate: "2022-10-20 09:58:42.771",
            inceptionDate:"2022-10-20 09:58:42.771",
            expirationDate:"2022-12-31 12:53:00.000",
            status: "Inactivo"
        };
        expect(component.viewObservations(rowPolicyEndorsement)).toBeUndefined();
    });

});

describe('PolicyEndorsementComponent response 200 > 5 rows', () => {

    let component: PolicyEndorsementComponent;
    let fixture: ComponentFixture<PolicyEndorsementComponent>;
    let ref: DynamicDialogRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [],
        providers: [
            PolicyEndorsementComponent,
            DynamicDialogRef,
            {
            provide: DynamicDialogConfig,
            useValue: { data: { policyNumber: 100000000001653 } },
            },
        ],
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();

        fixture = TestBed.createComponent(PolicyEndorsementComponent);
        component = fixture.componentInstance;

        const response: ResponseDTO<any> = {
        body: [
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "0",
                    applicationprocess: "Emisión",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Activo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "1",
                    applicationprocess: "Cancelación",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Inactivo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "0",
                    applicationprocess: "Emisión",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Activo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "1",
                    applicationprocess: "Cancelación",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Inactivo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "0",
                    applicationprocess: "Emisión",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Activo",
                    observation: ""
                },
                {
                    turnOverPeriod:"Mensual",
                    endorsementNumber: "1",
                    applicationprocess: "Cancelación",
                    issueDate: "2022-10-20 09:58:42.771",
                    inceptionDate:"2022-10-20 09:58:42.771",
                    expirationDate:"2022-12-31 12:53:00.000",
                    status: "Inactivo",
                    observation: ""
                }
        ],
        dataHeader: {
            code: 200,
            status: 'OK',
            errorList: [],
            hasErrors: false,
            currentPage: 9,
            totalPage: 22,
            totalRecords: 106,
        },
        };
        
        jest
        .spyOn(component.consultPolicyService, 'getPolicyEndorsementByPolicyNumber')
        .mockReturnValue(of(response));
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});

describe('PolicyEndorsementComponent response 400', () => {

    let component: PolicyEndorsementComponent;
    let fixture: ComponentFixture<PolicyEndorsementComponent>;
    let ref: DynamicDialogRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [],
        providers: [
            PolicyEndorsementComponent,
            DynamicDialogRef,
            {
            provide: DynamicDialogConfig,
            useValue: { data: { policyNumber: 100000000001653 } },
            },
        ],
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();

        fixture = TestBed.createComponent(PolicyEndorsementComponent);
        component = fixture.componentInstance;

        const response: ResponseDTO<string[]> = {
            body: [],
            dataHeader: {
              code: 400,
              status: 'OK',
              errorList: [],
              hasErrors: false,
              currentPage: 9,
              totalPage: 22,
              totalRecords: 106,
            },
          };
        
        jest
        .spyOn(component.consultPolicyService, 'getPolicyEndorsementByPolicyNumber')
        .mockReturnValue(of(response));
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});

describe('PolicyEndorsementComponent response error', () => {

    let component: PolicyEndorsementComponent;
    let fixture: ComponentFixture<PolicyEndorsementComponent>;
    let ref: DynamicDialogRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [],
        providers: [
            PolicyEndorsementComponent,
            DynamicDialogRef,
            {
            provide: DynamicDialogConfig,
            useValue: { data: { policyNumber: 100000000001653 } },
            },
        ],
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();

        fixture = TestBed.createComponent(PolicyEndorsementComponent);
        component = fixture.componentInstance;
        
        jest
        .spyOn(component.consultPolicyService, 'getPolicyEndorsementByPolicyNumber')
        .mockReturnValue(throwError(() => new Error('test')));
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});