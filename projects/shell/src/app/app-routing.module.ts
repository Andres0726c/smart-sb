import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'commons-lib';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';

let mfManifest = {
  "auth": "./auth/remoteEntry.js",
  "policy-management": "./policy-management/remoteEntry.js"
};

if (!environment.remote) {
  mfManifest = {
    "auth": "http://localhost:4201/remoteEntry.js",
    "policy-management": "http://localhost:4202/remoteEntry.js",
  }
}

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
        remoteEntry: mfManifest['auth'],
        exposedModule: './Module'
      }).then(m => m.MainModule)
  },
  {
    path: 'gestion-polizas',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mfManifest['policy-management'],
        exposedModule: './Module'
      }).then(m => m.PolicyManagementModule)
  },
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
