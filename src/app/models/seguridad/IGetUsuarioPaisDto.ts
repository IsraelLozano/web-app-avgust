export interface IGetUsuarioPaisDto {
  IdPais: number;
  NomPais: string;
  tieneUsuario: boolean;
  UsuarioPais: UsuarioPai[];
}

export interface UsuarioPai {
  IdUsuario: number;
  IdPais: number;
  PorDefault: boolean;
}
