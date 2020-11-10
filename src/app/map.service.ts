import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as L from 'leaflet';
import { MapMarker } from './shared/classes/map-marker.model';
import { MapObject } from './shared/interfaces/map-object.interface';
import { MapConfig } from './map.config';
import { Coordinates } from './shared/interfaces/coordinates.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly http: HttpClient;

  map: L.map;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getMarkers(): Observable<MapMarker[]> {
    return this.http
      .get<MapObject[]>('/data')
      .pipe(
        map((mapObjects) =>
          mapObjects.map((mapObject) =>
            this.createMapMarkerByMapObject(mapObject)
          )
        )
      );
  }

  createMapMarkerByMapObject(mapObject: MapObject): MapMarker {
    const icon = L.icon({
      iconUrl: MapConfig.markers.defaultIconUrl,
      iconAnchor: MapConfig.markers.iconAnchor,
    });
    const lat = mapObject.coordinates.latitude;
    const lon = mapObject.coordinates.longitude;

    const leafletMarker = L.marker([lat, lon], { icon });

    const mapMarker = new MapMarker(mapObject, leafletMarker);

    return mapMarker;
  }

  initMap(): void {
    this.map = L.map(MapConfig.map.id);
    this.map.setView(MapConfig.map.coordinates, MapConfig.map.level);

    const tiles = L.tileLayer(MapConfig.tiles.openStreetMapTileUrl, {
      maxZoom: MapConfig.tiles.options.maxZoom,
      attribution: MapConfig.tiles.options.attribution,
    });

    tiles.addTo(this.map);
  }

  createMarkersOnMap(mapMarkers: MapMarker[]) {
    mapMarkers.forEach((mapMarker: MapMarker) => {
      this.addMarkerOnMap(mapMarker, mapMarkers);
    });
  }

  addMarkerOnMap(mapMarker: MapMarker, mapMarkers: MapMarker[]) {
    mapMarker.leafletMarker.on(
      'click',
      this.onClickMarker.bind(this, mapMarker, mapMarkers)
    );

    mapMarker.leafletMarker.addTo(this.map);
  }

  removeMarker(leafletMarker: L.marker) {
    this.map.removeLayer(leafletMarker);
  }

  setViewMap(coordinates: Coordinates) {
    this.map.setView([coordinates.latitude, coordinates.longitude]);
  }

  private onClickMarker(mapMarker: MapMarker, mapMarkers: MapMarker[]) {
    mapMarkers.forEach((marker: MapMarker) => {
      if (marker.isActive) {
        marker.toggleMarker();
      }
    });

    mapMarker.toggleMarker(true);

    this.setViewMap(mapMarker.mapObject.coordinates);
  }
}
