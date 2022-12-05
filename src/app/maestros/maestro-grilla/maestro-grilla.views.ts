import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITipoGenerico } from 'src/app/models/Maestras/IMaestraDto';

@Component({
  selector: 'app-maestro-grilla',
  templateUrl: './maestro-grilla.views.html',
  styles: [],
})
export class MaestroGrillaViews implements OnInit {
  allComplete: boolean = false;
  lista!: MatTableDataSource<ITipoGenerico>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['id', 'valor', 'estado', 'action'];

  @Input() set setListArticulo(value: ITipoGenerico[]) {
    this.lista = new MatTableDataSource(value);
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getCurso(row: ITipoGenerico) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: ITipoGenerico) {
    this.onDeleteSeleccionado.emit(row);
  }
}
