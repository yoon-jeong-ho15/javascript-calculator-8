import { removeSpace, replaceSeparator } from "../src/add.js";

test("removeSpace 테스트", () => {
  const input = "1 ,  2, 3";
  const result = removeSpace(input);
  expect(result).toBe("1,2,3");
});

describe("replaceSeparator", () => {
  test("';})'가 모두 ','로 변환", () => {
    const input = "//;})\n1,2;3}4)5";
    const result = replaceSeparator(input);
    expect(result).toBe("1,2,3,4,5");
  });

  test("';})'가 모두 ','로 변환", () => {
    const input = "//$&\n1,2$3:4&5";
    const result = replaceSeparator(input);
    expect(result).toBe("1,2,3,4,5");
  });

  test("지정하지 않은 커스텀 구분자 사용", () => {
    const input = "//;}$%\n1$2;3&4";
    expect(() => replaceSeparator(input)).toThrow(
      "[ERROR] % 는 커스텀 구분자로 사용할 수 없습니다."
    );
  });

  test("금지된 구분자 사용 에러", () => {
    const input = "//;}$%\n1$2;3%4";
    expect(() => replaceSeparator(input)).toThrow(
      "[ERROR] % 는 커스텀 구분자로 사용할 수 없습니다."
    );
  });
});
