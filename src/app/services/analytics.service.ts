import { Injectable, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { AnalyticsEvents } from '../constants/analytics';
import { DataModel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analytics: Analytics = inject(Analytics);

  constructor() { }

  trackSideBarHome(): void {
    logEvent(this.analytics, AnalyticsEvents.SIDEBAR_HOME);
  }
  trackSideBarSkills(): void {
    logEvent(this.analytics, AnalyticsEvents.SIDEBAR_SKILLS);
  }
  trackSideBarWorks(): void {
    logEvent(this.analytics, AnalyticsEvents.SIDEBAR_WORKS);
  }
  trackSideBarCheckList(): void {
    logEvent(this.analytics, AnalyticsEvents.SIDEBAR_CHECKLIST);
  }
  trackSideBarContact(): void {
    logEvent(this.analytics, AnalyticsEvents.SIDEBAR_CONTACT);
  }
  trackMenuHome(): void {
    logEvent(this.analytics, AnalyticsEvents.MENU_HOME);
  }
  trackMenuSkills(): void {
    logEvent(this.analytics, AnalyticsEvents.MENU_SKILLS);
  }
  trackMenuWorks(): void {
    logEvent(this.analytics, AnalyticsEvents.MENU_WORKS);
  }
  trackMenuCheckList(): void {
    logEvent(this.analytics, AnalyticsEvents.MENU_CHECKLIST);
  }
  trackMenuContact(): void {
    logEvent(this.analytics, AnalyticsEvents.MENU_CONTACT);
  }
  trackHomeBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.HOME_PINGME);
  }
  trackSkillClicked( skill: DataModel): void {
    logEvent(this.analytics, AnalyticsEvents.SKILL_CLICKED, {
      id: skill.id,
      title: skill.content.title
    });
  }
  trackWorkClicked( work: DataModel): void {
    logEvent(this.analytics, AnalyticsEvents.WORK_CLICKED, {
      id: work.id,
      title: work.content.title
    });
  }
  trackCheckListSelected( option: DataModel): void {
    logEvent(this.analytics, AnalyticsEvents.CHECKLIST_SELECTED, {
      id: option.id,
      title: option.content.title
    });
  }
  trackCheckListValidateBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CHECKLIST_VALIDATE);
  }
  trackCheckListCheckAgainBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CHECKLIST_CHECK_AGAIN);
  }
  trackContactEmailBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_EMAIL);
  }
  trackContactLinkedinBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_LINKEDIN);
  }
  trackContactIGBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_INSTAGRAM);
  }
  trackContactFBBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_INSTAGRAM);
  }
  trackContactXBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_TWITTER);
  }
  trackContactGHBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_GITHUB);
  }
  trackContactMeBtn(): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_CONTACTME);
  }
  trackContactMap(lat: string, lng: string): void {
    logEvent(this.analytics, AnalyticsEvents.CONTACT_MAP, {
      lat,
      lng
    });
  }
}
