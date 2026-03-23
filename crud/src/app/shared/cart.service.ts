import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

interface TicketEntry {
  id: string;
  eventId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly ticketUrl = environment.API_TICKETS;

  private readonly ticketIds = signal<string[]>([]);

  readonly count = computed(() => this.ticketIds().length);

  constructor() {
    this.loadTickets();
  }

  private loadTickets(): void {
    this.http.get<TicketEntry[]>(this.ticketUrl).subscribe({
      next: (data) => {
        const ids = data.map((t) => t.eventId);
        this.ticketIds.set(ids);
      },
    });
  }

  addTicket(eventId: string) {
    const previusIds = this.ticketIds();
    this.ticketIds.update((tickets) => [...tickets, eventId]);
    this.http.post(this.ticketUrl, { eventId }).subscribe({
      next: () => console.log('success'),
      error: () => {
        this.ticketIds.set(previusIds);
      },
    });
  }
}
