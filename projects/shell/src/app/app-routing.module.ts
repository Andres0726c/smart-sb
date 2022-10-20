import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'commons-lib';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InitScreenComponent
  },
  {
    path: 'autenticacion',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.mfManifest['auth'],
        exposedModule: './Module'
      }).then(m => m.MainModule)
  },
  /*{
    path: 'gestion-polizas',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.mfManifest['policy-management'],
        exposedModule: './Module'
      }).then(m => m.PolcyManagement)
  },*/
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
