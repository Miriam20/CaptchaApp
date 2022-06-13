import { Express } from "express-serve-static-core";
import { CaptchaService } from "../service/captchaService";

export const apiController = (app: Express, captcha: CaptchaService) => {
  app.get("/generate", (_, res) => {
    const result = captcha.create();
    res.json(result.data);
  });

  app.post("/validate", (req, res) => {
    const result = captcha.isTextCorrect(req.body.text, req.body.data);
    res.json(result);
  });
};
