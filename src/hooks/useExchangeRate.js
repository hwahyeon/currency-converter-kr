import { useState, useEffect } from "react";

export function useExchangeRate(selectedCurrency) {
  const [currencyToKrw, setCurrencyToKrw] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const KRW = 'krw';

  useEffect(() => {
    const fetchExchangeRate = async (selectedCurrency, toCurrency = KRW, setRate) => {
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedCurrency}/${toCurrency}.min.json`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRate(data[toCurrency]);
      } catch (error) {
        setError(error);
      }
    };

    setIsLoading(true);
    fetchExchangeRate(selectedCurrency, KRW, setCurrencyToKrw);
    setIsLoading(false);
  }, [selectedCurrency]);

  return { currencyToKrw, isLoading, error };
}