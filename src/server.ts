import express from "express";
import cors from "cors";
import timeout from "connect-timeout";
import { router as applicationsRouter } from "./routers/applications";

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(timeout("5s"));
app.use(haltOnTimedout);

app.use(applicationsRouter);

function haltOnTimedout(
  req: express.Request,
  res: express.Response,
  next: Function
) {
  if (!req.timedout) {
    next();
  }
}
export default app;
