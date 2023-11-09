import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRes } from '../shared/UserRes.model';
import { catchError, map, throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class apiService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  readonly baseURL = 'http://localhost:3000/api/reservations/'

  reservationForm = this.fb.group({
    _id: [''],
    firstName: ['', Validators.required],
     lastName: [''],
     address: ['', Validators.required],
     citystate: ['', Validators.required],
     zip: [''],
     phoneNumber: ['', Validators.required],
     email: ['', Validators.required],
     numNights: ['', Validators.required],
     numRooms : [''],
     numGuest : [''],
     catRates: ['', Validators.required],
     arrivalDate: ['', Validators.required],
  })

  postReservation(){
    return this.http.post(this.baseURL, this.reservationForm.value)
    .pipe(catchError(this.handleError))
  }

  putReservation(){
    return this.http.put(this.baseURL + this.reservationForm.get('_id')?.value, this.reservationForm.value)
    .pipe(catchError(this.handleError))
  }

  deleteReservation(_id: string){
    return this.http.delete(this.baseURL + _id)
    .pipe(catchError(this.handleError))
  }

  getReservationId(_id: string){
    return this.http.get<UserRes>(this.baseURL + _id)
    .pipe(catchError(this.handleError))
  }

  fetchReservationList(){
    return this.http.get<UserRes[]>(this.baseURL)
    .pipe(catchError(this.handleError))
    .pipe(
      map(reservations => {
        return reservations.map( data => {
          return {
            ...data
          }
        })
    }))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
