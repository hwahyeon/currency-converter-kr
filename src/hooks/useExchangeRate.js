import { useState, useEffect } from "react";

export function useExchangeRate(selectedCurrency, toCurrency) {
  const [currencyToCurrency, setCurrencyToCurrency] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async (selectedCurrency, toCurrency, setRate) => {
      try {
        // const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedCurrency}/${toCurrency}.min.json`);
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency}.min.json`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // setRate(data[toCurrency]);
        setRate(data[selectedCurrency][toCurrency]);
      } catch (error) {
        setError(error);
      }
    };

    setIsLoading(true);
    fetchExchangeRate(selectedCurrency, toCurrency, setCurrencyToCurrency);
    setIsLoading(false);
  }, [selectedCurrency, toCurrency]);

  return { currencyToCurrency, isLoading, error };
}