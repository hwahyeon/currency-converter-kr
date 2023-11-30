// 숫자, 숫자 관련 문자 외의 문자 제거
export function removeNonNumericWords(input) {
  const numericWordsRegex = /[^\d십백천만억조일이삼사오육칠팔구]/g;
  return input.replace(numericWordsRegex, "");
}

// 일-구 -> 1-9 변경
export function replaceKoreanNumbers(input) {
  const numberMap = {
    일: "1",
    이: "2",
    삼: "3",
    사: "4",
    오: "5",
    육: "6",
    칠: "7",
    팔: "8",
    구: "9",
  };
  return input
    .split("")
    .map((char) => numberMap[char] || char)
    .join("");
}

// '억', '만', '천', '백', '십' 단위로 잘라 list로 만들기
export function splitKoreanNumber(input) {
  const regex = /(?:(.*억)?(.*만)?(.*천)?(.*백)?(.*십)?(.*))?/;

  // 정규 표현식을 사용하여 입력 문자열을 나눔
  const matches = input.match(regex).slice(1);

  // 필터링하여 빈 문자열이 아닌 부분만 배열로 반환
  return matches.filter((part) => part);
}

// 0 - 9천9백9십9구 convert to Arabic number 0 - 9999
export function convertKoreanNumber(input) {
  const units = { 천: 1000, 백: 100, 십: 10 };
  input = input.replace(/(?<!\d)(천|백|십)/g, '1$1');

  let result = 0;

  Object.keys(units).forEach((unit) => {
    const index = input.indexOf(unit);
    if (index !== -1) {
      let number = parseInt(input.substring(0, index), 10);
      result += number * units[unit];
      input = input.substring(index + 1);
    }
  });

  // 남은 숫자가 있다면 결과에 추가
  if (input.length > 0) {
    result += parseInt(input, 10);
  }

  return result;
}

export function totalNumberAddition(list) {
  let addition = 0;
  list.forEach((item) => {
    const lastChar = item[item.length - 1]; // 항목의 마지막 글자

    switch (lastChar) {
      case "조":
        addition += item === "조" ? 1000000000000 : convertKoreanNumber(item.slice(0, -1)) * 100000000;
        break;
      case "억":
        addition += item === "억" ? 100000000 : convertKoreanNumber(item.slice(0, -1)) * 100000000;
        break;
      case "만":
        addition += item === "만" ? 10000 : convertKoreanNumber(item.slice(0, -1)) * 10000;
        break;
      default:
        addition += convertKoreanNumber(item);
    }
  });
  return addition;
}