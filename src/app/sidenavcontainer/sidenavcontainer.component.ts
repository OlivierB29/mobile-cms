import { Component, OnInit } from '@angular/core';
import { ConfService } from '../shared/services/conf.service';
import { environment } from '../../environments/environment';
@Component({
  moduleId: module.id,
  selector: 'app-sidenav-container',
  templateUrl: 'sidenavcontainer.component.html',
  styleUrls: ['sidenavcontainer.component.css']
})
export class SidenavcontainerComponent implements OnInit {

    title = '';

      /*

      https://material.angular.io/components/component/sidenav
      */
      menuMode: string;

      /*
      opened
      https://www.npmjs.com/package/@angular2-material/sidenav
      */
      menuOpened: boolean;


      mobileLayout: boolean;

  constructor(private conf: ConfService) { }

  ngOnInit() {





        const layout = this.conf.getLayout();

        this.mobileLayout = layout !== 'desktop';

        switch (layout) {
          case 'desktop':
            this.menuMode = 'side';
            this.menuOpened = true;

            break;
          default:
            this.menuMode = 'over';
            this.menuOpened = false;

        }

        if (this.mobileLayout) {
          this.title = environment.title;
        } else {
          this.title = environment.fulltitle;
        }

  }

  getBackDropCss(): string {
    return 'my-mat-sidenav-backdrop my-mat-sidenav-shown';
  }


}