import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Car } from '../interfaces/Car.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  isRedownload = new Subject();
  constructor(private http: HttpClient) { }

  public getCars(): Observable<Car[]> {
    return this.http
      .get(`${environment.apiURL}/cars`)
      .pipe(map((respons: {links: any, content: Car[]}) => {
        return respons.content;
      }));
  }

  public redownload(): void {
    this.isRedownload.next(true);
  }
  public deleteCar(id: number): Observable<Car> {
    return this.http
      .delete<Car>(`${environment.apiURL}/cars/${id}`);
  }

  public putCar(id: number, car: Car): Observable<Car> {
    return this.http
      .put<Car>(`${environment.apiURL}/cars/${id}`, car);
  }

  public postCar(car: Car): Observable<Car> {
    return this.http
      .post<Car>(`${environment.apiURL}/cars`, car);
  }

  public getCar(id: number): Observable<Car> {
    return this.http
      .get<Car>(`${environment.apiURL}/cars/${id}`);
  }
}
