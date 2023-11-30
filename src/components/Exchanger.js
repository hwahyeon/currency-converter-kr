import { useState } from "react";
import {
  totalNumberAddition,
  splitKoreanNumber,
  replaceKoreanNumbers,
  removeNonNumericWords,
} from "../utils/numberUtils";

function Exchanger() {
  const [krw, setKrw] = useState("");
  const [euroToKrw, setEuroToKrw] = useState("");

  // eur / kor / usd

  fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/krw.min.json"
  )
    .then((response) => response.json())
    .then((data) => {
      setEuroToKrw(data.krw);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const handleInputChange = (e) => {
    setKrw(e.target.value);
  };

  const refine = totalNumberAddition(
    splitKoreanNumber(replaceKoreanNumbers(removeNonNumericWords(krw)))
  );

  return (
    <div>
      <input
        placeholder="바꾸려는 원화를 써주십시오"
        value={krw}
        onChange={handleInputChange}
      />
      <div>억 단위까지 계산할 수 있습니다.</div>
      <div>혹시 {refine}원을 의미하셨나요?</div>
      <div>오늘 1유로는 {euroToKrw}원입니다.</div>
      <div>
        {refine}원은 {refine / euroToKrw}Euro입니다!
      </div>
    </div>
  );
}

export default Exchanger;
