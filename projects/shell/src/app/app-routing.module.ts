import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, environment, LoginGuard } from 'commons-lib';
import { AuthGuardParameterizer } from 'projects/product-parameterization/src/app/guard/auth.guard';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';

let mfManifest = {
  "auth": "./auth/remoteEntry.js",
  "product-parameterization": "./product-parameterization/remoteEntry.js",
  "policy-management": "./policy-management/remoteEntry.js"
};

if (!environment.remote) {
  mfManifest = {
    "auth": "http://localhost:4201/remoteEntry.js",
    "product-parameterization": "http://localhost:4202/remoteEntry.js",
    "policy-management": "http://localhost:4203/remoteEntry.js",
  }
}

const routes: Routes = [
  {
    path: 'inicio',
    component: InitScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'autenticacion',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mfManifest['auth'],
        exposedModule: './Module'
      }).then(m => m.MainModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'productos',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mfManifest['product-parameterization'],
        exposedModule: './Module'
      }).then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'polizas',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mfManifest['policy-management'],
        exposedModule: './Module'
      }).then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
