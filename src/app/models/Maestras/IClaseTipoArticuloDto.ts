export interface IClaseTipoArticuloDto {
  IdClase: number;
  Descripcion: string;
  estado: boolean;
  IdTipoProducto: number;
  IdTipoProductoNavigation?: IDTipoProductoNavigation;
}

export interface IDTipoProductoNavigation {
  IdTipoProducto1: number;
  NomTipoProducto: string;
  estado: boolean;
}
