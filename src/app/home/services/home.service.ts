import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  basePath = 'http://localhost:3000/request';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  getAll() {
    return this.http.get(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(id: any) {
    return this.http.get(`http://localhost:3000/clients/${id}/request`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  deleteById(id: any) {
    return this.http.delete(`http://localhost:3000/request/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}