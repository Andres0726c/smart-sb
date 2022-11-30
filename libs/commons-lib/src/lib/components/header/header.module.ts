import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from './header.component';
import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import { CommonsLibModule } from "../../commons-lib.module";

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        MenubarModule,
        MenuModule,
        CommonsLibModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule{}