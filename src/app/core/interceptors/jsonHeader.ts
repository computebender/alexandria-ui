import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function jsonHeader(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  let headers = req.headers.set('Accept', 'application/json');

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    // Check if a Content-Type is already set, to avoid overwriting e.g. for FormData
    if (!headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }
  }
  const reqWithHeader = req.clone({ headers });
  return next(reqWithHeader);
}
