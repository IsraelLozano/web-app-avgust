import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-dialog',
  templateUrl: './button-dialog.views.html',
  styleUrls: ['./button-dialog.views.scss'],
})
export class ButtonDialogViews implements OnInit {
  @Input() label: string = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant:
    | 'basic'
    | 'raised'
    | 'flat'
    | 'stroked'
    | 'icon'
    | 'fab'
    | 'mini-fab'
    | undefined;
  @Input() class: string | undefined;
  @Input() color: 'primary' | 'accent' | 'warn' | '' | undefined;
  @Input() tooltip: string = '';
  @Input() icon: string | undefined;
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  constructor() {}

  ngOnInit(): void {}

  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.click.emit(event);
    }
  }
}
