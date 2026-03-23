import { Component, inject, signal } from '@angular/core';
import { EventCard } from '../../components/event-card/event-card';
import { SearchBar } from '../../components/event-search-bar/search-bar';
import { EventHttpService } from '../../services/http/events-http.service';

@Component({
  selector: 'app-event-list',
  imports: [SearchBar, EventCard],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
      <app-search-bar [(query)]="searchQuery" />
      <div class="text-gray-500 mt-2">Searching for: {{ searchQuery() }}</div>
    </div>

    @if (events.error()) {
      <div class="bg-red-100 tex-red-700 p-4 rounded-lg mb-6">Failed do load events</div>
    }

    @if (events.isLoading()) {
      <div class="text-center py-12 text-gray-500 animate-pulse">Loading...</div>
    }

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @if (events.hasValue()) {
        @for (event of events.value(); track event.id) {
          <app-event-card
            [id]="event.id"
            [title]="event.title"
            [image]="event.image"
            [date]="event.date"
            (delete)="deleteEvent(event.id)"
          />
        } @empty {
          <span class="col-span-3 text-center text-gray-500">No events found</span>
        }
      }
    </div>
  `,
})
export class EventList {
  readonly eventsService = inject(EventHttpService);
  searchQuery = signal('');
  readonly events = this.eventsService.getEventsResource(this.searchQuery);

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        this.events.reload();
      },
      error() {
        alert('Could not delete event');
      },
    });
  }
}
