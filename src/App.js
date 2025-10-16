import { Console } from "@woowacourse/mission-utils";
import { getResult } from "./add.js";

class App {
  async run() {
    const input = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요.\n"
    );
    const result = getResult(input);

    Console.print(`결과 : ${result}`);
  }
}

export default App;
