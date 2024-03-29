import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetReportsUsoPlagasAllDto } from 'src/app/models/reporte/GetReportsUsoPlagasAllDto';
import { IReporteGeneralDto } from 'src/app/models/reporte/IReporte';

@Component({
  selector: 'app-grilla-reporte-plaga',
  templateUrl: './grilla-reporte-plaga.views.html',
  styles: [],
})
export class GrillaReportePlagaViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<GetReportsUsoPlagasAllDto>;
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
    'Plaga',
    'NombreComercial',
    'NomPais',
    'NomTitularRegistro',
    'Cultivo',
    'Dosis',
  ];

  @Input() set setListArticulo(value: GetReportsUsoPlagasAllDto[]) {
    this.cursosList = new MatTableDataSource(value);
    // this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  OnExportToExcel() {
    this.exportToExcel.emit(3);
  }

  @Output() exportToPdf = new EventEmitter<any>();
  getRepoteModal()
  {
    this.exportToPdf.emit(1)
  }

  @Output() onGetEtiqueta = new EventEmitter<any>();

  getPdf(row: GetReportsUsoPlagasAllDto) {
    this.onGetEtiqueta.emit(row);
  }



}
