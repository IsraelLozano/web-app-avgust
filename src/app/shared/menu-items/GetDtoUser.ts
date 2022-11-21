import { Menu } from './menu-items';

/**
 * @description Clases para la sesion
 * @author Israel Daniel Lozano del Castillo
 * @date 21/09/2022
 * @export
 * @class GetDataUserDto
 */
export class GetDataUserDto {
  constructor(
    public Id: string,
    public Email: string,
    public Id_Persona: number,
    public persona: Persona,
    public opciones: Menu[],
    public instituciones: Institucione[],
    public tieneInstituciones: boolean,
    public fotoBase64: null,
  ) {}
  get fullName() {
    return `${this.persona.ApellidoPaternoPersona} ${this.persona.ApellidoMaternoPersona}, ${this.persona.NombrePersona}`;
  }
}
export interface Persona {
  IdPersona: number;
  IdTipoDocumento: number;
  NumeroDocumentoPersona: string;
  NombrePersona: string;
  ApellidoPaternoPersona: string;
  ApellidoMaternoPersona: string;
}

export interface Institucione {
  ID_PERSONA_INSTITUCION: number;
  ID_PERSONA: number;
  ID_INSTITUCION: number;
  ID_PERIODO_ACADEMICO: number;
  ID_PERIODOS_LECTIVOS_POR_INSTITUCION_main: number;
  CODIGO_PERIODO_LECTIVO: string;
  institucion: Institucion;
  tieneCarreras: boolean;
  carreras: Carrera[];
}

export interface Carrera {
  ID_ESTUDIANTE_INSTITUCION: number;
  ID_PERSONA_INSTITUCION: number;
  ID_CARRERAS_POR_INSTITUCION_DETALLE: number;
  ID_PLAN_ESTUDIO: number;
  ID_SEMESTRE_ACADEMICO: number;
  ID_CARRERA: number;
  ID_PERIODOS_LECTIVOS_POR_INSTITUCION: number;
  NombreCarrera: string;
  ARCHIVO_FOTO: string;
  fotoBase64: string;
}

export interface Institucion {
  IdInstitucion: number;
  TipoInstitucionNombre: string;
  TipoInstitucion: number;
  NombreInstitucion: string;
  CodigoModular: string;
  TipoGestion: number;
  TipoGestionNombre: string;
  Direccion: string;
  CodigoDepartamento: string;
  NombreDepartamento: string;
  CodigoProvincia: string;
  NombreProvincia: string;
  CodigoDistrito: string;
  NombreDistrito: string;
  CentroPoblado: string;
  ValidadoEscale: string;
  EstadoEscale: string;
  Orden: number;
  Grupo: number;
  FechaInicio: string;
  FechaFin: string;
  Habilitada: boolean;
  DreGre: string;
  PaginaWeb: string;
  Email: string;
  Telefono: string;
  Celular: string;
}

export interface InstitucionCarrereSelec {
  idPersonaInstitucion: number;
  idEstudianteInstitucion: number;
  ID_CARRERAS_POR_INSTITUCION_DETALLE: number;
}

export class getPersonaDto {
  public IdPersona!: number;
  public IdTipoDocumento!: number;
  public NumeroDocumentoPersona!: string;
  public NombrePersona!: string;
  public ApellidoPaternoPersona!: string;
  public ApellidoMaternoPersona!: string;

  constructor(data: Persona) {
    this.IdPersona = data.IdPersona;
    this.IdTipoDocumento = data.IdTipoDocumento;
    this.NumeroDocumentoPersona = data.NumeroDocumentoPersona;
    this.NombrePersona = data.NombrePersona;
    this.ApellidoPaternoPersona = data.ApellidoPaternoPersona;
    this.ApellidoMaternoPersona = data.ApellidoMaternoPersona;
  }
  get fullName() {
    return `${this.ApellidoPaternoPersona} ${this.ApellidoMaternoPersona}, ${this.NombrePersona}`;
  }
  get nameProfile() {
    return `${this.NombrePersona.toLowerCase()}`;
  }
}
