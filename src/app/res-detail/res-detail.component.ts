import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiService } from '../service/api.service';
import { UserRes } from '../shared/UserRes.model';

@Component({
  selector: 'app-res-detail',
  templateUrl: './res-detail.component.html',
  styleUrls: ['./res-detail.component.css']
})
export class ResDetailComponent implements OnInit {

  resDetail!: UserRes;
  resID!: string;
  constructor(private route: ActivatedRoute, private api: apiService){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resID = params['id']
      this.fetchRes(this.resID)
    })
  }

  fetchRes(_id: string){
    this.api.getReservationId(_id).subscribe( res => {
      this.resDetail = res
    })
  }
}
