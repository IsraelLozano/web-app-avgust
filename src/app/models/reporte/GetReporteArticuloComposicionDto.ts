export interface GetReporteArticuloComposicionDto {
  IdArticulo:                  number;
  Iditem:                      number;
  IngredienteActivo:           number;
  FormuladorMolecular:         string;
  idGrupoQuimico:              number;
  ContracionIA:                string;
  GrupoQuimicoNavegation:      GrupoQuimicoNavegation;
  IngredienteActivoNavigation: IngredienteActivoNavigation;
  IdArticuloNavigation:        IDArticuloNavigation;
  listFormuladores:            string[] | null;
}

export interface GrupoQuimicoNavegation {
  IdGrupoQuimico:  number;
  NomGrupoQuimico: string;
  estado:          boolean;
  EsError:         boolean;
  MensajeError:    null;
}

export interface IDArticuloNavigation {
  IdArticulo:                  number;
  NombreComercial:             string;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
}

export interface IDTitularRegistroNavigation {
  IdTitularRegistro:  number;
  NomTitularRegistro: string;
  estado:             boolean;
  EsError:            boolean;
  MensajeError:       null;
}

export interface IngredienteActivoNavigation {
  IngredenteActivo:     number;
  NomIngredienteActivo: string;
  estado:               boolean;
  EsError:              boolean;
  MensajeError:         null;
}
