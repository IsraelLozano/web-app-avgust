import { SessionService } from 'src/app/libs/services/session.service';
import { Component, OnInit } from '@angular/core';
import { Institucion } from 'src/app/shared/menu-items/GetDtoUser';

@Component({
  selector: 'app-home-institucion',
  templateUrl: './home-institucion.views.html',
  styles: [],
})
export class HomeInstitucionViews implements OnInit {
  institucion!: Institucion;

  constructor(private _sesion: SessionService) {}

  ngOnInit(): void {
    // this.institucion = this._sesion.objInstitucion.institucion;
  }
}
