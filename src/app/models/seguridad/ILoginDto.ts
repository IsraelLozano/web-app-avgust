export interface ILoginDto {
  IdUsuario: number;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Nombres: string;
  Credencial: string;
  Email: string;
  UsuarioPais: UsuarioPai[];
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
