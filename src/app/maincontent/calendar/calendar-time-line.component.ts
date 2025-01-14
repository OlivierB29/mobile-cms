import { Component, AfterViewInit, Input, OnInit } from '@angular/core';


import { ReadService } from 'src/app/shared/services/read.service';


import { HttpClient } from '@angular/common/http';
import { Log } from 'src/app/shared/services/log.service';

import { RouteUtilService, DateUtilService } from 'src/app/shared/services';

import { ActivityService } from '../activity';


@Component({

    selector: 'app-calendar-time-line',
    templateUrl: 'calendar-time-line.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css']
})
export class CalendarTimeLineComponent  {

  @Input() items: any[] = <any>[];

  days: any[] = <any>[];


  type = 'calendar';


  constructor(protected dataService: ReadService,
    protected http: HttpClient,
    protected log: Log,
    private routeUtil: RouteUtilService,
    protected dateutil: DateUtilService,
    protected activityService : ActivityService) {
    // Add an empty item in order to display something.
    // Considering that IO operations are slow, it constructs a raw frame for the end user.
  //  this.items.push({ id: '', activity: '.....', title: '.... .... ........', date: '..-..-....' });
  this.dateutil.setLang('fr');
  }



  findEndDate(): Date {
    let date: Date ;
    if (this.items && this.items.length > 0 && this.items[this.items.length - 1].date) {
      date = new Date(this.items[this.items.length - 1].date);
    } else {
     date = new Date();
    }
    // calculate last day of month
    date.setMonth(date.getMonth() + 1);
    date = this.dateutil.getLastDayOfMonth(date);

    return date;
  }



  getDayContent(day: Date): any {
    return { date: day,
       name: this.dateutil.getDayShort(day.getDay()),
       number: day.getDate(),
       monthnumber: day.getMonth(),
       monthname: this.dateutil.getMonthName(day.getMonth()),
       items: this.items.filter(obj => this.dateutil.dateMatch(obj, day))
     };
  }

  getDayLineClass(date: Date) {
    let result = date.getDay() === 0 ? 'endofweekline' : 'dayline';

    if ( this.dateutil.isWeekEndDate(date) ) {
      result += ' weekend';
    }

    return result;
  }



    /**
    * get URL for current locale.
    */
    getUrl(item : any): string {
      return  'detail/' + item.id;
    }



  getShortTitle(item: any): string {
    let result = '';
    const size = 10;
    if (item.activity) {
      result += item.activity.toUpperCase() + ' ';
    }
    if (item.title) {
    result = item.title;
    if ( result.length > size) {
      result = result.substring(0, size);
      result += '...';
    } else {
      result = result;
    }
    }
    return result;
  }

  getCellStyle(month: number) {
    return month % 2 ? 'monthCell1' : 'monthCell2';
  }

}
