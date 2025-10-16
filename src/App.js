import { Console } from "@woowacourse/mission-utils";
import { getNumbers, getResult } from "./calc.js";

class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );
    const str = removeSpace(input);
    const nums = getNumbers(str);
    const result = getResult(nums);

    Console.print(`결과 : ${result}`);
  }
}

export default App;
