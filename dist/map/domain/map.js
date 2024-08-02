"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maps = exports.MapsPrediction = void 0;
class MapsPrediction {
    constructor() {
        this.description = '';
        this.place_id = '';
    }
    static fromJson(json) {
        const prediction = new MapsPrediction();
        prediction.description = json.description || '';
        prediction.place_id = json.place_id || '';
        return prediction;
    }
}
exports.MapsPrediction = MapsPrediction;
class Maps {
    constructor() {
        this.name = '';
        this.place_id = '';
        this.address = '';
        this.lat = 0;
        this.lng = 0;
    }
    static fromJson(json) {
        const map = new Maps();
        map.name = json.name || '';
        map.place_id = json.place_id || '';
        map.address = json.formatted_address || '';
        map.lat = json.geometry.location.lat || 0;
        map.lng = json.geometry.location.lng || 0;
        return map;
    }
}
exports.Maps = Maps;
