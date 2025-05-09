import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { JournalEntry } from '../../models/JournalEntry';
import { JournalService } from '../../services/journal.service';
import { JournalStore } from '../../store/journal.store';

@Component({
  selector: 'app-journal-list',
  imports: [MatListModule, MatCardModule, MatButtonModule],
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.scss',
})
export class JournalListComponent {
  private journalService = inject(JournalService);
  readonly journalEntries = signal<JournalEntry[]>([]);
  readonly journalStore = inject(JournalStore);

  readonly disablePreviousPage = computed(
    () => this.journalStore.isFirstPage() || this.journalStore.isLoading()
  );
  readonly disableNextPage = computed(
    () => this.journalStore.isLastPage() || this.journalStore.isLoading()
  );

  ngOnInit() {
    this.journalStore.loadEntities({ page: 1 });
  }
}
