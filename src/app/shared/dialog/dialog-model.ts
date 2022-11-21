export class ButtonOptions {
  text: string = '';
  icon?: string = '';
  color?: 'primary' | 'accent' | 'warn' | '' = '';
  variant?: 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab' = 'basic';
}

export interface AlertOptions {
  title?: string;
  message: string;
  button?: ButtonOptions;
  validations?: Details[];
  // validations: string;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  buttonCancel?: ButtonOptions;
  buttonOk?: ButtonOptions;
}

export interface OpenComponentOptions {
  hasBackdrop?: boolean;
  disableClose?: boolean;
  autoFocus?: boolean;
  data?: any;
  id?: string;
}

export interface Details {
  code: string;
  message: string[];
}
