import axios from 'axios';

import { IMapRepository, Maps, MapsPrediction } from '../domain/map';

export default class MapsRepository implements IMapRepository {
  async getPredictions(
    input: string,
    lat: number,
    lon: number,
    radius: number,
    country?: string
  ): Promise<MapsPrediction[]> {
    try {
      const baseUrl =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json';
      const params = {
        input,
        location: `${lat},${lon}`,
        radius: radius,
        key: process.env.GOOGLE_MAPS_API_KEY,
        components: `country:${country || 'EC'}`,
      };

      let mapsPredictions: MapsPrediction[] = [];
      const response = await axios.get(baseUrl, { params });

      if (response.status === 200) {
        mapsPredictions = response.data.predictions.map((prediction: any) => {
          return MapsPrediction.fromJson(prediction);
        });
        return mapsPredictions;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  async getPlaceDetailsByPlaceId(placeId: string): Promise<Maps> {
    try {
      const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
      const params = {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API_KEY,
        // Parametros a obtener, es necesario para no generar muchos costos
        fields: 'name,formatted_address,geometry,place_id',
      };
      const response = await axios.get(baseUrl, { params });

      let maps: Maps[] = [];
      if (response.status === 200) {
        return Maps.fromJson(response.data.result);
      } else {
        return new Maps();
      }
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  async getPlaceByCoordinates() {
    try {
      const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    } catch (error) {}
  }
}
