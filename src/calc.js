const FORBIDDEN = [".", "/", "*", "-", "^", "%"];

export function getNumbers(str) {
  const separators = [",", ":"];
  const result = [];
  // "//"로 시작하는가? 구분자 추가하기.
  if (str.startsWith("//")) checkSeparator(str);

  // 1. 구분자 금지 목록에 있는지 확인. => 해당시 에러 ("'.'는 구분자로 사용할 수 없습니다.")
  // 2. separators에 추가하기

  // split()으로 숫자만 골라내기
  const arr = str.split(",");

  // 1. 숫자에 "/","^" 가 있으면 계산
  // 2. "/","^"가 두 번 이상 반복 => 에러 ("각 수 마다'/'는 한 번만 사용해주세요")
  // 3. result.push()

  return arr;
}

export function getResult(nums) {
  let result = 0;

  return result;
}

export function removeSpace(input) {
  return input.replaceAll(" ", "");
}

export function checkSeparator(str) {
  const separator = str.slice(2, str.indexOf("\n"));
  for (const ch of separator) {
    if (FORBIDDEN.includes(ch))
      throw new Error(`[ERROR] ${ch} 는 커스텀 구분자로 사용할 수 없습니다.`);
  }
}
