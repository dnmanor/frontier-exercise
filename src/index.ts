import server from "./server";
import * as dotenv from "dotenv";

dotenv.config();

server.listen(process.env.PORT, () => {
  console.log(`API running and available on port ${process.env.PORT}`);
});
