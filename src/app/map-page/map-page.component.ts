import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from '../map.service';
import { MapMarker } from '../shared/classes/map-marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
})
export class MapPageComponent implements OnInit {
  private readonly mapService: MapService;

  mapMarkers$: Observable<MapMarker[]>;

  constructor(mapService: MapService) {
    this.mapService = mapService;

    this.mapMarkers$ = null;
  }

  ngOnInit(): void {
    this.mapMarkers$ = this.mapService.getMarkers();
  }
}
