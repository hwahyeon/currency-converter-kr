function koreanNumberConvert(num, decimalpoint = 2) {
    const units = ["", "만", "억", "조", "경", "해"];

    if (num === 0) return "0";

    let result = "";
    let unitIndex = 0;
    let fractionalPart = "";

    // 정수와 소수 부분 분류
    let integerPart = Math.floor(num);
    let decimalPart = num % 1;

    while (integerPart > 0) {
      let part = integerPart % 10000;
      integerPart = Math.floor(integerPart / 10000);

      if (part > 0) {
        let partStr = part.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (unitIndex > 0) {
          partStr += units[unitIndex];
        }
        result = partStr + " " + result;
      }
      unitIndex++;
    }

    // 소수 부분
    if (decimalPart > 0) {
      fractionalPart = decimalPart.toFixed(decimalpoint).toString().substring(1);
    }

    return (result.trim() + fractionalPart).trim();
  }

  export default koreanNumberConvert;