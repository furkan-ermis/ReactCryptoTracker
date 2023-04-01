import React from "react";
import { useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import showStore from "../stores/showStore";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);
  }, [params.id, store]);

  if (!store.data) return <></>;

  return (
    <div>
      <header>
        <img src={store.data.image.large} alt="" />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
        data={store.graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <div>
        <h4>Market cap rank</h4>
        <span>${store.data.market_cap_rank}</span>
      </div>
      <div>
        <h4>24h low</h4>
        <span>${store.data.market_data.high_24h.usd}</span>
      </div>
      <div>
        <h4>24h low</h4>
        <span>${store.data.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>Circulating supply</h4>
        <span>${store.data.market_data.circulating_supply}</span>
      </div>
      <div>
        <h4>Current price</h4>
        <span>{store.data.market_data.current_price.usd}</span>
      </div>
      <div>
        <h4>1y change</h4>
        <span>
          {store.data.market_data.price_change_percentage_1y.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
