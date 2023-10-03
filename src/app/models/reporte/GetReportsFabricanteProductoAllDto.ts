export interface GetReportsFabricanteProductoAllDto {
  IdArticulo: number;
  IdFabricante: number;
  IdArticuloNavigation: IDArticuloNavigation;
  IdFabricanteNavigation: IDFabricanteNavigation;
}

export interface IDArticuloNavigation {
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
}

export interface IDFabricanteNavigation {
  IdFabricante: number;
  NombreFabricante: string;
  Estado: boolean;
}
