import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { apiService } from '../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRes } from '../shared/UserRes.model';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservationform.component.html',
  styleUrls: ['./reservationform.component.css']
})
export class ReservationformComponent implements OnInit {
rooms = [
  'Superior - Single: $50/night',
  'Superior - Double: $70/night',
  'Deluxe - Single: $90/night',
  'Junior Suit: $120/night',
];

reservationForm!: FormGroup;
userID!: any;
editMode = false;
submitted = false;

constructor(public api: apiService, private notif: NgToastService, private route: ActivatedRoute, private fb: FormBuilder){

}
ngOnInit(): void {
  if(this.api.reservationForm.get('_id')?.value =='')
    this.editMode = false
  else
  this.editMode = true
}


submit(){

this.submitted = true;
  if(this.api.reservationForm.valid){
    if(this.api.reservationForm.get('_id')?.value == '')
    this.api.postReservation().subscribe(res => {
    this.notif.success({detail: 'Reservation Succesful!', summary: 'Reservation Added, any inquries or questions please contact us.', duration: 5000, position: 'bottomRight'})
    this.reserForm()
  })
  else
  this.editMode = true
  this.api.putReservation().subscribe( res => {
    this.notif.success({detail: 'Reservation Updated!', duration: 5000})
    this.reserForm()
  })
}
}

reserForm(){
  this.api.reservationForm.reset(new UserRes);
  this.submitted = false;
}
}
