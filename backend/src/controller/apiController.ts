import bodyParser from "body-parser";
import express from "express";
import { Express } from "express-serve-static-core";
import { CaptchaService } from "../service/captchaService";

export class ApiController {
  constructor(captcha: CaptchaService) {
    const port = process.env.PORT || 3001;

    this.app = express();

    this.app.use(bodyParser.json());

    this.app.get("/generate", (_, res) => {
      const result = captcha.create();
      res.json(result.data);
    });

    this.app.post("/validate", (req, res) => {
      const result = captcha.validate(req.body.text, req.body.data);
      res.json(result);
    });

    this.app.listen(port);
  }

  private readonly app: Express;
}
