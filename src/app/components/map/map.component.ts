import { Component } from '@angular/core';
import 'leaflet';
import * as L from 'leaflet';
import { AnalyticsService } from '../../services/analytics.service';
L.Icon.Default.imagePath = 'assets/leaflet/';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  private map: any;
  private market: any;

  constructor(private analytics: AnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
  
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: L.latLng( 3.433439, -76.525363 ),
      zoom: 13,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: true,
      layers: [
        L.tileLayer(
          "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}  ",
          {maxZoom: 18, minZoom: 3, attribution: 'Google'})
      ]
    });
    this.map.on('click', (e: any) => {
      const coord = e?.latlng;
      this.analytics.trackContactMap(coord?.lat, coord?.lng);
      this.market.setLatLng(coord);
    });
    this.market = new L.Marker([3.435897780762105, -76.56483650207521]).addTo(this.map);
  }

}
