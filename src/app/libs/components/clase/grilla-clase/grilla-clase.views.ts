import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IClaseTipoArticuloDto } from 'src/app/models/Maestras/IClaseTipoArticuloDto';
import { ITipoGenerico } from 'src/app/models/Maestras/IMaestraDto';

@Component({
  selector: 'app-grilla-clase',
  templateUrl: './grilla-clase.views.html',
  styles: [],
})
export class GrillaClaseViews implements OnInit {
  allComplete: boolean = false;
  lista!: MatTableDataSource<IClaseTipoArticuloDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['id', 'tipo', 'descripcion', 'estado', 'action'];

  @Input() set setListArticulo(value: IClaseTipoArticuloDto[]) {
    this.lista = new MatTableDataSource(value);
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getCurso(row: IClaseTipoArticuloDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: IClaseTipoArticuloDto) {
    this.onDeleteSeleccionado.emit(row);
  }
}
