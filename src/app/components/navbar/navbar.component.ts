import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavbarType } from '../../constants/navbar-type';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navbarType = NavbarType;
  @Input() type!: number;

  constructor( private analyticsFirebase: AnalyticsService) {}

  get analytics(): AnalyticsService {
    return this.analyticsFirebase;
  }
}
