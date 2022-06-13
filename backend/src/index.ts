import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { PORT } from "./config";
import { apiController } from "./controller/apiController";
import { CaptchaService } from "./service/captchaService";

const captchaService = new CaptchaService();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT);

apiController(app, captchaService);
