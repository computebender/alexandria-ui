import { Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/components/hello-world/hello-world.component';
import { CreateJournalEntryComponent } from './journal/components/create-journal-entry/create-journal-entry.component';

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'journal', component: CreateJournalEntryComponent },
  { path: '', redirectTo: '/journal', pathMatch: 'full' },
];
