import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { RulesWizardComponent } from './rules-wizard.component';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('RulesWizardComponent', () => {
  let component: RulesWizardComponent;
  let fixture: ComponentFixture<RulesWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule,
        DynamicDialogModule
      ],
      declarations: [ RulesWizardComponent ],
      providers: [
        ProductService,
        FormBuilder,
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService,
        MessageService,
        {
          provide: MatDialog,
          useValue: new DialogMock()
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesWizardComponent);
    component = fixture.componentInstance;

    component.dataSourceModal = {
      data: {
        contextData: [
          {
            code: "prdct",
            description: "Producto",
            applctnLvl: [
                "*"
            ]
          }
        ],
        columns: [
          { field: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
          { field: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']  },
          { field: 'cdRuleType', displayValue: ['cdRuleType'], dbColumnName:['cdRuleType']  },
          { field: 'endPoint', displayValue: ['endPoint'] },
          { field: 'nmVersion', displayValue: ['nmVersion'] },
          { field: 'nmParameterList', displayValue: ['nmParameterList'] },
          { field: 'nmReturnList', displayValue: ['nmReturnList'] },
          { field: 'applicationLevel', displayValue: ['applicationLevel'] },
          { field: 'rlEngnCd', displayValue: ['rlEngnCd'] },
          { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
          { field: 'urlBs', displayValue: ['urlBs'] },
          { field: 'id', displayValue: ['id'] }
        ],
        code: 'ruleCalculationControls',
        list: [{id: 1, name: 'test'}],
        title: 'test',
        subtitle: 'test'
      }
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDetailColumn', () => {
    expect(component.getDetailColumn({}, 'name')).toBeUndefined();
  });

  it('getDetailColumn dot', () => {
    expect(component.getDetailColumn({element: {name: {description: 'test'}}}, 'name.description')).toEqual('test');
  });

  it('loadRemoteData', () => {
    const event: LazyLoadEvent = {};
    const res = {
      dataHeader: { code: 200, hasErrors: false },
      body: [
        { id: 1, name: 'test' }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadRemoteData(event)).toBeUndefined();
  });

  it('loadRemoteData global filter', () => {
    const event: LazyLoadEvent = {globalFilter: 'test'};
    const res = {
      dataHeader: { code: 200, hasErrors: false },
      body: [
        { id: 1, name: 'test' }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadRemoteData(event)).toBeUndefined();
  });
  
  it('addElements', () => {
    component.selectedElement = {id: 1, name: 'test'};
    expect(component.addElements()).toBeUndefined();
  });

  it('onRowSelect', () => {
    const event: any = {data: {nmParameterList: "{\"period\": \"string\", \"startDate\": \"string\"}"}};
    expect(component.onRowSelect(event)).toBeUndefined();
  });

  it('onRowSelect catch', () => {
    const event: any = {data: {nmParameterList: {}}};
    expect(component.onRowSelect(event)).toBeUndefined();
  });

  /*it('applyFilterGlobal', () => {
    const event: any = {target: {value: 't'}};
    expect(component.applyFilterGlobal(event, 'contains')).toBeUndefined();
  });*/

  it('paramsControls', () => {
    expect(component.paramsControls).toBeDefined();
  });
});
