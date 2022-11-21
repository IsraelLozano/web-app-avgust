import { Component, Input, OnInit } from '@angular/core';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-usos',
  templateUrl: './usos.views.html',
  styles: [],
})
export class UsosViews implements OnInit {
  articulo!: GetArticuloDto;

  constructor() {}

  @Input() set data(value: GetArticuloDto) {
    this.articulo = value;
  }

  ngOnInit(): void {}
}
