import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteComponent } from './modal-delete.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('ModalDeleteComponent', () => {
    let component: ModalDeleteComponent;
    let fixture: ComponentFixture<ModalDeleteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [DynamicDialogRef, DynamicDialogConfig],
            declarations: [ModalDeleteComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ModalDeleteComponent);
        component = fixture.componentInstance;

        component.modal = {
            message: 'test',
            subMessage: 'test'
        }

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('accept', () => {
        expect(component.accept()).toBeUndefined();
    });
});
