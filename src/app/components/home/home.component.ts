import { AfterViewInit, Component } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { DabeloperService } from '../../services/dabeloper.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgxTypedJsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  typings!: string[];
  userCountry = "";
  userShortCountry = '';
  constructor(  svc: DabeloperService,
                private translate: TranslateService,
                private analyticsFirebase: AnalyticsService ) {

    this.userShortCountry = svc.getShortCountry()?.toUpperCase();
    this.userCountry = svc.getCountry(this.userShortCountry);
    const userLang = navigator.language;
    if ( userLang?.indexOf('es') === 0 ) {
      translate.use('es');
      translate.setDefaultLang('es');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.typings = [
        this.translate.instant("home.typings.one"),
        this.translate.instant("home.typings.two"),
        this.translate.instant("home.typings.three"),
        this.translate.instant("home.typings.four"),
        this.translate.instant("home.typings.five"),
        this.translate.instant("home.typings.six"),
        this.translate.instant("home.typings.seven"),
      ], 1000
    );
  }

  get analytics(): AnalyticsService {
    return this.analyticsFirebase;
  }
  
}
