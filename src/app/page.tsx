"use client";

import NavigationBar from "@/components/NavigationBar";
import usePythPrice from "@/integrations/pyth/usePythPrice";
import { Card } from "flowbite-react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiSolana, SiPolygon } from "react-icons/si";
import { PricesTable, tableDisplayPrice } from "./PricesTable";
import useDIAPrice from "@/integrations/dia/useDIAPrice";
import { mapPythPriceToDisplayTablePrice } from "@/integrations/pyth/util";
import { mapDIAPriceToDisplayTablePrice } from "@/integrations/dia/util";
import { useState } from "react";

export default function Home() {
  const timeInterval = 3000;
  const [asset, setAsset] = useState("BTC");

  const pythPrice = usePythPrice(asset, timeInterval);
  const pythDisplayPrice = mapPythPriceToDisplayTablePrice(pythPrice);

  const diaPrice = useDIAPrice(timeInterval, asset);
  const diaDisplayPrice = mapDIAPriceToDisplayTablePrice(diaPrice.price);

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col items-center justify-center flex-grow dark:bg-gray-900 dark:text-gray-400">
        <div className="flex gap-5 mt-8">
          <div
            className="flex flex-col items-center hover:cursor-pointer h-16 active:bg-gray-300 active:dark:bg-gray-700 justify-center"
            onClick={() => {
              setAsset("BTC");
            }}
          >
            <FaBitcoin size={`3em`} />
            <p>BTC/USD</p>
          </div>
          <div
            className="flex flex-col items-center hover:cursor-pointer h-16 active:bg-gray-300 active:dark:bg-gray-700 justify-center"
            onClick={() => {
              setAsset("ETH");
            }}
          >
            <FaEthereum size={`3em`} />
            <p>ETH/USD</p>
          </div>
          <div
            className="flex flex-col items-center hover:cursor-pointer h-16 active:bg-gray-300 active:dark:bg-gray-700 justify-center"
            onClick={() => {
              setAsset("SOL");
            }}
          >
            <SiSolana size={`3em`} />
            <p>SOL/USD</p>
          </div>
          <div
            className="flex flex-col items-center hover:cursor-pointer h-16 active:bg-gray-300 active:dark:bg-gray-700 justify-center"
            onClick={() => {
              setAsset("MATIC");
            }}
          >
            <SiPolygon size={`3em`} />
            <p>MATIC/USD</p>
          </div>
        </div>

        <Card className="max-w-md p-20 my-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            ${computeAveragePrice([pythDisplayPrice, diaDisplayPrice])}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Average price of below <b>2</b> oracles
          </p>
        </Card>

        <PricesTable prices={[pythDisplayPrice, diaDisplayPrice]}></PricesTable>
      </div>
    </>
  );
}

const computeAveragePrice = (prices: tableDisplayPrice[]): string => {
  const sum = prices
    .map((price) => Number.parseFloat(price.value || ""))
    .reduce((a, b) => a + b);
  return (sum / prices.length).toFixed(2);
};
