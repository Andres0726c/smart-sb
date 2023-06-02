import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalDeleteComponent } from "./modal-delete.component";
import { ButtonModule } from "primeng/button";

@NgModule({
    declarations: [
        ModalDeleteComponent
    ],
    imports: [
        CommonModule,
        ButtonModule
    ],
    exports: [
        ModalDeleteComponent
    ]
})

export class ModalDeleteModule {}