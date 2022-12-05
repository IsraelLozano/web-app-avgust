import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '',
    name: 'Opciones',
    type: 'saperator',
    icon: 'av_timer',
  },
  {
    state: 'home',
    name: 'Inicio',
    type: 'link',
    icon: 'home',
  },

  {
    state: 'seguridad',
    name: 'Seguridad',
    type: 'sub',
    icon: 'av_timer',
    children: [
      { state: 'list-user', name: 'Registro de Usuario', type: 'link' },
      // { state: 'test', name: 'Perfil de usuario', type: 'link' },
    ],
  },
  {
    state: 'articulo',
    name: 'Articulos',
    type: 'sub',
    icon: 'insert_drive_file',
    badge: [{ type: 'warning', value: '=>' }],
    children: [
      { state: 'list-articulo', name: 'Registro Articulos', type: 'link' },
      // { state: 'matricula-ficha', name: 'Ficha Matricula', type: 'link' },
    ],
  },
  {
    state: 'maestras',
    name: 'Maestras',
    type: 'sub',
    icon: 'home_repair_service',
    children: [
      { state: 'list-pais', name: 'Paises', type: 'link' },
      { state: 'list-aplicacion', name: 'Aplicaciones', type: 'link' },
      { state: 'list-plagas', name: 'Plagas', type: 'link' },
      { state: 'list-clases', name: 'Clases', type: 'link' },
      { state: 'list-cultivo', name: 'Cultivo', type: 'link' },
      { state: 'list-formulador', name: 'Formuladores', type: 'link' },
      { state: 'list-grupo-quimico', name: 'grupo quimico', type: 'link' },
      { state: 'list-tipo-producto', name: 'Tipo de Productos', type: 'link' },
      { state: 'list-tipo-documentos', name: 'Documentos', type: 'link' },
      { state: 'list-titular', name: 'Titular', type: 'link' },
      { state: 'list-toxicologica', name: 'Toxicologia', type: 'link' },
      // { state: 'matricula-ficha', name: 'Ficha Matricula', type: 'link' },
    ],
  },
  {
    state: 'reporte',
    name: 'Reportes',
    type: 'sub',
    icon: 'insert_chart',
    badge: [{ type: 'red', value: ':)' }],
    children: [
      { state: 'test', name: 'Por Formulacion', type: 'link' },
      { state: 'test', name: 'Composición', type: 'link' },
      { state: 'test', name: 'Plaga', type: 'link' },
      { state: 'test', name: 'Cultivo', type: 'link' },
    ],
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
