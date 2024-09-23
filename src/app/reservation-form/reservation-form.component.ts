import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', Validators.required],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.getReservationById(id).subscribe(res=>{
        if (res) {
          this.reservationForm.patchValue(res)
        }
      });
    }
  }
  reservationForm: FormGroup = new FormGroup({})

  onSubmit = () => {
    if (this.reservationForm.valid) {
      console.log("form valid")
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService.updateReservation(id,reservation).subscribe(res =>{
          return res;
        });
      } else {
        this.reservationService.addReservation(reservation).subscribe(res =>{
          return res;
        });
      }
      this.route.navigate(['/list'])
    }
  }
}
