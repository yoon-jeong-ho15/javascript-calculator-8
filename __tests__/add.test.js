import { removeSpace } from "../src/add.js";

test("removeSpace 테스트", () => {
  const input = "1 ,  2, 3";
  const result = removeSpace(input);
  expect(result).toBe("1,2,3");
});
