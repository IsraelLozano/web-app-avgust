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
      { state: 'test', name: 'Registro de Usuario', type: 'link' },
      { state: 'test', name: 'Perfil de usuario', type: 'link' },
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
