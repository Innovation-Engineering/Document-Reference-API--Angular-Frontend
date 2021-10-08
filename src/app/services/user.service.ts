import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Embedded, User, Users} from "../domain/reference-api.interface";
import {Directory} from "../domain/directory.class";

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};


@Injectable()
export class UserService {
  use: Users | undefined;
  directory: Directory = new Directory();
  constructor(private http: HttpClient) { }
  getEmbeddedObject(sector?:string) {
    let params:HttpParams;
    switch (sector){
      case 'development':
        params = new HttpParams().append('type', 'Business Development');
        return this.getEmbedded(params);
        break;
      case 'marketing':
        params = new HttpParams().append('type', 'Marketing');
        return this.getEmbedded(params);
        break;
      case 'sales':
        params = new HttpParams().append('type', 'Sales');
        return this.getEmbedded(params);
        break;
      default:
        return this.http.get<Embedded>(this.directory.accessAPI(this.directory.findAll))
          .pipe(
            retry(3),
            catchError(this.handleError)
          );
        break;
    }
  }
  getEmbedded(params?:HttpParams):Observable<any>{
    return this.http.get<Embedded>(this.directory.accessAPI(this.directory.findByDepartmentT),{params} )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  //////// Save methods //////////
  /** POST: add a new hero to the database */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.directory.accessAPI(this.directory.createUser), user, httpOptions)
      .pipe(catchError(this.handleError)
      );
  }
  editUser(user: User): Observable<User> {
    return this.http.put<User>(this.directory.accessAPI(this.directory.editUser, '/'+ user.id!.toString()+ '/user'), user, httpOptions)
      .pipe(catchError(this.handleError)
      );
  }
  deleteUser(id:string): Observable<unknown> {
    return this.http.delete(this.directory.accessAPI(this.directory.editUser, '/'+ id + '/user'), httpOptions)
      .pipe(catchError(this.handleError)
      );
  }
  patchUser(supId:string, subId:string): Observable<unknown> {
    return this.http.patch(this.directory.accessAPI(this.directory.appointUser, '/'+ subId + '/user/patch?leaderId='+supId), httpOptions)
      .pipe(catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Users>> {
    return this.http.get<Users>(
      this.directory.findByID, { observe: 'response' });
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
