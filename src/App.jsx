import { useEffect, useState } from "react";

const KEY = "99b81557e63a57d5f0defe33";

export default function App() {
  const [money, setMoney] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [unitFrom, setUnitFrom] = useState("VND");
  const [unitTo, setUnitTo] = useState("USD");

  return (
    <div className="container">
      <CurrencyConverter money={money} setMoney={setMoney} unitFrom={unitFrom} setUnitFrom={setUnitFrom} unitTo={unitTo} setUnitTo={setUnitTo} exchangeRate={exchangeRate} setExchangeRate={setExchangeRate} />
    </div>
  );
}

function CurrencyConverter({ money, setMoney, unitFrom, setUnitFrom, unitTo, setUnitTo, exchangeRate, setExchangeRate }) {
  useEffect(
    function () {
      async function getExchangeRates() {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${unitFrom}`);
        const data = await res.json();

        setExchangeRate(data.conversion_rates[`${unitTo}`]);
      }

      getExchangeRates();
    },
    [unitTo]
  );

  return (
    <>
      <div className="money">
        <input type="number" min={0} value={money} onChange={(e) => setMoney(e.target.value)} placeholder="Enter amount..." />

        <select className="unit-from" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)}>
          <option value="VND">VND</option>
          <option value="USD">USD</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>

        <select className="unit-to" value={unitTo} onChange={(e) => setUnitTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="VND">VND</option>
          <option value="KRW">KRW</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div className="result">
        <p>Result: {money * exchangeRate}</p>
      </div>
    </>
  );
}
