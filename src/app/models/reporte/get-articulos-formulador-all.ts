export interface GetArticulosFormuladorAll {
  IdArticulo: number;
  NombreComercial: string;
  IdTitularRegistro: number;
  IdPaisNavigation: IDPaisNavigation;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  Composicions: Composicion[];
  ProductoFormuladors: ProductoFormulador[];
}

export interface Composicion {
  IngredienteActivoNavigation: IngredienteActivoNavigation;
}

export interface IngredienteActivoNavigation {
  IngredenteActivo: number;
  NomIngredienteActivo: string;
  estado: boolean;
}

export interface IDTitularRegistroNavigation {
  IdTitularRegistro: number;
  NomTitularRegistro: string;
  estado: boolean;
}

export interface ProductoFormulador {
  IdProducto: number;
  IdFormuladorNavigation: IDFormuladorNavigation;
}

export interface IDFormuladorNavigation {
  IdFormulador: number;
  NomFormulador: string;
  estado: boolean;
}


export interface IDPaisNavigation {
  IdPais: number;
  NomPais: string;
  estado: boolean;
}
