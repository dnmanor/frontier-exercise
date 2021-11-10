import server from "./server";
import * as dotenv from "dotenv";
import { logToFile } from "./utilities/logger";

dotenv.config();

server.listen(process.env.PORT, async () => {
  console.log(`API running and available on port ${process.env.PORT}`);
  await logToFile("Server Started", "server");
});
