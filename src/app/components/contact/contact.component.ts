import {  Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MapComponent } from '../map/map.component';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TranslateModule,
    MapComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor ( private analyticsFirebase: AnalyticsService ) {}
  get analytics(): AnalyticsService {
    return this.analyticsFirebase;
  }
}
