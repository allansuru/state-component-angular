import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable, throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators'

const data: Car[] = [
  {
    plate: '2FMDK3',
    brand: 'Volvo',
    model: '960',
    color: 'Violet',
  },
  {
    plate: '1GYS4C',
    brand: 'Saab',
    model: '9-3',
    color: 'Purple',
  },
  {
    plate: '1GKS1E',
    brand: 'Ford',
    model: 'Ranger',
    color: 'Indigo',
  },
  {
    plate: '1G6AS5',
    brand: 'Volkswagen',
    model: 'Golf',
    color: 'Aquamarine',
  },
]
const FAKE_DELAY = 600

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private cars: Car[] = []

  constructor() { }

  add(plate: string): Observable<Car> {
    try {

      const existingCar = this.cars.find((eCar: Car) => eCar.plate === plate);

      if (existingCar) {
        throw `This car with plate ${plate} is already parked`;
      }

      const car = this.getCarByPlate(plate);
      this.cars = [...this.cars, car];

      return of(car).pipe(delay(FAKE_DELAY))

    } catch (error) {
      return throwError(error);
    }
  }

  remove(plate: string): Observable<Car[]> {

    try {
      this.cars = this.cars.filter(item => item.plate !== plate);
    } catch (error) {
      return throwError(error);
    }

    return of(this.cars).pipe(delay(FAKE_DELAY))
  }


  private getCarByPlate(plate: string): Car {
    const car = data.find((item: Car) => item.plate === plate);

    if (car) {
      return car;
    }

    throw `The car with plate ${plate} is not register`;
  }
}
