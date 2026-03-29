import React, { createContext, useContext, useState } from "react";

export interface Currency {
  code: "USD" | "INR";
  symbol: "$" | "₹";
  name: string;
  label: string;
  exchangeRate: number; // 1 USD = exchangeRate in the currency
}

interface CurrencyContextType {
  currency: Currency;
  country: string;
  setCurrency: (currency: Currency, country: string) => void;
  convertPrice: (priceInUSD: number) => number;
}

const CURRENCIES: Record<string, Currency> = {
  USD: { code: "USD", symbol: "$", name: "United States Dollar", label: "United States", exchangeRate: 1 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", label: "India", exchangeRate: 84 },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES.USD);
  const [country, setCountry] = useState("United States");

  const setCurrency = (newCurrency: Currency, newCountry: string) => {
    setCurrencyState(newCurrency);
    setCountry(newCountry);
  };

  const convertPrice = (priceInUSD: number): number => {
    return Math.round(priceInUSD * currency.exchangeRate * 100) / 100;
  };

  return (
    <CurrencyContext.Provider value={{ currency, country, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};

export { CURRENCIES };
