// import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RateTable } from "./RateTable";
import { CurrencyCodePicker } from "./CurrencyCodePicker";
import { AmountField } from "./AmountField";
// import { getExchangeRates } from "../api";
import {getAmount, getCurrencyCode, getCurrencyData} from "../store/rates"
import {supportedCurrencies,
  // changeCurrencyCode
} from "../store/rates";


export function ExchangeRate() {
  
  // const dispatch = useDispatch();
  // const [amount, setAmount] = useState("1.50");
  // const [currencyCode, setCurrencyCode] = useState("USD");
  // const [currencyData, setCurrencyData] = useState({ USD: 1.0 });

  const amount = useSelector(getAmount)
  const currencyCode = useSelector(getCurrencyCode)
  const currencyData = useSelector(getCurrencyData)

  // const setAmount = () => {};
  // const setCurrencyCode = () => {};
  // fetch the exchange rates each time currency code changes
  // const dispatch = useDispatch();


  // useEffect(() => {
  //   dispatch(changeCurrencyCode(currencyCode));
  // }, []);

  // const handleCurrencyCode = useCallback(
  //   (e) => setCurrencyCode(e.target.value),
  //   []
  // );

  // const handleAmountChange = useCallback((e) => {
  //   let newAmount = e.target.value;
  //   setAmount(newAmount);
  // }, []);

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates{" "}
          <CurrencyCodePicker
            supportedCurrencies={supportedCurrencies}
            currencyCode={currencyCode}
            // onChange={handleCurrencyCode}
          />
        </h1>
      </section>
      <section>
        <AmountField amount={amount} 
        // onChange={handleAmountChange} 
        />
      </section>
      <section>
        <RateTable currencyData={currencyData} amount={amount} />
      </section>
    </>
  );
}
