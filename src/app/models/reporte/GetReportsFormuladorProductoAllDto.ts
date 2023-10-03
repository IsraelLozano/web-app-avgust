export interface GetReportsFormuladorProductoAllDto {
  IdProducto: number;
  IdFormualdor: number;
  IdFormuladorNavigation: IDFormuladorNavigation;
  IdProductoNavigation: IDProductoNavigation;
}

export interface IDFormuladorNavigation {
  IdFormulador: number;
  NomFormulador: string;
  estado: boolean;
  EsError: boolean;
  MensajeError: null;
}

export interface IDProductoNavigation {
  IdArticulo: number;
  NombreComercial: string;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  IdPaisNavigation: IDPaisNavigation;
  ingredientesActivos: string[] | null;
}

export interface IDPaisNavigation {
  IdPais: number;
  NomPais: string;
  estado: boolean;
}

export interface IDTitularRegistroNavigation {
  IdTitularRegistro: number;
  NomTitularRegistro: string;
  estado: boolean;
  EsError: boolean;
  MensajeError: null;
}
