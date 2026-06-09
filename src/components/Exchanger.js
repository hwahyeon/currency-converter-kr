import { useEffect, useState } from "react";
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

  const [language] = useState(() => localStorage.getItem("language") || "en");
  const lang = language === "ko" ? ko : en;

  const [selectedCurrency, setSelectedCurrency] = useState(
    () => localStorage.getItem("selectedCurrency") || "eur",
  );
  const [toCurrency, setToCurrency] = useState(
    () => localStorage.getItem("toCurrency") || "krw",
  );

  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  useEffect(() => {
    localStorage.setItem("toCurrency", toCurrency);
  }, [toCurrency]);

  const { currencyToCurrency, isLoading, error } = useExchangeRate(
    selectedCurrency,
    toCurrency,
  );

  useEffect(() => {
    if (!selectedPrice) return;

    setToPrice(
      Number(
        (korNum.tonumber(selectedPrice) * currencyToCurrency).toFixed(2),
      ).toLocaleString(),
    );
  }, [currencyToCurrency, selectedPrice]);

  const handleInputSelectedChange = (e) => {
    const v = koreanNumer(e.target.value);
    setSelectedPrice(v);
    setToPrice(
      Number(
        (korNum.tonumber(v) * currencyToCurrency).toFixed(2),
      ).toLocaleString(),
    );
  };

  const handleInputToChange = (e) => {
    const v = koreanNumer(e.target.value);
    setToPrice(v);
    setSelectedPrice(
      Number(
        ((1 / currencyToCurrency) * korNum.tonumber(v)).toFixed(2),
      ).toLocaleString(),
    );
  };

  const currencyOptions = [
    "krw",
    "eur",
    "usd",
    "jpy",
    "gbp",
    "dkk",
    "chf",
    "vnd",
    "czk",
    "pln",
    "sek",
    "sgd",
    "myr",
    "idr",
  ];

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
          value={selectedCurrency}
          onChange={(e) => {
            setSelectedCurrency(e.target.value);
          }}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {lang.option[currency]}
            </option>
          ))}
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
          value={toCurrency}
          onChange={(e) => {
            setToCurrency(e.target.value);
          }}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {lang.option[currency]}
            </option>
          ))}
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
