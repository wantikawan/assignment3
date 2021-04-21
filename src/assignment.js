import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./App.css";

const ExchangeRate = () => {
  const [rate, setRate] = useState([]);

  const getRate = async () => {
    try {
      const response = await axios(
        "https://api.exchangerate.host/latest?base=IDR&symbols=CAD,JPY,CHF,EUR,USD&amount=100"
      );
      const arrCurr = [];
      const currTrade = 0.0005;
      const rates = response.data.rates;
      const jenis = Object.keys(rates);
      const harga = Object.values(rates);
      jenis.forEach((jenisC, indexKey) => {
        harga.forEach((valueC, indexV) => {
          if (indexKey === indexV) {
            arrCurr.push({
              currency: jenisC,
              value: valueC,
              sell: valueC + valueC * currTrade,
              buy: valueC - valueC * currTrade,
            });
          }
        });
      });

      setRate(arrCurr);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRate();
  }, []);

  console.log(rate);

  return (
    <div className="tabel">
      <Table>
        <thead>
          <tr>
            <th>Base</th>
            <th>Currency</th>
            <th>Sell</th>
            <th>Base Rates</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(rate).map((rate, index) => (
            <tr>
              <td>IDR</td>
              <td key={index}>{rate.currency}</td>
              <td key={index}>{rate.sell}</td>
              <td key={index}>{rate.value}</td>
              <td key={index}>{rate.buy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExchangeRate;
