import { Component, inject, signal } from '@angular/core';
import { JournalEntry } from '../../models/JournalEntry';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-journal-list',
  imports: [],
  templateUrl: './journal-list.component.html',
  styleUrl: './journal-list.component.scss',
})
export class JournalListComponent {
  private journalService = inject(JournalService);
  readonly journalEntries = signal<JournalEntry[]>([]);

  ngOnInit() {
    this.journalService.getJournalEntries().subscribe({
      next: (response) => {
        this.journalEntries.set(response.results);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
