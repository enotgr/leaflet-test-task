import { AfterViewInit, Component, Input } from '@angular/core';
import { MapConfig } from 'src/app/map.config';
import { MapService } from 'src/app/map.service';
import { MapMarker } from 'src/app/shared/classes/map-marker.model';

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.css'],
})
export class MapLeafletComponent implements AfterViewInit {
  private readonly mapService: MapService;

  @Input() mapMarkers: MapMarker[];

  leafletMapId: string;

  constructor(mapService: MapService) {
    this.mapService = mapService;

    this.leafletMapId = MapConfig.map.id;
  }

  ngAfterViewInit(): void {
    this.mapService.initMap();

    this.addMarkersOnMap();
  }

  private addMarkersOnMap() {
    this.mapService.createMarkersOnMap(this.mapMarkers);
  }
}
