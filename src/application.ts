import express from "express";
import * as path from "path";
import {router} from "./api/router";
import cors from "cors";

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "dist/")));
app.use(cors({origin: "*"}))

router(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`App is listening on port ${port}`);
