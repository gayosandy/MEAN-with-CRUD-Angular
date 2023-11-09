import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationformComponent } from './reservationform/reservationform.component';
import { ReservationlistComponent } from './reservationlist/reservationlist.component';
import { ResDetailComponent } from './res-detail/res-detail.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'reservationform' },
  { path: 'reservationform', component: ReservationformComponent},
  { path: 'list', component: ReservationlistComponent},
  { path: 'detail/:id', component: ResDetailComponent},
  { path: 'update/:id', component: ReservationformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
