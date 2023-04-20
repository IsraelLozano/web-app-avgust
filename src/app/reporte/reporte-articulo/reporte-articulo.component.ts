import { IReporteGeneralDto } from './../../models/reporte/IReporte';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  UntypedFormControl,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize, forkJoin, map, Observable, startWith } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { SessionService } from 'src/app/libs/services/session.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  ICientificaPlagaDto,
  ICultovoDto,
  ITipoIngredienteActivo,
} from 'src/app/models/Maestras/IMaestraDto';
import { MaestraService } from 'src/app/services/maestra.service';

@Component({
  selector: 'app-reporte-articulo',
  templateUrl: './reporte-articulo.component.html',
  styleUrls: ['./reporte-articulo.component.scss'],
})
export class ReporteArticuloComponent implements OnInit, AfterContentInit {
  filtroForm!: FormGroup;
  reporteSelect!: number;
  dataReporteGeneral!: IReporteGeneralDto[];
  dataReportePlaga!: IReporteGeneralDto[];
  dataComposicion!: IReporteGeneralDto[];
  dataReporteCultivo!: IReporteGeneralDto[];

  progress!: number;
  message!: string;

  tipoSeleccionado!: number;
  idIngredienteSeleccionado!: number;

  cboTipoIngredienteActivo!: ITipoIngredienteActivo[];
  cboPlagas!: ICientificaPlagaDto[];
  cboCultivo!: ICultovoDto[];

  constructor(
    private _formBuilder: FormBuilder,
    private _sesion: SessionService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _reporte: ReporteService,
    private _maestraService: MaestraService,
  ) {
    this.GetCombo();
  }
  ngAfterContentInit(): void {
    // if (this.cboPlagas.length > 0) {
    // }
  }

  onChangeFiltro(value: any) {
    this.tipoSeleccionado = value.value;
  }
  GetCombo() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    forkJoin({
      listIngrediente: this._maestraService.getListTipoIngredienteActivo(),
      listPlagas: this._maestraService.getListCientificoPlaga(),
      listCultivo: this._maestraService.getListCultivo(),
    })
      .pipe(finalize(() => loading.close()))
      .subscribe(
        ({ listIngrediente, listPlagas, listCultivo }) => {
          this.cboTipoIngredienteActivo = listIngrediente;
          (this.cboPlagas = listPlagas), (this.cboCultivo = listCultivo);
        },
        (err) => {
          console.log(err);
        },
      );

    // this._maestraService
    //   .getListTipoIngredienteActivo()
    //   .pipe(finalize(() => loading.close()))
    //   .subscribe((resp) => {
    //     this.cboTipoIngredienteActivo = resp;
    //   });
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();
    // debugger;
    return this.cboPlagas.filter((option) =>
      option.NombreCientificoPlaga.toLowerCase().includes(filterValue),
    );
  }

  private _filterCultivo(name: string) {
    const filterValue = name.toLowerCase();
    // debugger;
    return this.cboCultivo.filter((option) =>
      option.NombreCultivo.toLowerCase().includes(filterValue),
    );
  }

  //Autocomplete
  myControl2 = new FormControl<string | any>('');
  filteredOptions: Observable<any[]> | undefined;

  controlCultivo = new FormControl<string | any>('');
  filteredCultivo: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.filtroForm = this._formBuilder.group({
      tipoReporte: [0, [Validators.required, Validators.minLength(1)]],
      tipoBusqueda: [0, [Validators.required, Validators.minLength(1)]],
      txtFiltro: [''],
      idTipoIngrediente: [0, [Validators.required, Validators.minLength(1)]],
      idPlaga: [''],
    });

    this.filteredOptions = this.myControl2.valueChanges.pipe(
      startWith(''),
      // map((value) => this._filter(value)),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.NombreCientificoPlaga;
        return name ? this._filter(name as string) : this.cboPlagas.slice();
      }),
    );

    this.filteredCultivo = this.controlCultivo.valueChanges.pipe(
      startWith(''),
      // map((value) => this._filter(value)),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.NombreCultivo;
        return name ? this._filterCultivo(name as string) : this.cboCultivo.slice();
      }),
    );
  }

  displayFn(user?: ICientificaPlagaDto): string | undefined {
    return user ? user.NombreCientificoPlaga : undefined;
  }

  displayFnCultivo(user?: ICultovoDto): string | undefined {
    return user ? user.NombreCultivo : undefined;
  }

  GetSelectValue(event: any) {
    this.dataReporteGeneral =
      this.dataReportePlaga =
      this.dataComposicion =
      this.dataReporteCultivo =
        [];

    this.myControl2.setValue('');
    this.controlCultivo.setValue('');
  }

  GetArticulos() {
    const userId = this._sesion.user.IdUsuario;
    switch (this.reporteSelect) {
      case 1:
        this.GetArticuloGeneral(userId);
        break;
      case 2:
        this.getComposicion(userId);
        break;
      case 3:
        this.getPlaga(userId);
        break;
      case 4:
        this.getCultivo(userId);
        break;

      default:
        break;
    }
  }
  getCultivo(userId: number) {
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const filtro2 = this.controlCultivo.value;
    this._reporte
      .GetReporteArticulosCultivo(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        filtro2.NombreCultivo,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.dataReporteCultivo = resp;
      });
  }

  getPlaga(userId: number) {
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const filtro2 = this.myControl2.value;
    this._reporte
      .GetReporteArticulosPlaga(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        filtro2.NombreCientificoPlaga,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.dataReportePlaga = resp;
      });
  }
  getComposicion(userId: number) {
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._reporte
      .GetReporteArticulosComposicion(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        txtFiltro,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.dataComposicion = resp;
      });
  }
  GetArticuloGeneral(userId: number) {
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;

    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    this._reporte
      .GetReporteArticulos(this._sesion.user.IdUsuario, tipoBusqueda, idTipoIngrediente, txtFiltro)
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.dataReporteGeneral = resp;
      });
  }

  onExportExcelCultivo(value: any) {
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const filtro2 = this.controlCultivo.value;

    this._reporte
      .downloaExcelGetReporteCultivo(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        filtro2.NombreCultivo,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'descarga realizada';
          this.downloadFile(event, 'onExportExcelCultivo.xlsx');
        }
      });
  }

  onExportExcelGeneral(value: any) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;

    this._reporte
      .downloaExcelGetReporteArticulos(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        txtFiltro,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'descarga realizada';
          this.downloadFile(event, 'onExportExcelGeneral.xlsx');
        }
      });
  }

  onExportExcelComposicion(value: any) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;

    this._reporte
      .downloaExcelGetReporteComposicion(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        txtFiltro,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'descarga realizada';
          this.downloadFile(event, 'onExportExcelComposicion.xlsx');
        }
      });
  }

  onExportExcelPlaga(value: any) {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });
    const { tipoBusqueda, txtFiltro, idTipoIngrediente } = this.filtroForm.value;
    const filtro2 = this.myControl2.value;
    this._reporte
      .downloaExcelGetReportePlaga(
        this._sesion.user.IdUsuario,
        tipoBusqueda,
        idTipoIngrediente,
        filtro2.NombreCientificoPlaga,
      )
      .pipe(finalize(() => loading.close()))
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'descarga realizada';
          this.downloadFile(event, 'onExportExcelPlaga.xlsx');
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
