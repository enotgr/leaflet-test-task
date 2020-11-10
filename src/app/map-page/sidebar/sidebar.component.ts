import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MapService } from 'src/app/map.service';
import { MapMarker } from 'src/app/shared/classes/map-marker.model';
import { MapObject } from 'src/app/shared/interfaces/map-object.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  private readonly mapService: MapService;

  form: FormGroup;

  isModalOpen: boolean;

  filterValue: string;

  @Input() mapMarkers: MapMarker[];

  constructor(mapService: MapService) {
    this.mapService = mapService;
    this.isModalOpen = false;
    this.filterValue = '';
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      latitude: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
    });
  }

  onSelectObject(mapMarker: MapMarker) {
    this.mapMarkers.forEach((marker: MapMarker) => {
      if (marker.isActive) {
        marker.toggleMarker();
      }
    });

    mapMarker.toggleMarker(true);

    this.mapService.setViewMap(mapMarker.mapObject.coordinates);
  }

  onRemoveObject(event: Event, mapMarker: MapMarker) {
    event.stopPropagation();

    const isConfirm = confirm(
      `Do you want to delete "${mapMarker.mapObject.name}"?`
    );

    if (!isConfirm) {
      return;
    }

    this.mapService.removeMarker(mapMarker.leafletMarker);

    const index = this.mapMarkers.findIndex((marker) => marker === mapMarker);
    this.mapMarkers.splice(index, 1);
  }

  checkFilter(mapMarker: MapMarker): boolean {
    return mapMarker.mapObject.name
      .toLowerCase()
      .includes(this.filterValue.toLowerCase());
  }

  onFilterInput(value) {
    this.filterValue = value;
  }

  onOpenModal() {
    this.isModalOpen = true;
  }

  onSubmit() {
    const mapObject: MapObject = {
      name: this.form.value.name,
      description: this.form.value.description,
      coordinates: {
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
      },
    };

    const mapMarker = this.mapService.createMapMarkerByMapObject(mapObject);
    this.mapMarkers.push(mapMarker);

    this.mapService.addMarkerOnMap(mapMarker, this.mapMarkers);
    this.mapService.setViewMap(mapObject.coordinates);

    this.onSelectObject(mapMarker);

    this.form.reset();
    this.isModalOpen = false;
  }

  onCancelModal() {
    this.form.reset();
    this.isModalOpen = false;
  }
}
