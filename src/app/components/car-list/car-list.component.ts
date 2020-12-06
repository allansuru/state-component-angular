import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/models/car';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars: Car[] = [];
  @Output() removeCar = new EventEmitter();

  constructor() { }



  removePlate($event: Event, plate) {
    $event.preventDefault()
    this.removeCar.emit(plate);
  }

}
