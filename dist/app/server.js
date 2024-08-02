"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Server_instances, _Server_app, _Server_setRateLimit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("dotenv/config");
const express_1 = __importStar(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
class Server {
    constructor(port) {
        _Server_instances.add(this);
        _Server_app.set(this, void 0);
        __classPrivateFieldSet(this, _Server_app, (0, express_1.default)(), "f");
        __classPrivateFieldGet(this, _Server_app, "f").use((0, morgan_1.default)('dev'));
        __classPrivateFieldGet(this, _Server_app, "f").use((0, cors_1.default)());
        __classPrivateFieldGet(this, _Server_app, "f").use((0, helmet_1.default)());
        __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.json());
        __classPrivateFieldGet(this, _Server_app, "f").use(express_1.default.urlencoded({ extended: true }));
        /* this.#app.use(this.#setRateLimit()); */
        __classPrivateFieldGet(this, _Server_app, "f").set('port', port || 3000 || process.env.PORT);
    }
    addHandler(handler) {
        const apiSubRouter = (0, express_1.Router)({ mergeParams: true });
        handler.init(apiSubRouter);
        __classPrivateFieldGet(this, _Server_app, "f").use('/api', apiSubRouter);
    }
    run() {
        __classPrivateFieldGet(this, _Server_app, "f").listen(__classPrivateFieldGet(this, _Server_app, "f").get('port'), () => {
            console.log(`Server is running on http://localhost:${__classPrivateFieldGet(this, _Server_app, "f").get('port')}`);
        });
    }
}
exports.Server = Server;
_Server_app = new WeakMap(), _Server_instances = new WeakSet(), _Server_setRateLimit = function _Server_setRateLimit() {
    return (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 1000,
    });
};
