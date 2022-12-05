import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { EnumTIPO_DOCUMENTO } from 'src/app/libs/enumerados/EnumMaestras.enum';
import { SessionService } from 'src/app/libs/services/session.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { InstitucionCarrereSelec } from 'src/app/shared/menu-items/GetDtoUser';

@Component({
  selector: 'app-validar-iest',
  templateUrl: './validar-iest.component.html',
  styles: [],
})
export class ValidarIestComponent implements OnInit {
  instituciones: any[] = [];
  carreras: any[] = [];

  public form: UntypedFormGroup = Object.create(null);

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
    private _sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.GetInstituciones();
    this.form = this.fb.group({
      idInstitucion: [null, Validators.compose([Validators.required, CustomValidators.min(1)])],
      idCarrera: [null, Validators.compose([Validators.required, CustomValidators.min(1)])],
    });
  }

  GetInstituciones() {}

  changeInstituciones(ID_PERSONA_INSTITUCION: any) {}

  onSubmit() {}
}
