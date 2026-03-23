import { Routes } from '@angular/router';
import { EventList } from './pages/event-list/event-list';
import { EventDetails } from './pages/event-details/event-details';

export const eventsRoutes: Routes = [
  { path: '', component: EventList },
  { path: 'event/:id', component: EventDetails },
];
