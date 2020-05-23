import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarPageComponent } from './car-page/car-page/car-page.component';


const routes: Routes = [
  {path: 'car-page', component: CarPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
