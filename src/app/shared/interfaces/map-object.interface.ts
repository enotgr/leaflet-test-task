import { Coordinates } from './coordinates.interface';

export interface MapObject {
  coordinates: Coordinates;
  name: string;
  description: string;
}
