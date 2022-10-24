import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'menu-productos', 
        loadChildren: () => import('../../containers/main-screen-product/main-screen-product.module').then(m => m.MainScreenProductModule),
      },
      /*{
        path: 'parametrizador-producto',
        loadChildren: () => import('../../containers/products-management/screen-management/screen-management.module').then(m => m.ScreenManagementModule),
      },*/
      {
        path: '**',
        redirectTo: 'menu-productos',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
