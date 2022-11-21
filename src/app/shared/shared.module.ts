import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective],
  exports: [AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, DialogModule],
  providers: [MenuItems, HorizontalMenuItems],
})
export class SharedModule {}
