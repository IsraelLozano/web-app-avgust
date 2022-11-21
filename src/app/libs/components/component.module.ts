import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingViews } from './loading/loading.views';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';

@NgModule({
  declarations: [LoadingViews, SigninRedirectCallbackComponent, SignoutRedirectCallbackComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class ComponentModule {}
