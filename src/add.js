const FORBIDDEN = [".", "/", "*", "-", "^", "%", "+"];

export function getResult(input) {
  input = removeSpace(input);
  input = replaceSeparatorsWithComma(input);

  // 지정하지 않은 커스텀 구분자를 사용했거나
  // "//"와 "\\n" 대신
  validateInput(input);

  const numbers = getNumArr(input);

  let result = 0;
  numbers.map((num) => (result += num));
  return result;
}

function removeSpace(input) {
  return input.replaceAll(" ", "");
}

function replaceSeparatorsWithComma(input) {
  let separator = ":";
  const isHavingCustom = input.includes("\\n");
  if (isHavingCustom) {
    let [separatorPart, stringPart] = input.split("\\n");
    separator += extractSeparators(separatorPart);
    input = stringPart;
  }
  const regex = new RegExp(`[${separator}]`, "g");
  input = input.replaceAll(regex, ",");
  return input;
}

function extractSeparators(seperator) {
  if (!seperator.startsWith("//")) {
    throw new Error(
      `[ERROR] 커스텀 구분자를 사용하려면 앞에 "//"를 입력해주세요`
    );
  }
  separator = seperator.substr(2);
  checkifForbidden(separator);
  return separator;
}

function checkifForbidden(separator) {
  for (const ch of separator) {
    if (FORBIDDEN.includes(ch))
      throw new Error(`[ERROR] ${ch} 는 커스텀 구분자로 사용할 수 없습니다.`);
  }
}

function validateInput(str) {
  const regex = new RegExp(`[^0-9,]`, "g");
  for (const ch of str) {
    if (regex.test(ch)) {
      throw new Error(`[ERROR] '${ch}'는 지정하지 않은 구분자입니다.`);
    }
  }
}

function getNumArr(input) {
  const arr = input.split(",");
  const result = [];
  for (const num of arr) {
    result.push(convertToNumber(num));
  }
  return result;
}

function convertToNumber(num) {
  if (Number(num)) return Number(num);
  throw new Error(`[ERROR] ${num} 은 올바른 입력이 아닙니다.`);
  //   const startsWith = /^\d/;
  //   const endsWith = /\d$/;
  //   if (!startsWith.test(num) || !endsWith.test(num))
  //     throw new Error(`[Error] ${num}은 올바른 입력이 아닙니다.`);
}
