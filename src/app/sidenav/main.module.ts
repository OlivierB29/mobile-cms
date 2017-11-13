import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CalendarModule } from 'app/maincontent/calendar/calendar.module';
import { NewsModule } from 'app/maincontent/news/news.module';
import { SidenavcontainerComponent, SidenavComponent, MenubuttonComponent, HomeComponent, BannerComponent  } from './';
import { FooterComponent } from './footer/footer.component';
import { FeaturedComponent } from './featured/featured.component';
import { MenuService } from './menu.service';
import { ImageModule } from 'app/maincontent/image/image.module';
import { mainRoutes } from './main.route';

@NgModule({
    imports: [
          CommonModule,
          RouterModule,
          ImageModule,
          SharedModule,
          CalendarModule,
          NewsModule,
      RouterModule.forRoot(mainRoutes, { useHash: true })
    ],
    declarations: [
      BannerComponent,
      HomeComponent,
      MenubuttonComponent,
      SidenavComponent,
      SidenavcontainerComponent,
      FooterComponent,
      FeaturedComponent,
    ],
    providers: [
    MenuService,
    ],
    entryComponents: [
    ],
    exports: [
      HomeComponent,
      MenubuttonComponent,
      SidenavComponent,
      SidenavcontainerComponent
    ],

})
export class MainModule {
}
