export interface IUsersDto {
  IdUsuario: number;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Nombres: string;
  Credencial: string;
  Email: string;
  UsuarioPais?: UsuarioPai[];
}

// Generated by https://quicktype.io

export interface AddOrEditUserDto {
  idUsuario: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  credencial: string;
  textoClave: string;
  fechaRegistro: string;
  usuarioRegistro: string;
  fechaModificacion: string;
  usuarioModificacion: string;
  email: string;
}

export interface UsuarioPai {
  IdUsuario: number;
  IdPais: number;
  PorDefault: boolean;
  IdPaisNavigation: IDPaisNavigation;
}

export interface IDPaisNavigation {
  IdPais: number;
  NomPais: string;
}
