import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("문자열 계산기", () => {
  describe("정상", () => {
    test("숫자들 사이에 공백", async () => {
      const inputs = ["//;\\n1   ;2 ;  3   "];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("커스텀 구분자에 공백", async () => {
      const inputs = ["// ; \\n1;2;3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("커스텀 구분자 사용", async () => {
      const inputs = ["//;\\n1;2;3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("기본 구분자 사용", async () => {
      const inputs = ["1:2,3"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 6"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("십 단위 덧셈", async () => {
      const inputs = ["11:22,33"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 66"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });

    test("백 단위 덧셈", async () => {
      const inputs = ["111:222,333"];
      mockQuestions(inputs);

      const logSpy = getLogSpy();
      const outputs = ["결과 : 666"];

      const app = new App();
      await app.run();

      outputs.forEach((output) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
      });
    });
  });

  describe("에러", () => {
    test("금지 구분자 사용", async () => {
      const inputs = ["//;-\\n1"];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow("[ERROR]");
    });

    test("구분자 미지정 사용", async () => {
      const inputs = ["//;\\n1,2&3"];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        `[ERROR] '&'는 지정하지 않은 구분자입니다.`
      );
    });

    test("구분자 지정 형식 오류 : \\\\n 대신 \\n", async () => {
      const inputs = ["//;\n1,2;3"];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        `[ERROR] '/'는 지정하지 않은 구분자입니다.`
      );
    });

    test("구분자 지정 형식 오류 : // 미사용", async () => {
      const inputs = ["/;\\n1,2;3"];
      mockQuestions(inputs);

      const app = new App();
      await expect(app.run()).rejects.toThrow(
        `[ERROR] 커스텀 구분자를 사용하려면 앞에 "//"를 입력해주세요`
      );
    });
  });
});
