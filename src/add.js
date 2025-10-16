const FORBIDDEN = [".", "/", "*", "-", "^", "%", "+"];

export function getResult(input) {
  const numbers = validateInput(input);
  let result = 0;
  numbers.map((num) => (result += num));
  return result;
}

export function validateInput(input) {
  input = removeSpace(input);
  if (input.startsWith("//")) input = replaceSeparator(input);
  input = input.replaceAll(":", ",");
  input = input.split(",");

  return input;
}

export function removeSpace(input) {
  return input.replaceAll(" ", "");
}

export function replaceSeparator(input) {
  const [sep, str] = input.substr(2).split("\n");
  const separator = checkSeparator(sep);
  const regex = new RegExp(`[${separator}]`, "g");
  console.log("-----regex : ", regex);
  console.log("-----str : ", str);
  const result = str.replaceAll(regex, ",");

  return result;
}

export function checkSeparator(separator) {
  for (const ch of separator) {
    if (FORBIDDEN.includes(ch))
      throw new Error(`[ERROR] ${ch} 는 커스텀 구분자로 사용할 수 없습니다.`);
  }
  return separator + ":";
}
