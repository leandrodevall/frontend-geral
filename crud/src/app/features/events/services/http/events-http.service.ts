import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { DevFestEvent } from '../../../../shared/models/event.model';
import { finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventHttpService {
  private eventUrl = environment.API_TICKETS;
  private readonly http = inject(HttpClient);
  private readonly isLoading = signal(false);
  readonly selectIsLoading = computed(() => this.isLoading());

  getEventsResource(query: Signal<string>) {
    return httpResource<DevFestEvent[]>(() => {
      const q = query();
      return q ? `${this.eventUrl}/?q=${q}` : this.eventUrl;
    });
  }

  getEventResource(id: Signal<string>) {
    return httpResource<DevFestEvent>(() => {
      const eventId = id();
      return `${this.eventUrl}/${eventId}`;
    });
  }

  createEvent(event: Omit<DevFestEvent, 'id'>) {
    this.isLoading.set(true);
    return this.http.post<DevFestEvent>(this.eventUrl, event).pipe(
      finalize(() => {
        this.isLoading.set(false);
      }),
    );
  }

  deleteEvent(id: string) {
    return this.http.delete<void>(`${this.eventUrl}/${id}`);
  }
}
