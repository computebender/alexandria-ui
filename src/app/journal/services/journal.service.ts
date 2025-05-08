import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../../core/models/PaginatedResult';
import { JournalEntry } from '../models/JournalEntry';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = `${environment.apiHost}/api/journal-entries/`;
  private http = inject(HttpClient);

  constructor() {}

  public getJournalEntries(): Observable<PaginatedResult<JournalEntry>> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.get<PaginatedResult<JournalEntry>>(
      this.apiUrl,
      httpOptions
    );
  }
}
