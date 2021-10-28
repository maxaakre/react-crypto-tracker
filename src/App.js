import "./App.css";
import Coin from "./Coin";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState("Waiting to push");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading("Loading...");
      console.log(error);
      try {
        const { data } = await axios(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(data);
        setLoading("");
      } catch (e) {
        setError(e.messeage);
        setLoading("Something went wrong..");
      }
    };
    fetchData();
  }, [error]);

  const handelChange = (e) => {
    setSearch(e.target.value);
  };

  const filtredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Serach a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Serach"
            onChange={handelChange}
          />
        </form>
        <pre>{loading} </pre>
      </div>
      {filtredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
