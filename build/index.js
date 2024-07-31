"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const NAMESPACE = "SERVER";
async function main() {
    await (0, mongoose_1.default)({ dbUri: config_1.default.mongo.uri });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    startAPI(app);
}
function startAPI(app) {
    const port = parseInt(config_1.default.server.port, 10);
    app.use("/", routes_1.default);
    app.listen(port, () => {
        logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}:${port}`);
    });
}
main().catch((error) => logging_1.default.error(NAMESPACE, error));
