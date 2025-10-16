const FORBIDDEN = [".", "/", "*", "-", "^", "%", "+"];

export function getResult(input) {
  const numbers = validateInput(input);
  let result = 0;
  numbers.map((num) => (result += num));
  return result;
}

export function validateInput(input) {
  input = removeSpace(input);

  return input;
}

export function removeSpace(input) {
  return input.replaceAll(" ", "");
}
