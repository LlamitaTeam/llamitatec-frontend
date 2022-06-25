import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  basePath = 'http://localhost:8080/api/v1/clients';
  basePath3= 'http://localhost:8080/api/v1/employees';
  basePath2 = 'http://localhost:8080/api/v1/requests'; 
  basePath4 = 'http://localhost:8080/api/v1/services'; 
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

  getCurrentUserType(){
    let currentUserString= localStorage.getItem('currentUser')
    if(currentUserString){
      //console.log(`current user:' ${currentUserString}`)
      let currentUser = (JSON.parse(currentUserString));
      //console.log(currentUser)
      return currentUser.typeuser;
    }else return null
  }

  getById(id: any) {
    if(this.getCurrentUserType()=='employee'){
      return this.http.get(`${this.basePath3}/users/2`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    else{
      return this.http.get(`${this.basePath}/1`, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  }

  getClient(id: any){
    return this.http.get(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getByEmployeeId(id: any) {
    return this.http.get(`${this.basePath3}/users/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  createRequest(clientId:any,employeeId:any,serviceId:any,item: object):Observable<object> {
    return this.http.post(`${this.basePath2}/${clientId}/${employeeId}/${serviceId}`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAllRequest() {
    return this.http.get(this.basePath2, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateProfile(id: number, item: object){
    if(this.getCurrentUserType()=='employee'){
      return this.http.put(`${this.basePath3}/1`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    else{
      return this.http.put(`${this.basePath}/1`,item,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
  }

}
