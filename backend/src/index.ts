import { ApiController } from "./controller/apiController";
import { CaptchaService } from "./service/captchaService";

const captcha = new CaptchaService();

new ApiController(captcha);
