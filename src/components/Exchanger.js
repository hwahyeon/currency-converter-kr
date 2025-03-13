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
import "../styles/Exchanger.scss";
import korNum from "korean-numeric";
import LangButton from "./LangButton.js";
import koreanNumberConvert from "../utils/koreanNumberConvert.js";

function Exchanger() {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

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
    setSelectedPrice(0);
    setToPrice(0);
  };

  const handleToCurrencyChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setToCurrency({
      value: e.target.value,
      text: e.target.options[selectedIndex].text,
    });
    setSelectedPrice(0);
    setToPrice(0);
  };

  const { currencyToCurrency, isLoading, error } = useExchangeRate(
    selectedCurrency.value,
    toCurrency.value
  );

  const handleInputSelectedChange = (e) => {
    const v = koreanNumer(e.target.value);
    setSelectedPrice(v);
    setToPrice(
      Number(
        (korNum.tonumber(v) * currencyToCurrency).toFixed(2)
      ).toLocaleString()
    );
  };

  const handleInputToChange = (e) => {
    const v = koreanNumer(e.target.value);
    setToPrice(v);
    setSelectedPrice(
      Number(
        ((1 / currencyToCurrency) * korNum.tonumber(v)).toFixed(2)
      ).toLocaleString()
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
      <header className="exchanger__header">{lang.header}</header>
      <LangButton />
      <div className="exchanger__inputgroup">
        <select
          className="exchanger__inputgroup__select"
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
        <div className="exchanger__inputgroup__data">
          <input
            className="exchanger__inputgroup__data__input"
            placeholder={lang.placeholder}
            value={selectedPrice}
            onChange={handleInputSelectedChange}
          />
          <div>
            {selectedPrice === ""
              ? 0
              : koreanNumberConvert(korNum.tonumber(selectedPrice))}
          </div>
        </div>
      </div>
      <div className="exchanger__inputgroup">
        <select
          className="exchanger__inputgroup__select"
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
        <div className="exchanger__inputgroup__data">
          <input
            className="exchanger__inputgroup__data__input"
            placeholder={lang.placeholder}
            value={toPrice}
            onChange={handleInputToChange}
          />
          <div>
            {toPrice === "" ? 0 : koreanNumberConvert(korNum.tonumber(toPrice))}
          </div>
        </div>
      </div>

      <div className="exchanger__info">
        {lang.today_price.today} 1 {selectedCurrency.text}
        {lang.today_price.is} {currencyToCurrency.toFixed(3)} {toCurrency.text}
        {lang.today_price.end}.
      </div>

      <div className="exchanger__footer">
        <p>{lang.info1}</p>
        <ul>
          <li>삼십만원</li>
          <li>7십팔만 육천원</li>
          <li>950000</li>
          <li>15점77</li>
        </ul>
        <p>{lang.info2}</p>
      </div>
    </div>
  );
}

export default Exchanger;
