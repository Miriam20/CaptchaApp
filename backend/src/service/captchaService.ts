import { EXPIRATION_TIME_MS } from "../config";
import { CaptchaModel } from "../model/captchaModel";

export class CaptchaService {
  constructor() {
    this.servedCaptcha = new Map<string, CaptchaModel>();
  }
  private servedCaptcha: Map<string, CaptchaModel>;

  create(): CaptchaModel {
    const captcha = new CaptchaModel();
    this.servedCaptcha.set(captcha.data, captcha);
    return captcha;
  }

  isTextCorrect(text: string, data: string): boolean {
    const lowerCaseText = text.toLocaleLowerCase();
    const storedData = this.servedCaptcha.get(data);

    if (!storedData) {
      throw "Unexpected error: unknown captcha";
    }
    this.servedCaptcha.delete(data);
    const isExpired =
      new Date().getTime() - storedData.timestamp.getTime() >
      EXPIRATION_TIME_MS;
    return storedData.text === lowerCaseText && !isExpired ? true : false;
  }

  isStored(data: string) {
    return this.servedCaptcha.get(data) !== undefined;
  }
}
