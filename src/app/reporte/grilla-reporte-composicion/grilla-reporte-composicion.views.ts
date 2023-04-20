import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IReporteGeneralDto } from 'src/app/models/reporte/IReporte';

@Component({
  selector: 'app-grilla-reporte-composicion',
  templateUrl: './grilla-reporte-composicion.views.html',
  styles: [],
})
export class GrillaReporteComposicionViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<IReporteGeneralDto>;
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
    'NombreComercial',
    'NomTitularRegistro',
    'Formulador',
    'IngredienteActivo',
    'ConcentracionIA',
    'GrupoQuimico',
  ];

  @Input() set setListArticulo(value: IReporteGeneralDto[]) {
    this.cursosList = new MatTableDataSource(value);
    // this.cursosList.paginator = this.paginator;
    this.cursosList.sort = this.sort;
  }

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  OnExportToExcel() {
    this.exportToExcel.emit(2);
  }
}
