import {Express} from "express";
import express from "express";
import {allowCrossOriginHeaders} from "./AppConfig";
import router from "./Router";

const app: Express = express();
const port: string = process.env.PORT || "8080";

allowCrossOriginHeaders(app);

app.use("/api", router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
