import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InitScreenComponent
  },
  {
    path: 'gestion-polizas',
    loadChildren: () =>
      import('policy-management/Module').then(
        (m) => m.PolicyManagementModule
      ),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
