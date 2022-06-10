import * as captchaLib from "svg-captcha";

export class CaptchaModel {
  constructor() {
    const captcha = captchaLib.create();
    this.text = captcha.text.toLocaleLowerCase();
    this.data = captcha.data;
    this.timestamp = new Date();
  }

  readonly text: string;
  readonly data: string;
  readonly timestamp: Date;
}
