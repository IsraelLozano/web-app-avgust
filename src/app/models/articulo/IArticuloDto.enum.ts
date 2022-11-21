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
  IdPaisNavigation: IDPaisNavigation;
  IdGrupoQuimicoNavigation: IdGrupoQuimicoNavigation;
  IdFormuladorNavigation: IDFormuladorNavigation;
  IdTipoProductoNavigation: IDTipoProductoNavigation;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  Composicions: GetComposicionDto[];
  Documentos: GetDocumentoDto[];
  Usos: GetUsoDto[];
  Caracteristicas: GetCaracteristicaDto[];
}

export interface GetComposicionDto {
  IdArticulo: number;
  Iditem: number;
  IngredienteActivo: number;
  FormuladorMolecular: string;
}

export interface GetDocumentoDto {
  IdArticulo: number;
  IdItem: number;
  IdTipoDocumento: number;
  Fecha: Date;
  NomDocumento: string;
  IdTipoDocumentoNavigation: TiposDocumento;
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

export interface GetCaracteristicaDto {
  IdArticulo: number;
  IdItem: number;
  IdAplicacion: number;
  IdClase: number;
  IdToxicologica: number;
  IdAplicacionNavigation: CboAplicacione;
  IdClaseNavigation: CboClase;
  IdToxicologicaNavigation: CboToxicologica;
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
