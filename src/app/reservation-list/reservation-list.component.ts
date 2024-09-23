import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit, OnChanges {
  reservation: Reservation[] = [];
  constructor(private reservationService: ReservationService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.reservationService.getReservations().subscribe();
  }
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res) => {
      this.reservation = res;
    });
  }
  deleteReservation = (id: string) => {
    this.reservationService.deleteReservation(id).subscribe((res) => {});
  }
}
