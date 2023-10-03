export interface GetReportsUsoPlagasAllDto {
  IdArticulo:                     number;
  IdItem:                         number;
  IdCultivo:                      number;
  NombreCientificoCultivo:        null;
  IdNomCientificoPlaga:           number;
  Dosis:                          null;
  IdCultivoNavigation:            IDCultivoNavigation;
  IdNomCientificoPlagaNavigation: IDNomCientificoPlagaNavigation;
  IdArticuloNavigation:           IDArticuloNavigation;
}

export interface IDArticuloNavigation {
  IdArticulo:                  number;
  NombreComercial:             string;
  IdTitularRegistroNavigation: IDTitularRegistroNavigation;
  IdPaisNavigation:            IDPaisNavigation;
}

export interface IDPaisNavigation {
  IdPais:  number;
  NomPais: string;
  estado:  boolean;
}


export interface IDTitularRegistroNavigation {
  IdTitularRegistro:  number;
  NomTitularRegistro: string;
  estado:             boolean;
}


export interface IDCultivoNavigation {
  IdCultivo:     number;
  NombreCultivo: string;
  estado:        boolean;
  NombreComun:   string | null;
  EsError:       boolean;
  MensajeError:  null;
}

export interface IDNomCientificoPlagaNavigation {
  IdNomCientificoPlaga:  number;
  NombreCientificoPlaga: string;
  estado:                boolean;
  EsError:               boolean;
  MensajeError:          null;
}
