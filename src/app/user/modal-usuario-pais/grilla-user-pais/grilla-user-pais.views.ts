import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetComposicionDto, GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { IGetUsuarioPaisDto } from 'src/app/models/seguridad/IGetUsuarioPaisDto';

@Component({
  selector: 'app-grilla-user-pais',
  templateUrl: './grilla-user-pais.views.html',
  styles: [],
})
export class GrillaUserPaisViews implements OnInit {
  allComplete: boolean = false;
  lista!: MatTableDataSource<IGetUsuarioPaisDto>;
  selection = new SelectionModel<IGetUsuarioPaisDto>(true, []);

  @Output() onSeleccionado = new EventEmitter<any>();

  displayedColumns: string[] = ['select', 'IdPais', 'NomPais'];

  @Input() set setListArticulo(value: IGetUsuarioPaisDto[]) {
    this.lista = new MatTableDataSource(value);
    // this.selection = new SelectionModel<IGetUsuarioPaisDto>(true, []);
  }

  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.lista.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.lista.data.forEach((row) => this.selection.select(row));
  }

  constructor() {}

  updateAllComplete() {
    const numRows = this.selection.selected.length;
  }

  checkboxLabel(row?: IGetUsuarioPaisDto) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.IdPais + 1}`;
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  toggle(row: IGetUsuarioPaisDto) {
    this.selection.toggle(row);
  }

  seleccionado(row: any) {
    this.onSeleccionado.emit(row);
  }
  // ngAfterViewInit(): void {
  //   this.cursosList.paginator = this.paginator;
  //   this.cursosList.sort = this.sort;
  // }
}
