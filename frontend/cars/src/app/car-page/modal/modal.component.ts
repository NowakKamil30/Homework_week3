import { Component, OnInit, Inject } from '@angular/core';
import { Car } from 'src/app/interfaces/Car.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public model = '';
  public mark = '';
  public color = '';
  public id = -1;
  public constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Car,
    private carsService: CarsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.model = this.data.model;
      this.color = this.data.color;
      this.mark = this.data.mark;
      this.id = this.data.id;
    }
  }
  public onChangeModel(event): void {
    this.model = event.target.value;
  }
  public onChangeColor(event): void {
    this.color = event.target.value;
  }
  public onChangeMark(event): void {
    this.mark = event.target.value;
  }
  public onSubmit(): void {
    if (+this.id === -1) {
      this.carsService.postCar({
        model: this.model,
        color: this.color,
        mark: this.mark
      } as Car).subscribe(() => {
        this.carsService.redownload();
        this.dialogRef.close();
      });
      } else {
      this.carsService.putCar(this.id, {
        model: this.model,
        color: this.color,
        mark: this.mark,
        id: this.id
      } as Car).subscribe(() => {
        this.carsService.redownload();
        this.dialogRef.close();
      });
    }
  }

}
