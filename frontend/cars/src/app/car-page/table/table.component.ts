import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/interfaces/Car.model';
import { CarsService } from 'src/app/services/cars.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'model', 'mark', 'color', 'delete', 'modify'];
  @Input() cars: Car[];
  public showCars: Car[];
  @Input() isLoading: boolean;
  @Input() isError: boolean;

  public isLoadingDelete = false;
  public isErrorDelete = false;
  constructor(
    private carsService: CarsService,
    private  dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public deleteCar(id: number) {
    this.isLoadingDelete = true;
    this.isErrorDelete = false;
    this.carsService.deleteCar(id)
      .subscribe((car: Car) => {
        this.isLoadingDelete = false;
        this.cars = this.cars.filter((carItem: Car) => carItem.id !== id);
      }, error => {
        this.isLoadingDelete = false;
        this.isErrorDelete = true;
      });
  }
  public openDialog(car: Car) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: car});
  }
  public searchById(event: number): void {
    this.carsService.getCar(+event)
      .subscribe((car: Car) => {
        this.cars = [car];
      }, error => {
        this.carsService.getCars()
        .subscribe((cars: Car[]) => {
          this.cars = cars;
        });
      });
  }
}
