import 'dotenv/config';
import express, { Express, Router } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// Interface para manejar las rutas
export interface HttpHandler {
  init(app: Router): void;
}

export class Server {
  #app: Express;

  constructor(port?: number) {
    this.#app = express();

    this.#app.use(morgan('dev'));
    this.#app.use(cors());
    this.#app.use(helmet());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    /* this.#app.use(this.#setRateLimit()); */

    this.#app.set('port', port || 3000 || process.env.PORT);
  }

  #setRateLimit() {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
    });
  }

  addHandler(handler: HttpHandler) {
    const apiSubRouter = Router({ mergeParams: true });
    handler.init(apiSubRouter);
    this.#app.use('/api', apiSubRouter);
  }

  run() {
    this.#app.listen(this.#app.get('port'), () => {
      console.log(
        `Server is running on http://localhost:${this.#app.get('port')}`
      );
    });
  }
}
