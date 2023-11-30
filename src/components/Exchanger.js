import { useState } from "react";
import {
  totalNumberAddition,
  splitKoreanNumber,
  replaceKoreanNumbers,
  removeNonNumericWords,
} from "../utils/numberUtils";
import { useExchangeRate } from "../hooks/useExchangeRate";

function Exchanger() {
  const [krw, setKrw] = useState("");
  const { euroToKrw, isLoading, error } = useExchangeRate();

  const handleInputChange = (e) => {
    setKrw(e.target.value);
  };

  const calculateRefinedValue = () => {
    if (krw) {
      return totalNumberAddition(
        splitKoreanNumber(replaceKoreanNumbers(removeNonNumericWords(krw)))
      );
    }
    return 0;
  };

  const refine = calculateRefinedValue();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <input
        placeholder="바꾸려는 원화를 써주십시오"
        value={krw}
        onChange={handleInputChange}
      />
      <div>억 단위까지 계산할 수 있습니다.</div>
      <div>혹시 {refine}원을 의미하셨나요?</div>
      <div>오늘 1유로는 {euroToKrw.toFixed(3)}원입니다.</div>
      <div>
        {refine}원은 {(refine / euroToKrw).toFixed(3)}Euro입니다!
      </div>
    </div>
  );
}

export default Exchanger;