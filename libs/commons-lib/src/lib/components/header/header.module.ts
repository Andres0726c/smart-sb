import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from './header.component';
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        MenubarModule,
        MenuModule,
        ProgressSpinnerModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule{}