import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isNull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  baseURL = 'https://api.spaceXdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  public getAllPrograms(): Observable<any> {
    const url = `${this.baseURL}?limit=100`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  public getSelectedPrograms(selectedFilters: any): Observable<any> {
    Object.keys(selectedFilters).map(key => isNull(selectedFilters[key]) && delete selectedFilters[key]);

    const params = {
      limit: 100,
      ...selectedFilters
    };
    return this.http.get(this.baseURL, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }


  public handleError(error): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
