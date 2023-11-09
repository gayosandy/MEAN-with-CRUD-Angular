import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { UserRes } from '../shared/UserRes.model';
import { apiService } from '../service/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrls: ['./reservationlist.component.css']
})
export class ReservationlistComponent implements OnInit{

  public dataSource!: MatTableDataSource<UserRes>;
  public resList!: UserRes[];
  displayedColumns: string [] =[ 'firstName', 'lastName', 'address', 'citystate', 
  'phoneNumber', 'email', 'numNights', 'numGuest', 'numRooms', 'catRates', 'arrivalDate', 'action']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(public api: apiService, private router: Router, private confirmBox: NgConfirmService, private notif: NgToastService){}
  ngOnInit(): void {
    this.getReservationList()
    
  }
  getReservationList(){
    this.api.fetchReservationList().subscribe( res => {
      this.resList = res;
      console.log(res)
      this.dataSource = new MatTableDataSource(this.resList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  editRes(resDetails: UserRes){
    this.api.reservationForm.setValue({
      _id: resDetails._id,
      firstName: resDetails.firstName,
       lastName: resDetails.lastName,
       address: resDetails.address,
       citystate: resDetails.citystate,
       zip: resDetails.zip,
       phoneNumber: resDetails.phoneNumber,
       email: resDetails.email,
       numNights: resDetails.numNights,
       numRooms: resDetails.numRooms,
       numGuest: resDetails.numGuest,
       catRates: resDetails.catRates,
       arrivalDate: resDetails.arrivalDate
    })
    this.router.navigate(['reservationform'])
  }

  deleteRes(_id: string){
    this.confirmBox.showConfirm("Are you sure you want to delete reservation?", 
    () =>{
      this.api.deleteReservation(_id)
      .subscribe((res)=>{
        this.notif.success({ detail: 'DELETED SUCCESSFULLY', summary: 'Reservation Deleted.', duration: 3000 });
        this.getReservationList()
      })
    },
    () =>{

    }
    )
  }
}
