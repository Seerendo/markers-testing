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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapUC_mapRepository;
Object.defineProperty(exports, "__esModule", { value: true });
class MapUC {
    constructor(mapRepository) {
        _MapUC_mapRepository.set(this, void 0);
        __classPrivateFieldSet(this, _MapUC_mapRepository, mapRepository, "f");
    }
    getPredictions(input, lat, lon, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mapsPredictions = yield __classPrivateFieldGet(this, _MapUC_mapRepository, "f").getPredictions(input, lat, lon, radius);
                return mapsPredictions;
            }
            catch (error) {
                throw new Error('Method not implemented.');
            }
        });
    }
    getPlaceDetailsByPlaceId(placeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield __classPrivateFieldGet(this, _MapUC_mapRepository, "f").getPlaceDetailsByPlaceId(placeId);
            }
            catch (error) {
                throw new Error('Method not implemented.');
            }
        });
    }
}
_MapUC_mapRepository = new WeakMap();
exports.default = MapUC;
