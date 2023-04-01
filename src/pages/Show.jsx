import React from "react";
import { useParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../components/Header";
import showStore from "../stores/showStore";

export default function Show() {
  const store = showStore();
  const params = useParams();

  React.useEffect(() => {
    store.fetchData(params.id);
  }, [params.id, store]);

  return (
    <div>
      <Header back />
      {store.data && (
        <>
          <header className="show-header">
            <img src={store.data.image.large} alt="" />
            <h2>
              {store.data.name} ({store.data.symbol})
            </h2>
          </header>
          <div className="width">
            <div className="show-graph">
              <ResponsiveContainer width="100%" height="100%">
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
                  <Area
                    type="monotone"
                    dataKey="Price"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="show-details">
            <div className="width">
              <h2>Details</h2>
              <div className="show-details-row">
                <h3>Market cap rank</h3>
                <span>${store.data.market_cap_rank}</span>
              </div>
              <div className="show-details-row">
                <h3>24h low</h3>
                <span>${store.data.market_data.high_24h.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>24h low</h3>
                <span>${store.data.market_data.low_24h.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>Circulating supply</h3>
                <span>${store.data.market_data.circulating_supply}</span>
              </div>
              <div className="show-details-row">
                <h3>Current price</h3>
                <span>{store.data.market_data.current_price.usd}</span>
              </div>
              <div className="show-details-row">
                <h3>1y change</h3>
                <span>
                  {store.data.market_data.price_change_percentage_1y.toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
