import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../../core/models/PaginatedResult';
import { CreateJournalEntry, JournalEntry } from '../models/JournalEntry';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiHost = environment.apiHost;
  private http = inject(HttpClient);

  constructor() {}

  public getJournalEntries(
    page?: number,
    pageSize?: number,
    url?: string | null
  ): Observable<PaginatedResult<JournalEntry>> {
    if (url) {
      const apiEndpoint = this.apiHost + url;
      return this.http.get<PaginatedResult<JournalEntry>>(apiEndpoint);
    }

    const apiEndpoint = `${this.apiHost}/api/journal-entries/`;

    let params = new HttpParams();

    if (page !== undefined) {
      params = params.append('page', page.toString());
    }

    if (pageSize !== undefined) {
      params = params.append('page_size', pageSize.toString());
    }

    return this.http.get<PaginatedResult<JournalEntry>>(apiEndpoint, {
      params,
    });
  }

  public createJournalEntry(
    newEntry: CreateJournalEntry
  ): Observable<JournalEntry> {
    const apiEndpoint = `${this.apiHost}/api/journal-entries/`;
    return this.http.post<JournalEntry>(apiEndpoint, newEntry);
  }
}
