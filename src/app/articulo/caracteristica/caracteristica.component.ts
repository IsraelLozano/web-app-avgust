import { Component, Input, OnInit } from '@angular/core';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styles: [],
})
export class CaracteristicaComponent {
  articulo!: GetArticuloDto;

  constructor() {}

  @Input() set data(value: GetArticuloDto) {
    this.articulo = value;
  }
}
