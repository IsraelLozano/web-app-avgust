import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetCaracteristicaDto,
  GetArticuloDto,
  GetUsoDto,
} from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-grilla-uso',
  templateUrl: './grilla-uso.views.html',
  styles: [],
})
export class GrillaUsoViews implements OnInit {
  allComplete: boolean = false;
  lista!: MatTableDataSource<GetUsoDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();
  @Output() onGetEtiqueta = new EventEmitter<any>();
  displayedColumns: string[] = ['Iditem', 'cultivo', 'plaga', 'etiqueda', 'action'];

  @Input() set setListArticulo(value: GetUsoDto[]) {
    this.lista = new MatTableDataSource(value);
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // ngAfterViewInit(): void {
  //   this.cursosList.paginator = this.paginator;
  //   this.cursosList.sort = this.sort;
  // }

  getCurso(row: GetUsoDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: GetUsoDto) {
    this.onDeleteSeleccionado.emit(row);
  }

  getPdf(row: GetUsoDto) {
    this.onGetEtiqueta.emit(row);
  }
}
