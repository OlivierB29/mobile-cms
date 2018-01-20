import { Component, OnInit, Input, Inject } from '@angular/core';

import { MediaComponent } from '../article/media.component';
import { ReadService } from 'app/shared/services';
import { Log } from 'app/shared/services/log.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { RouteUtilService, MediaService } from 'app/shared/services';
import { ImageService } from 'app/maincontent/image';


@Component({
  moduleId: module.id,
  selector: 'app-calendarpreview',
  templateUrl: 'calendarpreview.component.html',
  styleUrls: ['calendarpreview.component.css', '../article/article.css', '../article/articlepreview.css']
})
export class CalendarPreviewComponent   implements OnInit {

  @Input() type: string;


  @Input() id: string;

  @Input() item: any;

  @Input() media = 'media';

  @Input() show = '';

  maxPreviewLength = 240;

  offset = 100;
  defaultImage = environment.server + '/' + environment.public +  '/resources/ring-alt-32.svg';

  image: any ;
  url = '';

  constructor(
    private log: Log,
    private readService: ReadService,
    private mediaService: MediaService,
    private http: HttpClient,
    private routeUtil: RouteUtilService,
    private imageService: ImageService
 ) {
 }


  ngOnInit() {

    if (!this.type) {
      throw new Error('Empty type');
    }

    if (this.item) {
      this.log.debug('CalendarPreviewComponent: ' + this.item.id);
    } else  {


      if (!this.id) {
        throw new Error('Empty id');
      }
      this.log.debug('CalendarPreviewComponent : ' + this.id);


      this.http.get<any>(this.readService.getUrl(this.type, this.id))
                .subscribe((data: any) => {
                  this.item = data;
                  this.item.media = this.mediaService.initMediaUrl(this.type, this.id, this.item.media, this.media);

                   if (this.getImages() && this.getImages().length > 0) {
                     this.image = this.getImages()[0];
                   }

                });

    }


  }


  getUrl(): string {
    // TODO issue with baseHref
    return '/#/' + this.routeUtil.getCalendarRoute(environment.defaultlocale) + '/detail/' + this.item.id;
  }

  getItem(): any {
    return this.item;
  }

  getPreviewDescription(): string {
    let result = '';
    if (this.item.description.length > this.maxPreviewLength) {
      result = this.item.description.substring(0, this.maxPreviewLength) + ' ...';
    } else {
      result = this.item.description;
    }
    return result;

  }

  public getThumbnail(picture: any): string {

    return this.imageService.getThumbnail(environment.server, this.type + '/' + this.item.id, picture);
  }

  getImages(): any[] {
    return this.mediaService.getImages(this.getItem());
  }

  getAttachments(): any[] {
    return this.mediaService.getAttachments(this.getItem());
  }
}
