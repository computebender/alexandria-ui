import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JournalStore } from '../../store/journal.store';

@Component({
  selector: 'app-create-journal-entry',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-journal-entry.component.html',
  styleUrl: './create-journal-entry.component.scss',
})
export class CreateJournalEntryComponent {
  readonly journalStore = inject(JournalStore);

  createJournalEntryForm = new FormGroup({
    draftEntry: new FormControl(''),
  });

  handleOnSubmit() {
    if (!this.createJournalEntryForm.valid) {
      return;
    }

    const draftEntry = this.createJournalEntryForm.value.draftEntry;

    if (!draftEntry) {
      return;
    }

    this.journalStore.createEntry({
      draft_text: draftEntry,
    });
  }
}
