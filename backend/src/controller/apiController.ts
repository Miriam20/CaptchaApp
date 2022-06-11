import bodyParser from "body-parser";
import { Express } from "express-serve-static-core";
import { CaptchaService } from "../service/captchaService";

const PORT = 3001;

export class ApiController {
  constructor(private readonly app: Express, captcha: CaptchaService) {
    this.app.use(bodyParser.json());

    this.app.get("/generate", (_, res) => {
      const result = captcha.create();
      res.json(result.data);
    });

    this.app.post("/validate", (req, res) => {
      const result = captcha.isTextCorrect(req.body.text, req.body.data);
      res.json(result);
    });

    this.app.listen(PORT);
  }
}
