import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetProductoFormuladorDto } from 'src/app/models/articulo/GetProductoFormuladorDto';
import { GetProductorFabricanteDto } from 'src/app/models/articulo/GetProductorFabricanteDto';

@Component({
  selector: 'app-grilla-fabricante',
  templateUrl: './grilla-fabricante.component.html',
  styles: [
  ]
})
export class GrillaFabricanteComponent implements OnInit {

  lista!: MatTableDataSource<GetProductorFabricanteDto>;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['idFormulador', 'formulador', 'action'];

  @Input() set setListaFormuladores(value: GetProductorFabricanteDto[]) {
      this.lista = new MatTableDataSource(value);
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  getCurso(row: GetProductorFabricanteDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: GetProductorFabricanteDto) {
    this.onDeleteSeleccionado.emit(row);
  }

}
