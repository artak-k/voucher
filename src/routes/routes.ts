import { Router, Request, Response, NextFunction, json } from "express";
import { ApiError, PageNotFoundError } from "../errors";
import { ApiErrorResponse } from "../response/ApiErrorResponse";
import { adminAuthMiddleware, authMiddleware } from "../middleware/authMiddleware";
import VoucherController from "../controller/VoucherController";
import asyncHandler from "express-async-handler";
import logging from "../config/logging";
import bodyParser from "body-parser";
import { activateVoucherValidator, createVoucherValidator, partnerVouchersValidator } from "../middleware/validators/voucherValidator";
import BalanceController from "../controller/BalanceController";
import PartnerController from "../controller/PartnerController";
import { addPartnerValidator, createPartnerValidator } from "../middleware/validators/partnerValidator";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'
import config from "../config/config";
swaggerDocument.host = config.server.domain;
swaggerDocument.schemes = [config.server.schema];

const NAMESPACE = "ROUTES";

const router = Router();

router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-KEY"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE PUT POST");
    return res.status(200).json({});
  }
  next();
});

const apiRouter = Router();
apiRouter.use(json());

apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.post("/admin/partner/add",  adminAuthMiddleware(), createPartnerValidator, asyncHandler(PartnerController.add));
apiRouter.post("/admin/partner/fill",  adminAuthMiddleware(), addPartnerValidator, asyncHandler(BalanceController.fillOrCreate));

apiRouter.get("/partner/balance", authMiddleware(), asyncHandler(VoucherController.getPartnerBalance));
apiRouter.get("/partner/vouchers", authMiddleware(), partnerVouchersValidator, asyncHandler(VoucherController.getPartnerVouchers));
apiRouter.post("/partner/vouchers/create", authMiddleware(), createVoucherValidator,  asyncHandler(VoucherController.create));
apiRouter.post("/partner/voucher/activate", authMiddleware(), activateVoucherValidator, asyncHandler(VoucherController.activate));

router.use("/api", apiRouter);

router.use(function (_req, _res, next) {
  next(new PageNotFoundError());
});

// error handler
router.use(function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let code = "SYSTEM_ERROR";
  if (err instanceof ApiError) {
    code = err.code;
  }
  res.json(new ApiErrorResponse(err.message, code));
});

export default router;
