import { Routes } from '@angular/router';
import { UserAccount } from './pages/user-account/user-account';
import { UserOrders } from './pages/user-orders/user-orders';
import { UserInformation } from './pages/user-information/user-information';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserAccount,
  },
  {
    path: 'meus-pedidos',
    component: UserOrders,
  },
  {
    path: 'dados-cadastrais',
    component: UserInformation,
  },
];
