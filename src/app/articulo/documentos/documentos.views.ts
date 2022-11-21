import { Component, Input, OnInit } from '@angular/core';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.views.html',
  styles: [],
})
export class DocumentosViews implements OnInit {
  articulo!: GetArticuloDto;

  constructor() {}

  @Input() set data(value: GetArticuloDto) {
    this.articulo = value;
  }

  ngOnInit(): void {}
}
