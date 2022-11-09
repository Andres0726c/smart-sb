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
            {
                path: 'renovar/:id',
                loadChildren: () =>
                import(
                    './components/policy-renewal/policy-renewal.module'
                ).then((m) => m.PolicyRenewalModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
