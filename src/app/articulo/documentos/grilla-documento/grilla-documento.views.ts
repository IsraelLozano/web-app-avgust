import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GetComposicionDto,
  GetArticuloDto,
  GetDocumentoDto,
} from 'src/app/models/articulo/IArticuloDto.enum';

@Component({
  selector: 'app-grilla-documento',
  templateUrl: './grilla-documento.views.html',
  styles: [],
})
export class GrillaDocumentoViews implements OnInit {
  allComplete: boolean = false;
  lista!: MatTableDataSource<GetDocumentoDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();
  @Output() onDownload = new EventEmitter<string>();

  displayedColumns: string[] = ['Iditem', 'tipoDoc', 'fecha', 'nombre', 'action'];

  @Input() set setListArticulo(value: GetDocumentoDto[]) {
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

  getCurso(row: GetArticuloDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: GetArticuloDto) {
    this.onDeleteSeleccionado.emit(row);
  }

  dowload(fileName: string) {
    this.onDownload.emit(fileName);
  }
}
