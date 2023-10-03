import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetReportsFabricanteProductoAllDto } from 'src/app/models/reporte/GetReportsFabricanteProductoAllDto';

@Component({
  selector: 'app-grilla-reporte-fabricante',
  templateUrl: './grilla-reporte-fabricante.component.html',
  styles: [
  ]
})
export class GrillaReporteFabricanteComponent implements OnInit {

  allComplete: boolean = false;
  cursosList!: MatTableDataSource<GetReportsFabricanteProductoAllDto>;
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
    'Fabricante',
    'NombreComercial',
    'Titular',
    'Ingrediante',
  ];

  @Input() set setListArticulo(value: GetReportsFabricanteProductoAllDto[]) {
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
  @Output() exportToPdf = new EventEmitter<any>();
  getRepoteModal()
  {
    this.exportToPdf.emit(1)
  }


}
