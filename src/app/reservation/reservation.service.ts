import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
private reservations:Reservation[] = [];
private apiUrl = "https://667009f30900b5f8724927c3.mockapi.io/flights"
  constructor(private http:HttpClient) { 
  }

  //CRUD

  getReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl + "/Reservation");
  }

  getReservationById(id:string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl + `/Reservation/${id}`);
  }

  addReservation(reservation:Reservation):Observable<Reservation>{
     return this.http.post<Reservation>(this.apiUrl + "/Reservation", reservation)
  }

  deleteReservation(id:string):Observable<Reservation>{
    return this.http.delete<Reservation>(this.apiUrl + `/Reservation/${id}`)
  }

  updateReservation(id:string, updateReservation:Reservation):Observable<Reservation> {
    return this.http.put<Reservation>(this.apiUrl + `/Reservation/${id}`,updateReservation)
  }

}
