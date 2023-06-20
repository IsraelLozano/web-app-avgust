import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICultovoDto } from 'src/app/models/Maestras/IMaestraDto';

@Component({
  selector: 'app-grilla-cultivo',
  templateUrl: './grilla-cultivo.component.html',
  styles: [
  ]
})
export class GrillaCultivoComponent implements OnInit {

  allComplete: boolean = false;
  lista!: MatTableDataSource<ICultovoDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() onGetSeleccionado = new EventEmitter<any>();
  @Output() onDeleteSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['id', 'valor','NombreComun', 'estado', 'action'];

  @Input() set setListArticulo(value: ICultovoDto[]) {
    this.lista = new MatTableDataSource(value);
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getCurso(row: ICultovoDto) {
    this.onGetSeleccionado.emit(row);
  }

  deleteInvoice(row: ICultovoDto) {
    this.onDeleteSeleccionado.emit(row);
  }

}
