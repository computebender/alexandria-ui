import { Component } from '@angular/core';
import { JournalListComponent } from '../journal-list/journal-list.component';

@Component({
  selector: 'app-sidebar',
  imports: [JournalListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
