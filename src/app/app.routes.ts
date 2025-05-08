import { Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/components/hello-world/hello-world.component';
import { JournalListComponent } from './journal/components/journal-list/journal-list.component';

export const routes: Routes = [
  { path: 'hello-world', component: HelloWorldComponent },
  { path: 'journal', component: JournalListComponent },
];
