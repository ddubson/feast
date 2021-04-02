import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { router } from './router';
import logger from "./logger-config";

const app = express();

app.use(express.static(path.join(__dirname, 'dist/')));
app.use(cors({ origin: '*' }));
app.use(express.json());

router(app);

const port = process.env.PORT || 8080;
app.listen(port);

logger.info(`✨ Feast API serving on port ${port}`);
