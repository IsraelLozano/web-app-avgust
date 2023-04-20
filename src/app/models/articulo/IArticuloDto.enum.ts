export interface GetArticuloForEditDto {
  articulo: GetArticuloDto;
  formuladores: IDFormuladorNavigation[];
  titulares: IDTitularRegistroNavigation[];
  tiposProductos: IDTipoProductoNavigation[];
  paises: IDPaisNavigation[];
  tiposDocumentos: TiposDocumento[];
  tiposPlagas: TiposPlagas[];
  tiposCultivos: TiposCultivo[];
  cboAplicaciones: CboAplicacione[];
  cboClase: CboClase[];
  cboToxicologica: CboToxicologica[];
  cboGrupoQuimico: CboGrupoQuimico[];
  cboTipoFormulacion: CboTipoFormulacion[];
  cboTipoIngredienteActivo: CboTipoIngredienteActivo[];
  cboFabricante: CboFabricante[]
}

export interface GetArticuloDto {
  IdArticulo: number;
  IdPais: number;
  NombreComercial: string;
  IdTitularRegistro: number;
  NroRegistro: string;
  IdTipoProducto: number;
  IdFormulador: number;
  IdGrupoQuimico: number;
  IdTipoFormulacion: number;
  Concentracion: string;
  FlgActivo: boolean;
  IdPaisNavigation: IDPaisNavigation;
  IdTipoFormulacionNavigation: IDTipoFormulacionNavigation;
  IdGrupoQuimicoNavigation: IdGrupoQuimicoNavigation;
  IdFormuladorNavigation: IDFormuladorNavigation;
  IdTipoProductoNavigation: IDTipoProductoNavigation;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  Composicions: GetComposicionDto[];
  Documentos: GetDocumentoDto[];
  Usos: GetUsoDto[];
  Caracteristicas: GetCaracteristicaDto[];
  ProductoFabricantes:         ProductoFabricante[];
	ProductoFormuladors:         ProductoFormulador[];
}

export interface CboFabricante{
  IdFabricante:number,
  NombreFabricante: string,
  Estado: boolean

}
export interface ProductoFormulador {
	IdProducto:             number;
	IdFormuladorNavigation: Formuladore;
}

export interface Formuladore {
	IdFormulador:  number;
	NomFormulador: string;
	estado:        boolean;
}

export interface ProductoFabricante {
	IdArticulo:             number;
	IdFabricanteNavigation: IDFabricanteNavigation;
}

export interface IDFabricanteNavigation {
	IdFabricante:     number;
	NombreFabricante: string;
	Estado:           boolean;
}

export interface IDTipoFormulacionNavigation {
  IdTipoFormulacion: number;
  CodTipoFormulacion: string;
  NomTipoFormulacion: string;
}

export interface GetComposicionDto {
  IdArticulo: number;
  Iditem: number;
  IngredienteActivo: number;
  idGrupoQuimico: number;
  ContracionIA: string;
  FormuladorMolecular: string;
  IngredienteActivoNavigation: CboTipoIngredienteActivo;
  GrupoQuimicoNavegation: CboGrupoQuimico;
}

export interface GetDocumentoDto {
  IdArticulo: number;
  IdItem: number;
  IdTipoDocumento: number;
  Fecha: Date;
  NomDocumento: string;
  IdTipoDocumentoNavigation?: TiposDocumento;
}

export interface GetDocumentoDtoModal {
  IdArticulo: number;
  IdItem: number;
  IdTipoDocumento: number;
  Fecha: Date;
  NomDocumento: string;
  cboDocumentos: TiposDocumento[];
}

export interface GetComposicionDtoModal {
  IdArticulo: number;
  Iditem: number;
  IngredienteActivo: number;
  FormuladorMolecular: string;
  idGrupoQuimico: number;
  ContracionIA: string;
  cboTipoIngredienteActivo: CboTipoIngredienteActivo[];
  cboGrupoQuimico: CboGrupoQuimico[];
}
export interface GetUsoDto {
  IdArticulo: number;
  IdItem: number;
  IdCultivo: number;
  NombreCientificoCultivo: string;
  IdNomCientificoPlaga: number;
  Dosis: string;
  IdCultivoNavigation: TiposCultivo;
  IdNomCientificoPlagaNavigation: TiposPlagas;
}

export interface GetUsoDtoModal {
  IdArticulo: number;
  IdItem: number;
  IdCultivo: number;
  NombreCientificoCultivo: string;
  IdNomCientificoPlaga: number;
  Dosis: string;
  cboPlagas: TiposPlagas[];
  cboCultivos: TiposCultivo[];
}

export interface GetCaracteristicaDto {
  IdArticulo: number;
  IdItem: number;
  IdAplicacion: number;
  IdClase: number;
  IdToxicologica: number;
  IdAplicacionNavigation?: CboAplicacione;
  IdClaseNavigation?: CboClase;
  IdToxicologicaNavigation?: CboToxicologica;
}

export interface GetCaracteristicaDtoModal {
  IdArticulo: number;
  IdItem: number;
  IdAplicacion: number;
  IdClase: number;
  IdToxicologica: number;
  CboApp?: CboAplicacione[];
  cboCla?: CboClase[];
  cbpToxico?: CboToxicologica[];
}

export interface IdGrupoQuimicoNavigation {
  IdGrupoQuimico: number;
  NomGrupoQuimico: number;
}

export interface IDFormuladorNavigation {
  IdFormulador: number;
  NomFormulador: string;
}

export interface IDPaisNavigation {
  IdPais: number;
  NomPais: string;
}

export interface IDTipoProductoNavigation {
  IdTipoProducto1: number;
  NomTipoProducto: string;
}

export interface IDTitularRegistroNavigation {
  IdTitularRegistro: number;
  NomTitularRegistro: string;
}

export interface CboAplicacione {
  IdAplicacion: number;
  Descripcion: string;
}

export interface CboClase {
  IdClase: number;
  Descripcion: string;
  IdTipoProducto: number;
}

export interface CboGrupoQuimico {
  IdGrupoQuimico: number;
  NomGrupoQuimico: string;
}

export interface CboToxicologica {
  IdToxicologica: number;
  Descripcion: string;
}

export interface TiposCultivo {
  IdCultivo: number;
  NombreCultivo: string;
}

export interface TiposDocumento {
  IdTipoDocumento: number;
  Nombre: string;
}

export interface TiposPlagas {
  IdNomCientificoPlaga: number;
  NombreCientificoPlaga: string;
}

export interface CboTipoFormulacion {
  IdTipoFormulacion: number;
  CodTipoFormulacion: string;
  NomTipoFormulacion: string;
}

export interface CboTipoIngredienteActivo {
  IngredenteActivo: number;
  NomIngredienteActivo: string;
}

// Generated by https://quicktype.io

// export interface Moooo {
//   IdClase:                  number;
//   Descripcion:              string;
//   estado:                   boolean;

//   IdTipoProductoNavigation: IDTipoProductoNavigation;
// }

// export interface IDTipoProductoNavigation {
//   IdTipoProducto1: number;
//   NomTipoProducto: string;
//   estado:          boolean;
// }
