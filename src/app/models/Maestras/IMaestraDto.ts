export interface ITipoGenerico {
  id: number;
  descripcion: string;
  estado: boolean;
  codigo?: string;
}

export interface IPaisDto {
  IdPais: number;
  NomPais: string;
  estado: boolean;
}

export interface IAplicacionDto {
  IdAplicacion: number;
  Descripcion: string;
  estado: boolean;
}

export interface ICientificaPlagaDto {
  IdNomCientificoPlaga: number;
  NombreCientificoPlaga: string;
  estado: boolean;
}

export interface IClaseDto {
  IdClase: number;
  Descripcion: string;
  estado: boolean;
  IdTipoProducto: number;
}

export interface ICultovoDto {
  IdCultivo: number;
  NombreCultivo: string;
  NombreComun: string;
  estado: boolean;
}

export interface IFormuladorDto {
  IdFormulador: number;
  NomFormulador: string;
  estado: boolean;
}

export interface IGrupoQuimicoDto {
  IdGrupoQuimico: number;
  NomGrupoQuimico: string;
  estado: boolean;
}

export interface ITipoProductoDto {
  IdTipoProducto1: number;
  NomTipoProducto: string;
  estado: boolean;
}

export interface ITipoDocumentoDto {
  IdTipoDocumento: number;
  Nombre: string;
  estado: boolean;
}

export interface ITItularRegistroDto {
  IdTitularRegistro: number;
  NomTitularRegistro: string;
  estado: boolean;
}

export interface IToxicologiaDto {
  IdToxicologica: number;
  Descripcion: string;
  estado: boolean;
}

export interface ITipoFormulacion {
  IdTipoFormulacion: number;
  CodTipoFormulacion: string;
  NomTipoFormulacion: string;
  estado: boolean;
}

export interface ITipoIngredienteActivo {
  IngredenteActivo: number;
  NomIngredienteActivo: string;
  estado: boolean;
}

export interface IFabricante
{
  IdFabricante:     number;
  NombreFabricante: string;
  Estado:           boolean;
}
