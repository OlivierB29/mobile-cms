import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ActivityButtonComponent } from './';


import { ImageModule } from 'src/app/maincontent/image/image.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityService } from './activity.service';

@NgModule({
    imports: [
      CommonModule,

      RouterModule,
      ImageModule,
      SharedModule,
    ],
    declarations: [
      ActivityButtonComponent,

    ],
    providers: [
      ActivityService,
    ],

    exports: [
      ActivityButtonComponent,
    ],

})
export class ActivityModule {
}
