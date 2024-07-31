"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errors_1 = require("../errors");
const ApiErrorResponse_1 = require("../response/ApiErrorResponse");
const authMiddleware_1 = require("../middleware/authMiddleware");
const VoucherController_1 = __importDefault(require("../controller/VoucherController"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const logging_1 = __importDefault(require("../config/logging"));
const body_parser_1 = __importDefault(require("body-parser"));
const voucherValidator_1 = require("../middleware/validators/voucherValidator");
const BalanceController_1 = __importDefault(require("../controller/BalanceController"));
const PartnerController_1 = __importDefault(require("../controller/PartnerController"));
const partnerValidator_1 = require("../middleware/validators/partnerValidator");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const config_1 = __importDefault(require("../config/config"));
swagger_json_1.default.host = config_1.default.server.domain;
swagger_json_1.default.schemes = [config_1.default.server.schema];
const NAMESPACE = "ROUTES";
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-KEY");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE PUT POST");
        return res.status(200).json({});
    }
    next();
});
const apiRouter = (0, express_1.Router)();
apiRouter.use((0, express_1.json)());
apiRouter.use(body_parser_1.default.urlencoded({ extended: true }));
apiRouter.use(body_parser_1.default.json());
apiRouter.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
apiRouter.post("/admin/partner/add", (0, authMiddleware_1.adminAuthMiddleware)(), partnerValidator_1.createPartnerValidator, (0, express_async_handler_1.default)(PartnerController_1.default.add));
apiRouter.post("/admin/partner/fill", (0, authMiddleware_1.adminAuthMiddleware)(), partnerValidator_1.addPartnerValidator, (0, express_async_handler_1.default)(BalanceController_1.default.fillOrCreate));
apiRouter.get("/partner/balance", (0, authMiddleware_1.authMiddleware)(), (0, express_async_handler_1.default)(VoucherController_1.default.getPartnerBalance));
apiRouter.get("/partner/vouchers", (0, authMiddleware_1.authMiddleware)(), voucherValidator_1.partnerVouchersValidator, (0, express_async_handler_1.default)(VoucherController_1.default.getPartnerVouchers));
apiRouter.post("/partner/vouchers/create", (0, authMiddleware_1.authMiddleware)(), voucherValidator_1.createVoucherValidator, (0, express_async_handler_1.default)(VoucherController_1.default.create));
apiRouter.post("/partner/voucher/activate", (0, authMiddleware_1.authMiddleware)(), voucherValidator_1.activateVoucherValidator, (0, express_async_handler_1.default)(VoucherController_1.default.activate));
router.use("/api", apiRouter);
router.use(function (_req, _res, next) {
    next(new errors_1.PageNotFoundError());
});
// error handler
router.use(function (err, _req, res, _next) {
    let code = "SYSTEM_ERROR";
    if (err instanceof errors_1.ApiError) {
        code = err.code;
    }
    res.json(new ApiErrorResponse_1.ApiErrorResponse(err.message, code));
});
exports.default = router;
