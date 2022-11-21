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

  GetInstituciones() {
    this._sessionService.Instituciones.map((resp) => {
      this.instituciones.push({
        id: resp.ID_PERSONA_INSTITUCION,
        nombre: resp.institucion.NombreInstitucion,
      });
    });
  }

  changeInstituciones(ID_PERSONA_INSTITUCION: any) {
    this.carreras = [];
    const listInt = this._sessionService.Instituciones.filter(
      (p) => p.ID_PERSONA_INSTITUCION == ID_PERSONA_INSTITUCION,
    ).map((p) => p.carreras);

    listInt[0].map((p) => {
      this.carreras.push({ id: p.ID_ESTUDIANTE_INSTITUCION, nombre: p.NombreCarrera });
    });
  }

  onSubmit() {
    const { idInstitucion, idCarrera } = this.form.value;

    const idCarreraPorInstitucion = this._sessionService.Instituciones.filter(
      (p) => p.ID_PERSONA_INSTITUCION == idInstitucion,
    ).map((c) => c.carreras);

    const ID_CARRERAS_POR_INSTITUCION_DETALLE = idCarreraPorInstitucion[0]
      .filter((p) => p.ID_ESTUDIANTE_INSTITUCION == idCarrera)
      .map((r) => r.ID_CARRERAS_POR_INSTITUCION_DETALLE);

    const objInstituto: InstitucionCarrereSelec = {
      idPersonaInstitucion: idInstitucion,
      idEstudianteInstitucion: idCarrera,
      ID_CARRERAS_POR_INSTITUCION_DETALLE: ID_CARRERAS_POR_INSTITUCION_DETALLE[0],
    };

    this._sessionService.createKeyPeis(JSON.stringify(objInstituto));

    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
