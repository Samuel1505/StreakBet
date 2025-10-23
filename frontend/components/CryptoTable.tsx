"use client";

import CryptoRow from "./CryptoRow";

export default function CryptoTable() {
  const cryptos = [
    {
      name: "BONK",
      ticker: "Bonk",
      price: "$0.00001904",
      change: 2.0,
      chartData: [20, 35, 25, 45, 30, 50, 40, 55, 45, 60]
    },
    {
      name: "Tether",
      ticker: "USDT",
      price: "$1.00",
      change: 4.36,
      chartData: [30, 25, 40, 35, 50, 45, 55, 50, 60, 55]
    },
    {
      name: "PENGU",
      ticker: "PENGU",
      price: "$0.02804879",
      change: 3.43,
      chartData: [40, 30, 45, 35, 50, 40, 55, 45, 60, 50]
    },
    {
      name: "TRUMP",
      ticker: "TRUMP",
      price: "$7.59",
      change: -2.62,
      chartData: [60, 55, 50, 45, 40, 35, 30, 35, 30, 25]
    },
    {
      name: "Solana",
      ticker: "SOL",
      price: "$207.04",
      change: 7.56,
      chartData: [25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
    }
  ];

  return (
    <div className="space-y-4">
      {cryptos.map((crypto, index) => (
        <CryptoRow key={index} {...crypto} />
      ))}
    </div>
  );
}