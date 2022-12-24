import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalResponseRulesComponent } from './modal-response-rules.component';


describe('ModalResponseRulesComponent', () => {
  let component: ModalResponseRulesComponent;
  let fixture: ComponentFixture<ModalResponseRulesComponent>;
  let ref: DynamicDialogRef, config: DynamicDialogConfig, dialogService: DialogService, messageService: MessageService;
  let formBuilderMock = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      RouterTestingModule.withRoutes([]),
      HttpClientTestingModule
    ],
      declarations: [ ModalResponseRulesComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ReactiveFormsModule,
        FormBuilder,
        DynamicDialogRef,
        DialogService,
        MessageService,
        DynamicDialogConfig,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },

      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();


    dialogService = TestBed.inject(DialogService);
    messageService = TestBed.inject(MessageService);
    ref=TestBed.inject(DynamicDialogRef);
    fixture = TestBed.createComponent(ModalResponseRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
