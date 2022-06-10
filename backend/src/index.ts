import cors from "cors";
import express from "express";
import { ApiController } from "./controller/apiController";
import { CaptchaService } from "./service/captchaService";

const captchaService = new CaptchaService();

const app = express();
app.use(cors());

new ApiController(app, captchaService);
