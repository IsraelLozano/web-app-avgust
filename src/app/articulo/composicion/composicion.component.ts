import { Component, Input, OnInit } from '@angular/core';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-composicion',
  templateUrl: './composicion.component.html',
  styles: [],
})
export class ComposicionComponent implements OnInit {
  articulo!: GetArticuloDto;

  constructor() {}

  @Input() set data(value: GetArticuloDto) {
    this.articulo = value;
  }

  ngOnInit(): void {}
}
