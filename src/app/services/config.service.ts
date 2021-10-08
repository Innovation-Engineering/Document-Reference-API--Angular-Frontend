import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Embedded, Users} from "../domain/reference-api.interface";
import {Directory} from "../domain/directory.class";

export interface UsersItr extends ArrayLike<Users> { }

@Injectable()
export class ConfigService {
  use: Users | undefined;
  constructor(private http: HttpClient) { }
  configUrl = 'http://localhost:8080/api/users/search/findByUserType?type=Sales';
  directory: Directory = new Directory();
  getEmbeddedObject() {
    let value = this.http.get<Embedded>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
    return value;
  }
  getCountNoneAssigned() {
    return this.http.get<Number>(this.directory.findCountNoneAssigned)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  getCountAll() {
    return this.http.get<Number>(this.directory.findTotalUsers)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  getCountSector(sector:string) {
    return this.http.get<Number>(this.directory.findCountDepartment + sector)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  getUserObject() {
    let value = this.http.get<Users>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
    return value;
  }

  getManyUserObject() {
    let value = this.http.get<Users>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
    return value;
  }

  getConfigResponse(): Observable<HttpResponse<Users>> {
    return this.http.get<Users>(
      this.configUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}
