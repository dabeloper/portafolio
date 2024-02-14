import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SkillsComponent } from './components/skills/skills.component';
import { WorksComponent } from './components/works/works.component';
import { HireComponent } from './components/hire/hire.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarType } from './constants/navbar-type';
import { TranslateModule } from '@ngx-translate/core';
import { DabeloperService } from './services/dabeloper.service';
import { CookieService } from './services/cookie.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    SkillsComponent,
    WorksComponent,
    HireComponent,
    ContactComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public items$!: Observable<any[]>;
  title = 'DABELOPER';
  firestore = inject(Firestore);
  navbarType = NavbarType;

  constructor(dabeloper: DabeloperService, cookie: CookieService) {
    const DCookie = cookie.getCookie(environment.cookie.name);
    const DLStorage = localStorage.getItem(environment.cookie.name);
    if ( !!DCookie && !!DLStorage && parseInt(DCookie) > 90 ) {
      dabeloper.setData(JSON.parse(DLStorage));
    } else {
      const itemCollection = collection(this.firestore, environment.firestore.collectionName);
      this.items$ = collectionData(itemCollection);
      this.items$.forEach( data => {
        dabeloper.setData(data);
        localStorage.setItem(environment.cookie.name, JSON.stringify(data));
        cookie.setCookie({ 
          name:environment.cookie.name,
          value: data.length,
          secure: true,
          expireDays:10 });
      });
    }
  }
}
