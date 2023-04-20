import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetProductoFormuladorDto } from 'src/app/models/articulo/GetProductoFormuladorDto';
import { GetComposicionDto, GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-grilla-seleccionado',
  templateUrl: './grilla-seleccionado.component.html',
  styles: [],
})
export class GrillaSeleccionadoComponent implements OnInit {
  lista!: MatTableDataSource<GetProductoFormuladorDto>;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['idFormulador', 'formulador', 'action'];

  @Input() set setListaFormuladores(value: GetProductoFormuladorDto[]) {
      this.lista = new MatTableDataSource(value);
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  getCurso(row: GetProductoFormuladorDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: GetProductoFormuladorDto) {
    this.onDeleteSeleccionado.emit(row);
  }
}
