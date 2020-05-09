import express from "express";
import * as path from "path";
import {router} from "./api/router";

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "dist/web")));

router(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/web/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
