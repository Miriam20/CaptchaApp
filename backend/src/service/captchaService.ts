import { CaptchaObj } from "svg-captcha";
import { CaptchaModel } from "../model/captchaModel";

export class CaptchaService {
  constructor() {
    this.servedCaptcha = new Map<string, CaptchaModel>();
    this.EXPIRATION_TIME_MS = 10000;
  }
  private servedCaptcha: Map<string, CaptchaModel>;
  private EXPIRATION_TIME_MS: number;

  create(): CaptchaObj {
    const captcha = new CaptchaModel();
    this.servedCaptcha.set(captcha.data, captcha);
    return captcha;
  }

  validate(text: string, data: string): boolean {
    const lowerCaseText = text.toLocaleLowerCase();
    const storedData = this.servedCaptcha.get(data);
    if (!storedData) {
      throw "Unexpected error: unknown captcha";
    }
    this.servedCaptcha.delete(data);
    const isExpired =
      new Date().getTime() - storedData.timestamp.getTime() >
      this.EXPIRATION_TIME_MS;
    return storedData.text === lowerCaseText && !isExpired ? true : false;
  }
}
