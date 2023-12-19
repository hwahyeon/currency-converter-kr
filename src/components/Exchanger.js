import { useState } from "react";
// import {
//   totalNumberAddition,
//   splitKoreanNumber,
//   replaceKoreanNumbers,
//   removeNonNumericWords,
// } from "../utils/numberUtils";
import { useExchangeRate } from "../hooks/useExchangeRate";
import "../styles/Exchanger.scss";
import korNum from 'korean-numeric'
// import Chart from "./Chart"

function Exchanger() {
  const [krw, setKrw] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: "eur",
    text: "유로 (EUR)",
  });

  const handleCurrencyChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setSelectedCurrency({
      value: e.target.value,
      text: e.target.options[selectedIndex].text
    });
  };

  const { currencyToKrw, isLoading, error } = useExchangeRate(
    selectedCurrency.value
  );
  
  const handleInputChange = (e) => {
    setKrw(e.target.value);
  };

  const calculateRefinedValue = () => {
    // if (krw) {
    //   return totalNumberAddition(
    //     splitKoreanNumber(replaceKoreanNumbers(removeNonNumericWords(krw)))
    //   );
    // }
    if (krw) {
      return korNum.tonumber(krw);
    }
    return 0;
  };

  const refine = calculateRefinedValue();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="exchanger">
      <header>원화 계산기</header>
      <input
        className="currency-input"
        placeholder="바꾸려는 원화를 써주십시오"
        value={krw}
        onChange={handleInputChange}
      />
      <select value={selectedCurrency.value} onChange={handleCurrencyChange}>
        <option value="eur">유로 (EUR)</option>
        <option value="usd">미국 달러 (USD)</option>
        <option value="jpy">일본 엔 (JPY)</option>
        <option value="gbp">영국 파운드 (GBP)</option>
        <option value="aud">호주 달러 (AUD)</option>
        <option value="cad">캐나다 달러 (CAD)</option>
        <option value="chf">스위스 프랑 (CHF)</option>
        <option value="vnd">베트남 동 (VND)</option>
        <option value="sek">스웨덴 크로나 (SEK)</option>
        <option value="nzd">뉴질랜드 달러 (NZD)</option>
      </select>
      <div className="info">
        오늘 1{selectedCurrency.text}(은)는 {currencyToKrw.toFixed(2)}원입니다.
      </div>
      {/* <div className="result">혹시 {refine.toLocaleString()}원을 의미하셨나요?</div> */}
      <div className="result">
        {refine.toLocaleString()}원은{" "}
        {Number((refine / currencyToKrw).toFixed(2)).toLocaleString()}
        {selectedCurrency.text}입니다.
      </div>
      <div className="footer-info">
        <p>
          일십백천만...하며 0을 세던 날은 잊으세요! 조 단위까지의 한글 숫자
          표기를 지원합니다. 예를 들어, 아래의 표기법 모두 사용할 수 있습니다:
        </p>
        <ul>
          <li>삼십만원</li>
          <li>7십팔만 육천원</li>
          <li>950000</li>
        </ul>
        <p>입력만 하세요!</p>
      </div>
      {/* <Chart /> */}
    </div>
  );
}

export default Exchanger;
