"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const map_1 = require("../domain/map");
class MapsRepository {
    getPredictions(input, lat, lon, radius, country) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
                const params = {
                    input,
                    location: `${lat},${lon}`,
                    radius: radius,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                    components: `country:${country || 'EC'}`,
                };
                let mapsPredictions = [];
                const response = yield axios_1.default.get(baseUrl, { params });
                if (response.status === 200) {
                    mapsPredictions = response.data.predictions.map((prediction) => {
                        return map_1.MapsPrediction.fromJson(prediction);
                    });
                    return mapsPredictions;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                throw new Error('Method not implemented.');
            }
        });
    }
    getPlaceDetailsByPlaceId(placeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
                const params = {
                    place_id: placeId,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                    // Parametros a obtener, es necesario para no generar muchos costos
                    fields: 'name,formatted_address,geometry,place_id',
                };
                const response = yield axios_1.default.get(baseUrl, { params });
                let maps = [];
                if (response.status === 200) {
                    return map_1.Maps.fromJson(response.data.result);
                }
                else {
                    return new map_1.Maps();
                }
            }
            catch (error) {
                throw new Error('Method not implemented.');
            }
        });
    }
    getPlaceByCoordinates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
            }
            catch (error) { }
        });
    }
}
exports.default = MapsRepository;
