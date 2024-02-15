import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { DataModel } from '../../models/data.model';
declare var $: any;

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterViewInit {
  private libLoaded = false;
  @Input() cards?: DataModel[];
  @Output() selectedCardEmitter: EventEmitter<DataModel> = new EventEmitter<DataModel>();

  ngAfterViewInit() {
    this.importScript();
  }

  importScript(): void {
    if ( !this.cards ) {
      setTimeout( () => { this.importScript(); }, 2000 );
    } else if ( !this.libLoaded ) {
      this.libLoaded = true;
      $.getScript('assets/js/carousel.js', function(){});
    }
  }

  showDetail(card: DataModel): void {
    this.selectedCardEmitter.emit(card);
  }
}
