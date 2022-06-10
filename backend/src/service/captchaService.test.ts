import { mocked } from "jest-mock";
import { CaptchaModel } from "./../model/captchaModel";
import { CaptchaService } from "./captchaService";

jest.mock("../model/captchaModel");
const MockedCaptchaModel = mocked(CaptchaModel);

describe("captcha service tests", () => {
  const captchaService = new CaptchaService();
  const correctCaptcha: CaptchaModel = {
    text: "correcttext",
    data: "correctdata",
    timestamp: new Date(),
  };
  const incorrectCaptcha: CaptchaModel = {
    text: "incorrecttext",
    data: "incorrectdata",
    timestamp: new Date(),
  };
  const expiredCaptcha: CaptchaModel = {
    text: "expiredtext",
    data: "expireddata",
    timestamp: new Date("2019-01-16"),
  };

  beforeAll(() => {
    MockedCaptchaModel.mockReturnValueOnce(correctCaptcha)
      .mockReturnValueOnce(incorrectCaptcha)
      .mockReturnValueOnce(expiredCaptcha);
    captchaService.create();
    captchaService.create();
    captchaService.create();
  });

  it.each([
    ["correcttext", "correctdata", true],
    ["correcttext", "incorrectdata", false],
    ["expiredtext", "expireddata", false],
  ])(
    "correctly validates the requests and deletes from map (%s, %s)",
    (text: string, data: string, result: boolean) => {
      expect(captchaService.validate(text, data)).toEqual(result);
      expect(captchaService.isCaptchaStored(data)).toBeFalsy();
    }
  );

  it("correctly strores a captcha", () => {
    MockedCaptchaModel.mockReturnValueOnce({
      ...correctCaptcha,
      data: "newcaptcha",
    });
    captchaService.create();
    expect(captchaService.isCaptchaStored("newcaptcha")).toBeTruthy();
  });
});
