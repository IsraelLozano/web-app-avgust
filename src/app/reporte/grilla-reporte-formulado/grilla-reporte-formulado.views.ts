import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { IReporteGeneralDto } from 'src/app/models/reporte/IReporte';

@Component({
  selector: 'app-grilla-reporte-formulado',
  templateUrl: './grilla-reporte-formulado.views.html',
  styles: [],
})
export class GrillaReporteFormuladoViews implements OnInit {
  allComplete: boolean = false;
  cursosList!: MatTableDataSource<IReporteGeneralDto>;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
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
    'NroRegistro',
    'NomPais',
    'NomTitularRegistro',
    'NomTipoProducto',
    'TipoFormulacion',
    'Formulador',
    'IngredienteActivo',
    'ConcentracionIA',
    'Toxicologia',
    'Cultivo',
    'Plaga',
    'Dosis',
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
    this.exportToExcel.emit(1);
  }

  @Output() exportToPdf = new EventEmitter<any>();
  getRepoteModal()
  {
    this.exportToPdf.emit(1)
  }
}
