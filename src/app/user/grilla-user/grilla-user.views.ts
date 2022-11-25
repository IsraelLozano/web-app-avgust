import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsersDto } from 'src/app/models/seguridad/IUsersDto';

@Component({
  selector: 'app-grilla-user',
  templateUrl: './grilla-user.views.html',
  styles: [],
})
export class GrillaUserViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<IUsersDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetCursoSeleccionado = new EventEmitter<any>();
  @Output() onDeleteCursoSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = [
    'IdUsuario',
    'ApellidoPaterno',
    'ApellidoMaterno',
    'Nombres',
    'Credencial',
    'Email',
    'pais',
    'estado',
    'action',
  ];

  @Input() set setListArticulo(value: IUsersDto[]) {
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

  getCurso(row: IUsersDto) {
    this.onGetCursoSeleccionado.emit(row);
  }

  deleteInvoice(row: IUsersDto) {
    this.onDeleteCursoSeleccionado.emit(row);
  }
}
