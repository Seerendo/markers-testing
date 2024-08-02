import { Express, Router, Request, Response } from 'express';
import fs from 'node:fs';
import MapUC from '../usecase/crud';
import { HttpHandler } from '../../app/server';

export default class MapHandler implements HttpHandler {
  #mapUC: MapUC;

  constructor(mapUC: MapUC) {
    this.#mapUC = mapUC;
  }

  init(apiInstance: Express) {
    const subRouter = Router({ mergeParams: true });

    // Rutas de prueba para el mapa de calor (traer de base de datos)
    subRouter.get('/heatMap', async (req, res) => {
      const a = await fs.promises.readFile('src/data/heatMap.json', 'utf8');
      const data = fs.readFileSync('src/data/heatMap.json', 'utf8');
      res.status(200).json(JSON.parse(a));
    });
    // Predicciones de google maps
    subRouter.post('/predictions', async (req, res) =>
      this.getPredictions(req, res)
    );
    // Detalles de un lugar por place_id
    subRouter.post('/place/:place_id', async (req, res) =>
      this.getPlaceDetails(req, res)
    );
    /**
     * Función para calcular la distancia entre dos puntos usando la fórmula de Haversine
     * @param lat1 Latitud del primer punto (usuario)
     * @param lon1 Longitud del primer punto (usuario)
     * @param lat2 Latitud del segundo punto (ubicacion)
     * @param lon2 Longitud del segundo punto (ubicacion)
     * @returns
     */
    function calcularDistancia(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number {
      const R = 6371e3; // Radio de la Tierra en metros
      const φ1 = lat1 * (Math.PI / 180);
      const φ2 = lat2 * (Math.PI / 180);
      const Δφ = (lat2 - lat1) * (Math.PI / 180);
      const Δλ = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distancia = R * c; // Distancia en metros
      return distancia;
    }
    // Uso posterior para obtener usuarios cercanos
    subRouter.post('/users', async (req, res) => {
      // Tiene que traer usuarios cercanos a las coordenadas recibidas [lat, lon]
      const { lat, lon } = req.body;
      console.log(lat, lon);
      const user = [
        {
          lat: -1.054246,
          lon: -80.454585,
          gender: 'M',
        },
        {
          lat: -1.064658,
          lon: -80.454585,
          gender: 'M',
        },
        {
          lat: -1.062469,
          lon: -80.448394,
          gender: 'F',
        },
        {
          lat: -1.072469,
          lon: -80.448251,
          gender: 'B',
        },
        {
          lat: -0.949326,
          lon: -80.740538,
          gender: 'B',
        },
      ];
      const newabyUsers = user.filter(
        (u) => calcularDistancia(lat, lon, u.lat, u.lon) < 5000
      );
      res.status(200).json(newabyUsers);
    });
    // Uso posterior para obtener usuarios cercanos
    subRouter.get('/establishment', async (req, res) => {
      // Tiene que traer establecimientos cercanos a las coordenadas recibidas [lat, lon]
      const { lat, lon } = req.body;
      console.log(lat, lon);
      const establishment = [
        {
          lat: -1.056893,
          lon: -80.459028,
          image:
            'https://pbs.twimg.com/profile_images/1313608145156157440/qDCZb6ui_400x400.jpg',
          name: 'KFC',
          type: 'Restaurant',
        },
        {
          lat: -1.062339,
          lon: -80.448293,
          image:
            'https://pbs.twimg.com/profile_images/1807772799106260992/PGeEgfB6_400x400.jpg',
          name: 'McDonalds',
          type: 'Restaurant',
        },
        {
          lat: -1.057588,
          lon: -80.451295,
          image:
            'https://pbs.twimg.com/profile_images/1765833238566608896/FXBy66vr_400x400.jpg',
          name: 'Pizza Hut',
          type: 'Restaurant',
        },
        {
          lat: -0.949401,
          lon: -80.740522,
          image:
            'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=HOtXrEJv4AIGCF2AK-Ww-A&cb_client=search.gws-prod.gps&w=408&h=240&yaw=111.22012&pitch=0&thumbfov=100',
          name: 'El Bosque',
          type: 'Restaurant',
        },
        {
          lat: -0.949186,
          lon: -80.741466,
          image:
            'https://lh5.googleusercontent.com/p/AF1QipOoxXZateEL9EGMjbAMW_rgmh00AQymIj7uEn1l=w408-h306-k-no',
          name: 'Europcar Car Rental Manta Ciudad',
          type: 'Restaurant',
        },
      ];
      /* const newabyEstablishment = establishment.filter(
        (u) => calcularDistancia(lat, lon, u.lat, u.lon) < 5000
      ); */
      res.status(200).json(establishment);
    });

    apiInstance.use('/maps', subRouter);
  }

  async getPredictions(req: Request, res: Response) {
    try {
      const { input, lat, lon, radius } = req.body;
      const predictions = await this.#mapUC.getPredictions(
        input,
        lat,
        lon,
        radius
      );
      res.status(200).json(predictions);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getPlaceDetails(req: Request, res: Response) {
    try {
      const { place_id } = req.params;
      this.#mapUC.getPlaceDetailsByPlaceId(place_id).then((place) => {
        res.status(200).json(place);
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
