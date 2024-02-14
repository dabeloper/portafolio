import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DabeloperService } from '../../services/dabeloper.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent {
  txtTruncate: Boolean[];
  slides: string[] = [
    'slider--item-right',
    'slider--item-center',
    'slider--item-left',
  ];
  constructor ( public dabeloper: DabeloperService,
                private analytics: AnalyticsService
              ) {
    this.txtTruncate = new Array(this.dabeloper.works?.length);
  }

  getSliderClass(i: number): string {
    if ( !this.dabeloper.works[i].style ) {
      this.dabeloper.works[i].style = {
        class: 'slider--item ' + (this.slides.pop() || '')
      };
    }
    return this.dabeloper.works[i].style?.class || '';
  }

  readMore(i: number): void {
    this.txtTruncate[i] = true;
    const work = this.dabeloper.works[i];
    this.analytics.trackWorkClicked(work);
  }

  getWorkDescription(i: number): string {
    if (!this.txtTruncate[i]) {
      return this.dabeloper.works[i].content.description.substring(0,78) + '... ';
    } else {
      return this.dabeloper.works[i].content.description;
    }
  }
}
