import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from 'commons-lib';

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
                    ).then((m) => m.PolicyRenewalModule),
                    canActivate: [AuthGuard]
            },
            {
                path: 'modificar/:id',
                loadChildren: () =>
                    import(
                        './components/modify-policy/modify-policy.module'
                    ).then((m) => m.ModifyPolicyModule),
                    canActivate: [AuthGuard]
            },
            {
                path: 'sincronizar',
                loadChildren: () =>
                    import(
                        './components/sync-policy-failed/sync-policy-failed.module'
                    ).then((m) => m.SyncPolicyFailedModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
