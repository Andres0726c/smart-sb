import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'consulta',
                loadChildren: () =>
                import(
                    './components/consult-policy/consult-policy.module'
                ).then((m) => m.ConsultPolicyModule)
            },
            // {
            //     path: 'modificar/:id',
            //     loadChildren: () =>
            //     import(
            //         './components/modify-policy/modify-policy.module'
            //     ).then((m) => m.ModifyPolicyModule)
            // }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
