import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/routes";
import config from "./config/config";
import logging from "./config/logging";
import connect from "./config/mongoose";

const NAMESPACE = "SERVER";

async function main() {
  await connect({ dbUri: config.mongo.uri });
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  startAPI(app);
}

function startAPI(app: Application) {
  const port: number = parseInt(config.server.port as string, 10);
  app.use("/", routes);
  app.listen(port, () => {
    logging.info(
      NAMESPACE,
      `Server running on ${config.server.hostname}:${port}`
    );
  });
}
main().catch((error) => logging.error(NAMESPACE, error));
