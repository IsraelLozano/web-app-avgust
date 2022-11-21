import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { GetArticuloDto } from 'src/app/models/articulo/IArticuloDto.enum';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-main-articulo',
  templateUrl: './main-articulo.views.html',
  styles: [],
})
export class MainArticuloViews implements OnInit {
  listArticulos!: GetArticuloDto[];
  constructor(
    private _articuloService: ArticuloService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _router: Router,
  ) {
    this.GetArticulos();
  }
  GetArticulos() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._articuloService
      .GetListArticulos()
      .pipe(finalize(() => loading.close()))
      .subscribe((resp) => {
        this.listArticulos = resp;
      });
  }

  onGetArticulo(value: any) {
    this._router.navigate(['/articulo/articulo/' + value]);
  }

  ngOnInit(): void {}
}
