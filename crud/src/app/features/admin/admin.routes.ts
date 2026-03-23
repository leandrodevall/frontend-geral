import { Routes } from '@angular/router';
import { CreateEvent } from './pages/create-event';
import { authGuard } from '../../core/guards/auth-guard/auth-guard';

export const adminRoutes: Routes = [
  { path: 'criacao', component: CreateEvent, canActivate: [authGuard] },
];
