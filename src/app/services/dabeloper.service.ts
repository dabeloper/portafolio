import { Injectable } from '@angular/core';
import { Countries } from '../constants/country';
import { Timezones } from '../constants/timezone';
import { DataModel } from '../models/data.model';
import { Lang } from '../constants/langs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DabeloperService {

	private skillsEn!: DataModel[];
	private skillsEs!: DataModel[];
	private worksEn!: DataModel[];
	private worksEs!: DataModel[];
	private talentsEn!: DataModel[];
	private talentsEs!: DataModel[];

  	constructor( private translate: TranslateService) { }

	getShortCountry(): string {
		const timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (timezone === "" || !timezone) {
			return '';
		}
		const _country: string = Timezones[timezone]?.c[0];
		return _country || 'US';
	}

  	getCountry( _country?: string ): string{
		const country = Countries[ _country || this.getShortCountry()];
		return country;
	}

	getState(): string{
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if (timezone === "" || !timezone) {
			return '';
		}
		const state = timezone.split("/")[1].replace("_", " ")
		return state
	}

	setData ( data: DataModel[] ): void {
		this.skillsEn = data.filter( skill => (skill.type === 'skill' && skill.lang === Lang.EN) );
		this.skillsEs = data.filter( skill => (skill.type === 'skill' && skill.lang === Lang.ES) );
		this.worksEn = data.filter( work => (work.type === 'work' && work.lang === Lang.EN) ).sort( (a, b ) => Number(a.id) - Number(b.id) );
		this.worksEs = data.filter( work => (work.type === 'work' && work.lang === Lang.ES) ).sort( (a, b ) => Number(a.id) - Number(b.id) );
		this.talentsEn = data.filter( talent => (talent.type === 'talent' && talent.lang === Lang.EN) ).sort( (a, b ) => Number(a.id) - Number(b.id) );
		this.talentsEs = data.filter( talent => (talent.type === 'talent' && talent.lang === Lang.ES) ).sort( (a, b ) => Number(a.id) - Number(b.id) );
	}

	get skills(): DataModel[] {
		if ( this.translate.currentLang == 'es' ) {
			return this.skillsEs;
		} else {
			return this.skillsEn;
		}
	}

	get works(): DataModel[] {
		if ( this.translate.currentLang == 'es' ) {
			return this.worksEs;
		} else {
			return this.worksEn;
		}
	}

	get talents(): DataModel[] {
		if ( this.translate.currentLang == 'es' ) {
			return this.talentsEs;
		} else {
			return this.talentsEn;
		}
	}
}
