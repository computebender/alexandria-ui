import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelloWorldService {
  private apiUrl = `${environment.apiHost}/api/hello-world/`;
  private http = inject(HttpClient);

  constructor() {}

  public getHelloWorldMessage(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.get<any>(this.apiUrl, httpOptions);
  }
}
