import { useState } from "react";
// import {
//   totalNumberAddition,
//   splitKoreanNumber,
//   replaceKoreanNumbers,
//   removeNonNumericWords,
// } from "../utils/numberUtils";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { ko } from "../lang/ko.js";
import { en } from "../lang/en.js";
import "../styles/_Exchanger.scss";
import korNum from "korean-numeric";
import LangButton from "./LangButton.js";

function Exchanger() {
  const [selectedPrice, setSelectedPrice] = useState(1);
  const [toPrice, setToPrice] = useState(1);

  const currentLanguage = localStorage.getItem("language");
  const lang = currentLanguage === "ko" ? ko : en;

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: "eur",
    text: lang.option.eur,
  });
  const [toCurrency, setToCurrency] = useState({
    value: "krw",
    text: lang.option.krw,
  });

  const handleSelectedCurrencyChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setSelectedCurrency({
      value: e.target.value,
      text: e.target.options[selectedIndex].text,
    });
  };

  const handleToCurrencyChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setToCurrency({
      value: e.target.value,
      text: e.target.options[selectedIndex].text,
    });
  };

  const { currencyToCurrency, isLoading, error } = useExchangeRate(
    selectedCurrency.value,
    toCurrency.value
  );

  const handleInputSelectedChange = (e) => {
    const v = koreanNumer(e.target.value);
    setSelectedPrice(v);
    setToPrice((korNum.tonumber(v) * currencyToCurrency).toFixed(3));
  };

  const handleInputToChange = (e) => {
    const v = koreanNumer(e.target.value);
    setToPrice(v);
    setSelectedPrice(
      ((1 / currencyToCurrency) * korNum.tonumber(v)).toFixed(3)
    );
  };

  function koreanNumer(e) {
    if (e === null) {
      return 0;
    }
    return e;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="exchanger">
      <header>{lang.header}</header>
      <LangButton />
      <div className="input-group">
        <select
          className="currency-select"
          value={selectedCurrency.value}
          onChange={handleSelectedCurrencyChange}
        >
          <option value="krw">{lang.option.krw}</option>
          <option value="eur">{lang.option.eur}</option>
          <option value="usd">{lang.option.usd}</option>
          <option value="jpy">{lang.option.jpy}</option>
          <option value="gbp">{lang.option.gbp}</option>
          <option value="aud">{lang.option.aud}</option>
          <option value="cad">{lang.option.cad}</option>
          <option value="chf">{lang.option.chf}</option>
          <option value="vnd">{lang.option.vnd}</option>
          <option value="sek">{lang.option.sek}</option>
          <option value="nzd">{lang.option.nzd}</option>
        </select>
        <input
          className="currency-input"
          placeholder={lang.placeholder}
          value={selectedPrice}
          onChange={handleInputSelectedChange}
        />
      </div>
      <div className="input-group">
        <select
          className="currency-select"
          value={toCurrency.value}
          onChange={handleToCurrencyChange}
        >
          <option value="krw">{lang.option.krw}</option>
          <option value="eur">{lang.option.eur}</option>
          <option value="usd">{lang.option.usd}</option>
          <option value="jpy">{lang.option.jpy}</option>
          <option value="gbp">{lang.option.gbp}</option>
          <option value="aud">{lang.option.aud}</option>
          <option value="cad">{lang.option.cad}</option>
          <option value="chf">{lang.option.chf}</option>
          <option value="vnd">{lang.option.vnd}</option>
          <option value="sek">{lang.option.sek}</option>
          <option value="nzd">{lang.option.nzd}</option>
        </select>
        <input
          className="currency-input"
          placeholder={lang.placeholder}
          value={toPrice}
          onChange={handleInputToChange}
        />
      </div>

      <div className="info">
        {lang.today_price.today} 1 {selectedCurrency.text}{lang.today_price.is} {currencyToCurrency.toFixed(3)}{" "}
        {toCurrency.text}{lang.today_price.end}.
      </div>
      {/* <div className="result">혹시 {refine.toLocaleString()}원을 의미하셨나요?</div> */}
      <div className="footer-info">
        <p>{lang.info1}</p>
        <ul>
          <li>삼십만원</li>
          <li>7십팔만 육천원</li>
          <li>950000</li>
        </ul>
        <p>{lang.info2}</p>
      </div>
      {/* <Chart /> */}
    </div>
  );
}

export default Exchanger;
