import { replaceSeparator, validateInput } from "../src/add.js";

describe("replaceSeparator", () => {
  test("커스텀 구분자 - ';})'", () => {
    const input = "//;})\\n1;2;3}4)5";
    const result = replaceSeparator(input);
    expect(result).toBe("1,2,3,4,5");
  });

  test("커스텀 + 기본 - '$&'", () => {
    const input = "//$&\\n1,2$3:4&5";
    const result = replaceSeparator(input);
    expect(result).toBe("1,2,3,4,5");
  });

  test("기본 구분자만 사용", () => {
    const input = "1,2,3";
    const result = replaceSeparator(input);
    expect(result).toBe("1,2,3");
  });

  test("커스텀 구분자 미지정 사용", () => {
    const input = "1,2;3";
    expect(() => replaceSeparator(input)).toThrow(
      `[ERROR] 커스텀 구분자를 지정하세요`
    );
  });

  test("지정하지 않은 커스텀 구분자 사용", () => {
    const input = "//;}$%\\n1$2;3&4";
    expect(() => replaceSeparator(input)).toThrow(
      "[ERROR] % 는 커스텀 구분자로 사용할 수 없습니다."
    );
  });

  test("금지된 구분자 사용 에러", () => {
    const input = "//;}$%\\n1$2;3%4";
    expect(() => replaceSeparator(input)).toThrow(
      "[ERROR] % 는 커스텀 구분자로 사용할 수 없습니다."
    );
  });
});
