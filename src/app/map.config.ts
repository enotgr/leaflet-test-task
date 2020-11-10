export const MapConfig = {
  map: {
    id: 'map',
    coordinates: [59.937301, 30.310901],
    level: 13,
  },
  tiles: {
    openStreetMapTileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  markers: {
    activeIconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    defaultIconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    iconAnchor: [12, 41],
  },
};
