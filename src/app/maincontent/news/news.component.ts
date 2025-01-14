
import { Component, AfterViewInit, Input, OnInit } from '@angular/core';


import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { BrowserService } from 'src/app/shared/services';

@Component({

  selector: 'app-my-news-component',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {

  index: any[] = <any>[];

  items: any[] = <any>[];

  errorMessage: any;

  @Input() max = 1;

  type = 'news';


  constructor(
    private dataService: ReadService,
    private log: Log,
    private http: HttpClient
  ) {

    // initialize the component with empty values.
    // When using a low bandwith network, the goal is to display something during load.
    if (this.max > 0) {
      const emptyItem = { id: '' };
      while (this.items.length < this.max) {
        this.items.push(emptyItem);
      }

    }
  }

  ngOnInit(): void {

    let dbItems;
    this.http.get<any>(this.dataService.getIndexUrl(this.type))
          .subscribe((data: any[]) => {
            dbItems = data;


            if (this.max > 0 && dbItems.length > this.max) {
              dbItems = dbItems.slice(0, this.max);
            }

            // purge unnecessary empty items
            if (this.items.length > dbItems.length) {
                  this.items = this.items.filter(it => it.id !== '' );
            }

            // replace or add new items
            for (let i = 0; i < dbItems.length; i++) {
              if (this.items.length > i) {
                this.items[i] = dbItems[i];
              } else {
                this.items.push(dbItems[i]);
              }
            }
          });



    this.log.debug('NewsComponent ' + this.type + ' ' + this.items.length);


  }

      /**
    * get URL for current locale.
    */
       getUrl(item : any): string {
        return  'news/' + item.id;
      }
  

}
