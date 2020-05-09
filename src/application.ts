import express from "express";
import * as path from "path";

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "dist/web")));

app.get("/api/hello", (req, res) => {
  res.send("Hello, World!")
})

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/web/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port ${port}`);
