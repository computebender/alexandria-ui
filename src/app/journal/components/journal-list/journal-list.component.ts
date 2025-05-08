import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { JournalEntry } from '../../models/JournalEntry';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-journal-list',
  imports: [MatListModule, MatCardModule],
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
