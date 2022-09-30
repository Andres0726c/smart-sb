import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyManagementComponent } from './policy-management.component';

const routes: Routes = [
    {
        path: '',
        component: PolicyManagementComponent,
        children: [
            {
                path: 'consulta',
                loadChildren: () => import('../../containers/policy-management/components/consult-policy/consult-policy.module').then(m => m.ConsultPolicyModule)
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyManagementRoutingModule { }
