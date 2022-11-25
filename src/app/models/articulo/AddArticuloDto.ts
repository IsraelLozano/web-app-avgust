export interface AddArticuloDto {
  idArticulo: number;
  idPais: number;
  nombreComercial: string;
  idTitularRegistro: number;
  nroRegistro: string;
  idTipoProducto: number;
  idFormulador: number;
  idGrupoQuimico: number;
}

/**
 * @description Coposiciones
 * @author Israel Daniel Lozano del Castillo
 * @date 21/11/2022
 * @export
 * @interface AddComposicionDto
 */
export interface AddComposicionDto {
  idArticulo: number;
  iditem: number;
  ingredienteActivo: number;
  formuladorMolecular: string;
}

/**
 * @description
 * @author Israel Daniel Lozano del Castillo
 * @date 24/11/2022
 * @export
 * @interface AddCaracteristicaDto
 */
export interface AddCaracteristicaDto {
  idArticulo: number;
  idItem: number;
  idAplicacion: number;
  idClase: number;
  idToxicologica: number;
}

/**
 * @description
 * @author Israel Daniel Lozano del Castillo
 * @date 24/11/2022
 * @export
 * @interface AddDocumentoDto
 */
export interface AddDocumentoDto {
  idArticulo: number;
  idItem: number;
  idTipoDocumento: number;
  fecha: Date;
  nomDocumento: string;
}

/**
 * @description
 * @author Israel Daniel Lozano del Castillo
 * @date 24/11/2022
 * @export
 * @interface AddUsoDto
 */
export interface AddUsoDto {
  idArticulo: number;
  idItem: number;
  idCultivo: number;
  nombreCientificoCultivo: string;
  idNomCientificoPlaga: number;
  dosis: string;
}
