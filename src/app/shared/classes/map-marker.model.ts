import * as L from 'leaflet';
import { MapConfig } from 'src/app/map.config';
import { MapObject } from '../interfaces/map-object.interface';

export class MapMarker {
  readonly mapObject: MapObject;
  readonly leafletMarker: L.marker;

  isActive: boolean;

  constructor(mapObject: MapObject, leafletMarker: L.marker) {
    this.mapObject = mapObject;
    this.leafletMarker = leafletMarker;

    this.isActive = false;
  }

  toggleMarker(activate: boolean = false) {
    const iconUrl = activate
      ? MapConfig.markers.activeIconUrl
      : MapConfig.markers.defaultIconUrl;

    const icon = L.icon({ iconUrl });

    this.leafletMarker.setIcon(icon);

    this.isActive = activate;
  }
}
