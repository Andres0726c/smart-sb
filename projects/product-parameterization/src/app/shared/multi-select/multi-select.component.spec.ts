import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [],
      providers: [MultiSelectComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    component = TestBed.inject(MultiSelectComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnChanges();
    expect(component.listOptions).toBeDefined();
  });

  it('masterToggle when allSelected is true', () => { 
    component.allSelected = true;
    component.masterToggle()
    expect(component.selectedOptions.value).toEqual([]);
    expect(component.allSelected).toBeFalsy();
  });

  it('masterToggle when allSelected is false', () => { 
    component.allSelected = false;
    component.dataOptions = ['test', 'test2']
    component.masterToggle()
    expect(component.selectedOptions.value.length).toBeGreaterThan(0)
    expect(component.allSelected).toBeTruthy();
  });

  it('change allSelected when selectOptions and dataOptions are equal', () => { 
    component.selectedOptions = {value: ['test', 'test2'] } as FormControl;
    component.dataOptions = ['test', 'test2']
    component.toggleOptionAll()
    expect(component.allSelected).toBeTruthy();
  });
  it('change allSelected when selectOptions and dataOptions are different', () => { 
    component.selectedOptions = {value: ['test'] } as FormControl;
    component.dataOptions = ['test', 'test2']
    component.toggleOptionAll()
    expect(component.allSelected).toBeFalsy();
  });

  it('add option when using the search filter', () => { 
    component.fieldSearch = 'abcd'
    component.cloneSelectedOptions = ['test', 'test2']
    component.selectOption('test3')
    expect(component.cloneSelectedOptions).toEqual(['test', 'test2', 'test3'])
    expect(component.selectedOptions.value).toEqual(component.cloneSelectedOptions)
  });

  it('remove option when using the search filter', () => { 
    component.fieldSearch = 'abcd'
    component.cloneSelectedOptions = ['test', 'test2', 'test3']
    component.selectOption('test3')
    expect(component.cloneSelectedOptions).toEqual(['test', 'test2'])
    expect(component.selectedOptions.value).toEqual(component.cloneSelectedOptions)
  });

  it('add or remove option when search filter is not used', () => { 
    component.fieldSearch = ''
    component.selectedOptions = {value: ['test', 'test2'] } as FormControl;
    component.selectOption('')
    expect(component.selectedOptions.value).toEqual(component.cloneSelectedOptions)
  });

  it('removeOption', () => { 
    component.selectedOptions.setValue( ['test', 'test2'] )
    component.removeOption()
    expect(component.selectedOptions.value).toEqual(['test2'])
    
  });
  it('applyFilter', () => { 
    component.fieldSearch = 'dos' ;
    component.dataOptions = ['uno','dos','tres']
    component.applyFilter()
    expect(component.listOptions).toEqual(['dos']);
  });

  it('reset elements when close or open multiselect', () => { 
    component.fieldSearch = 'dos' ;
    component.dataOptions = ['uno','dos','tres']
    component.cloneSelectedOptions = ['tres', 'uno']
    component.reset()
    expect(component.listOptions).toEqual(component.dataOptions);
    expect(component.fieldSearch).toEqual('');
    expect(component.cloneSelectedOptions).toEqual(['uno','tres'])
  });
});
