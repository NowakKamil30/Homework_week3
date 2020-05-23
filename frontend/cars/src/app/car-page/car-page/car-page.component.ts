import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/interfaces/Car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-page',
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit, OnDestroy {
  public cars: Car[];
  public isLoadingCars = true;
  public isErrorCars = false;
  public getCarsSub: Subscription;
  public constructor(private carsService: CarsService) { }

 public ngOnInit(): void {
    this.downloadDate();
    this.carsService.isRedownload
      .subscribe(() => this.downloadDate());
  }

  public ngOnDestroy(): void {
    this.getCarsSub.unsubscribe();
  }

  private downloadDate() {
    this.getCarsSub = this.carsService.getCars()
    .subscribe((cars: Car[]) => {
      this.cars = cars;
      this.isLoadingCars = false;
    }, error => {
      this.isLoadingCars = false;
      this.isErrorCars = true;
    });
  }
}
