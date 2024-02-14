import { AfterViewInit, Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { DataModel } from '../../models/data.model';
import { CommonModule } from '@angular/common';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { TranslateService } from '@ngx-translate/core';
import { DabeloperService } from '../../services/dabeloper.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    NgxTypedJsModule,
    CarouselComponent,

  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {
  public selectedCard?: DataModel;
  public typings!: string[];

  constructor(private translateSvc: TranslateService,
              public dabeloper: DabeloperService,
              private analytics: AnalyticsService) {}

  ngAfterViewInit(): void {
    setTimeout(
      () => this.typings = [
        this.translateSvc.instant("skills.typings.one")
      ], 1000
    );
  }

  selected( card: DataModel ): void {
    this.selectedCard = card;
    this.analytics.trackSkillClicked(card);
  }
}
