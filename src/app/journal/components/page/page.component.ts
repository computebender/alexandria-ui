import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JournalListComponent } from '../journal-list/journal-list.component';

@Component({
  selector: 'app-page',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    JournalListComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  handleToggleSidenav() {
    this.sidenav.toggle();
  }
}
