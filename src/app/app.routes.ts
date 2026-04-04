import { Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main';
import { CatalogComponent } from './components/pages/catalog/catalog';
import { ProductComponent } from './components/pages/product/product';
import { OrderComponent } from './components/pages/order/order';

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
