import { Routes } from '@angular/router';
import { CreateEvent } from './features/admin/pages/create-event';
import { authGuard } from './core/guards/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/events/events.router').then((r) => r.eventsRoutes),
  },
  {
    path: 'minha-conta',
    loadChildren: () => import('./features/user/user.routes').then((r) => r.userRoutes),
  },
  {
    path: 'administrador',
    loadChildren: () => import('./features/admin/admin.routes').then((r) => r.adminRoutes),
  },
  { path: '**', redirectTo: '' },
];
