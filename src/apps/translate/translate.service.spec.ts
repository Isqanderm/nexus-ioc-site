import { Test } from "@nexus-ioc/testing";
import { TranslateService } from "./translate.service";

describe("TranslateService", () => {
  it("should get service instance", async () => {
    const moduleRef = await Test.createModule({
      providers: [TranslateService],
    }).compile();
    const translateService =
      await moduleRef.get<TranslateService>(TranslateService);

    expect(translateService).toBeInstanceOf(TranslateService);
  });
});
