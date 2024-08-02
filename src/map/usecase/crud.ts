import {
  IMapRepository,
  IMapUseCase,
  Maps,
  MapsPrediction,
} from '../domain/map';

export default class MapUC implements IMapUseCase {
  #mapRepository: IMapRepository;

  constructor(mapRepository: IMapRepository) {
    this.#mapRepository = mapRepository;
  }

  async getPredictions(
    input: string,
    lat: number,
    lon: number,
    radius: number
  ): Promise<MapsPrediction[]> {
    try {
      const mapsPredictions = await this.#mapRepository.getPredictions(
        input,
        lat,
        lon,
        radius
      );
      return mapsPredictions;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }

  async getPlaceDetailsByPlaceId(placeId: string): Promise<Maps> {
    try {
      return await this.#mapRepository.getPlaceDetailsByPlaceId(placeId);
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
