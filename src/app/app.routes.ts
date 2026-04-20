import { Routes } from '@angular/router';
import { MainComponent } from './views/home/main/main';
import { CatalogComponent } from './views/home/catalog/catalog';
import { ProductComponent } from './views/product/product';
import { OrderComponent } from './views/order/order';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];
