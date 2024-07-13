"use client";

import NavigationBar from "@/components/NavigationBar";
import usePythPrice from "@/integrations/pyth/usePythPrice";
import { Card } from "flowbite-react";
import { PricesTable, tableDisplayPrice } from "./PricesTable";
import useDIAPrice from "@/integrations/dia/useDIAPrice";
import {
  convertPythPrice,
  mapPythPriceToDisplayTablePrice,
} from "@/integrations/pyth/util";
import { mapDIAPriceToDisplayTablePrice } from "@/integrations/dia/util";

export default function Home() {
  const timeInterval = 3000;
  const asset = "SOL";

  const pythPrice = usePythPrice(asset, timeInterval);
  const pythDisplayPrice = mapPythPriceToDisplayTablePrice(pythPrice);

  const diaPrice = useDIAPrice(timeInterval, asset);
  const diaDisplayPrice = mapDIAPriceToDisplayTablePrice(diaPrice.price);

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col items-center justify-between p-24 dark:bg-gray-900 dark:text-gray-400">
        <div className="flex gap-5">
          <a href="#">BTC/USD</a>
          <a href="#">ETH/USD</a>
          <a href="#">SOL/USD</a>
          <a href="#">AVAX/USD</a>
        </div>

        <Card className="max-w-md p-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            ${computeAveragePrice([pythDisplayPrice, diaDisplayPrice])}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Average price of below <b>2</b> oracles
          </p>
        </Card>
      </div>

      <PricesTable prices={[pythDisplayPrice, diaDisplayPrice]}></PricesTable>
    </>
  );
}

const computeAveragePrice = (prices: tableDisplayPrice[]): string => {
  const sum = prices
    .map((price) => Number.parseFloat(price.value || ""))
    .reduce((a, b) => a + b);
  return (sum / prices.length).toFixed(2);
};
