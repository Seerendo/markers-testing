import { Server } from './app/server';
import MapHandler from './map/delivery/http';
import MapsRepository from './map/repository/repository';
import MapUC from './map/usecase/crud';

const server = new Server(3000);

async function main() {
  server.run();
}

const mapRepo = new MapsRepository();
const mapUC = new MapUC(mapRepo);
const mapHandler = new MapHandler(mapUC);

server.addHandler(mapHandler);

main();
