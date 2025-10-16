const FORBIDDEN = [".", "/", "*", "-", "^", "%", "+"];

export function getResult(input) {
  const numbers = validateInput(input);
  let result = 0;
  numbers.map((num) => (result += num));
  return result;
}

export function validateInput(input) {
  input = removeSpace(input);
  const arr = replaceSeparator(input).split(",");
  const result = [];
  for (const num of arr) {
    result.push(convertToNumber(num));
  }
  return result;
}

function removeSpace(input) {
  return input.replaceAll(" ", "");
}

export function replaceSeparator(input) {
  if (!input.includes("\\n")) {
    if (/[^0-9,:]/.test(input))
      throw new Error(`[ERROR] 커스텀 구분자를 지정하세요`);
    return input.replaceAll(":", ",");
  }
  let [separator, str] = input.split("\\n");
  separator = getSeparator(separator);
  separator += ":";
  const regex = new RegExp(`[${separator}]`, "g");
  console.log("-----regex : ", regex);
  console.log("-----str : ", str);
  return str.replaceAll(regex, ",");
}

function getSeparator(seperator) {
  if (!seperator.startsWith("//")) {
    throw new Error(
      `[ERROR] 커스텀 구분자를 사용하려면 앞에 "//"를 입력해주세요`
    );
  }
  return checkSeparator(seperator.substr(2));
}

function checkSeparator(separator) {
  for (const ch of separator) {
    if (FORBIDDEN.includes(ch))
      throw new Error(`[ERROR] ${ch} 는 커스텀 구분자로 사용할 수 없습니다.`);
  }
  return separator;
}

function convertToNumber(num) {
  if (Number(num)) return Number(num);
  throw new Error(`[Error] ${num} 은 올바른 입력이 아닙니다.`);
  //   const startsWith = /^\d/;
  //   const endsWith = /\d$/;
  //   if (!startsWith.test(num) || !endsWith.test(num))
  //     throw new Error(`[Error] ${num}은 올바른 입력이 아닙니다.`);
}
