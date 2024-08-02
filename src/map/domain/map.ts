export class MapsPrediction {
  description: string;
  place_id: string;

  constructor() {
    this.description = '';
    this.place_id = '';
  }

  static fromJson(json: any): MapsPrediction {
    const prediction = new MapsPrediction();
    prediction.description = json.description || '';
    prediction.place_id = json.place_id || '';
    return prediction;
  }
}

export class Maps {
  name?: string;
  place_id: string;
  address: string;
  lat: number;
  lng: number;

  constructor() {
    this.name = '';
    this.place_id = '';
    this.address = '';
    this.lat = 0;
    this.lng = 0;
  }

  static fromJson(json: any): Maps {
    const map = new Maps();
    map.name = json.name || '';
    map.place_id = json.place_id || '';
    map.address = json.formatted_address || '';
    map.lat = json.geometry.location.lat || 0;
    map.lng = json.geometry.location.lng || 0;
    return map;
  }
}

export interface IMapRepository {
  getPredictions(
    input: string,
    lat: number,
    lon: number,
    radius: number
  ): Promise<MapsPrediction[]>;
  getPlaceDetailsByPlaceId(placeId: string): Promise<Maps>;
}

export interface IMapUseCase {
  getPredictions(
    input: string,
    lat: number,
    lon: number,
    radius: number
  ): Promise<MapsPrediction[]>;
  getPlaceDetailsByPlaceId(placeId: string): Promise<Maps>;
}
