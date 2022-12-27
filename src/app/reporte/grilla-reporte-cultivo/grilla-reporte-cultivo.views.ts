import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IReporteGeneralDto } from 'src/app/models/reporte/IReporte';

@Component({
  selector: 'app-grilla-reporte-cultivo',
  templateUrl: './grilla-reporte-cultivo.views.html',
  styles: [],
})
export class GrillaReporteCultivoViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<IReporteGeneralDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() exportToExcel = new EventEmitter<any>();

  displayedColumns: string[] = [
    'Cultivo',
    'NombreComercial',
    'NomPais',
    'NomTitularRegistro',
    'Plaga',
    'Dosis',
  ];

  @Input() set setListArticulo(value: IReporteGeneralDto[]) {
    this.cursosList = new MatTableDataSource(value);
    this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  OnExportToExcel() {
    this.exportToExcel.emit(1);
  }
}
