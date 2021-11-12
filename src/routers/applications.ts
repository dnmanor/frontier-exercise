import express, { Request, Response, Router } from "express";
import { sendApplicationToATS } from "../rpabot";
import { validateJobApplication } from "../utilities/validators";
import { data as rpadata } from "../data/rpadata";
import { logToFile } from "../utilities/logger";
export const router: Router = express.Router();

router.post(
  "/forms/frontier/applications",
  async (req: Request, res: Response) => {
    await logToFile(
      "Request to /forms/frontier/applications with payload: " +
        JSON.stringify(req.body),
      "server"
    );
    const validation = validateJobApplication(req.body);

    if (validation.error) {
      return res.status(400).json({
        status: false,
        message: "validation failed, problem with req payload",
      });
    }

    try {
      const result = await sendApplicationToATS(
        { ...validation.value, form: rpadata },
        false
      );

      if (result.error && !req.timedout) {
        return res.status(result.code).json({
          status: false,
          message: "request failed",
        });
      }

      if (!req.timedout) {
        res.status(result.code).json({
          status: true,
          message: "application submitted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "requested failed",
      });
    }
  }
);
