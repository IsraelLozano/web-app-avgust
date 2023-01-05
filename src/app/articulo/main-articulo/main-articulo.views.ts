import { SessionService } from './../../libs/services/session.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { FileService } from 'src/app/services/file.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaestraService } from 'src/app/services/maestra.service';
import { ITipoIngredienteActivo } from 'src/app/models/Maestras/IMaestraDto';

@Component({
  selector: 'app-main-articulo',
  templateUrl: './main-articulo.views.html',
  styles: [],
})
export class MainArticuloViews implements OnInit {
  listArticulos!: GetArticuloDto[];
  message!: string;
  progress!: number;
  filtroForm!: FormGroup;
  tipoSeleccionado!: number;
  cboTipoIngredienteActivo!: ITipoIngredienteActivo[];
  constructor(
    private _articuloService: ArticuloService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _router: Router,
    private _fileService: FileService,
    private _sesion: SessionService,
    private _formBuilder: FormBuilder,
    private _maestraService: MaestraService,
  ) {
    this.GetCombo();
    // this.GetArticulos();
  }

  ngOnInit(): void {
    this.filtroForm = this._formBuilder.group({
      tipoReporte: [1, [Validators.required, Validators.minLength(1)]],
      txtFiltro: ['', Validators.required],
      idTipoIngrediente: [0, [Validators.required, Validators.minLength(1)]],
    });
    this.tipoSeleccionado = 1;
    this.GetArticulos2();
  }
  GetArticulos2() {
    this.filtroForm.patchValue({ tipoReporte: 1, txtFiltro: '', idTipoIngrediente: 0 });

    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._articuloService
      .GetListArticulos(this._sesion.user.IdUsuario, 1, 0, '')
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.listArticulos = resp;
      });
  }

  onChangeFiltro(value: any) {
    this.tipoSeleccionado = value.value;
  }
  GetCombo() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._maestraService
      .getListTipoIngredienteActivo()
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.cboTipoIngredienteActivo = resp;
      });
  }
  GetArticulos() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const { tipoReporte, txtFiltro, idTipoIngrediente } = this.filtroForm.value;

    this._articuloService
      .GetListArticulos(this._sesion.user.IdUsuario, tipoReporte, idTipoIngrediente, txtFiltro)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.listArticulos = resp;
      });
  }

  onGetArticulo(value: any) {
    this._router.navigate(['/articulo/articulo/' + value]);
  }

  onDeleteArticulo(id: number) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._articuloService
      .DeleteArticuloById(id)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        if (resp) {
          this._dialogService.info({
            title: 'Confirmación',
            message: 'El articulo buen anulado correctamente.',
            button: {
              text: 'CERRAR',
            },
          });
          this.GetArticulos();
        }
      });
  }

  GetFileExcel() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const { tipoReporte, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    this._fileService
      .downloadExcel(this._sesion.user.IdUsuario, tipoReporte, idTipoIngrediente, txtFiltro)
      .pipe(finalize(() => loading.close()))
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'descarga realizada';
          this.downloadFile(event, 'articulos.xlsx');
        }
      });
  }

  private downloadFile = (data: HttpResponse<Blob> | any, fileName: string) => {
    const downloadedFile = new Blob([data.body], { type: data?.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  };
}
