import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetReportsUsosCultivosAllDto } from 'src/app/models/reporte/GetReportsUsosCultivosAllDto';

@Component({
  selector: 'app-grilla-reporte-cultivo',
  templateUrl: './grilla-reporte-cultivo.views.html',
  styles: [],
})
export class GrillaReporteCultivoViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<GetReportsUsosCultivosAllDto>;
  @ViewChild(MatSort) sort!: MatSort;
  _paginator!: MatPaginator;

  @ViewChild(MatPaginator,  {static: false}) set matPaginator(paginator: MatPaginator) {
    this._paginator = paginator;

    if (this.cursosList) {
        this.cursosList.paginator = paginator;
    }
 }

  @Output() exportToExcel = new EventEmitter<any>();

  displayedColumns: string[] = [
    'Cultivo',
    'NombreComercial',
    'NomPais',
    'NomTitularRegistro',
    'Plaga',
    'Dosis',
  ];

  @Input() set setListArticulo(value: GetReportsUsosCultivosAllDto[]) {
    this.cursosList = new MatTableDataSource(value);
    // this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  OnExportToExcel() {
    this.exportToExcel.emit(1);
  }

  @Output() exportToPdf = new EventEmitter<any>();
  getRepoteModal()
  {
    this.exportToPdf.emit(1)
  }


  @Output() onGetEtiqueta = new EventEmitter<any>();

  getPdf(row: GetReportsUsosCultivosAllDto) {
    this.onGetEtiqueta.emit(row);
  }

}
