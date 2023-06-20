export interface GerReportFabricanteDto {
  IdArticulo:                  number;
  NombreComercial:             string;
  IdTitularRegistro:           number;
  IdPaisNavigation:            IDPaisNavigation;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  Composicions:                Composicion[];
  ProductoFabricantes:         ProductoFabricante[];
}

export interface Composicion {
  IngredienteActivoNavigation: IngredienteActivoNavigation;
}

export interface IngredienteActivoNavigation {
  IngredenteActivo:     number;
  NomIngredienteActivo: string;
  estado:               boolean;
}

export interface IDTitularRegistroNavigation {
  IdTitularRegistro:  number;
  NomTitularRegistro: string;
  estado:             boolean;
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

export interface IDPaisNavigation {
  IdPais:  number;
  NomPais: string;
  estado:  boolean;
}
