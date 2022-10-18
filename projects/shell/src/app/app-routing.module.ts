import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module'
      }).then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'autenticacion',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
