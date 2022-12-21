import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-grilla-articulo',
  templateUrl: './grilla-articulo.views.html',
  styles: [],
})
export class GrillaArticuloViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<GetArticuloDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetCursoSeleccionado = new EventEmitter<any>();
  @Output() onDeleteCursoSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = [
    'id',
    'NombreComercial',
    'NroRegistro',
    'NomPais',
    'NomTipoProducto',
    'NomTitularRegistro',
    'estado',
    'action',
  ];

  @Input() set setListArticulo(value: GetArticuloDto[]) {
    this.cursosList = new MatTableDataSource(value);
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // ngAfterViewInit(): void {
  //   this.cursosList.paginator = this.paginator;
  //   this.cursosList.sort = this.sort;
  // }

  getCurso(row: number) {
    this.onGetCursoSeleccionado.emit(row);
  }

  deleteInvoice(row: number) {
    this.onDeleteCursoSeleccionado.emit(row);
  }
}
