"use client";

import NavigationBar from "@/app/components/NavigationBar";
import usePythPrice from "@/integrations/pyth/usePythPrice";
import { Card } from "flowbite-react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiSolana, SiPolygon } from "react-icons/si";
import { PricesTable, tableDisplayPrice } from "./components/PricesTable";
import useDIAPrice from "@/integrations/dia/useDIAPrice";
import { mapPythPriceToDisplayTablePrice } from "@/integrations/pyth/util";
import { mapDIAPriceToDisplayTablePrice } from "@/integrations/dia/util";
import React, { useState } from "react";
import AssetSelectorButton from "./components/AssetSelectorButton";

export default function Home() {
  const timeInterval = 3000;
  const [asset, setAsset] = useState("BTC");

  const pythPrice = usePythPrice(asset, timeInterval);
  const pythDisplayPrice = mapPythPriceToDisplayTablePrice(
    pythPrice.price,
    pythPrice.loading
  );

  const diaPrice = useDIAPrice(timeInterval, asset);
  const diaDisplayPrice = mapDIAPriceToDisplayTablePrice(diaPrice.price);

  const avgPrice = computeAveragePrice([pythDisplayPrice, diaDisplayPrice]);

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col items-center justify-center flex-grow dark:bg-gray-900 dark:text-gray-400">
        <div className="flex gap-5 mt-8">
          <AssetSelectorButton
            selectedAsset={asset}
            setAsset={setAsset}
            asset="BTC"
          >
            <FaBitcoin size={`3em`} />
            <p className="mx-2 mb-2">BTC/USD</p>
          </AssetSelectorButton>
          <AssetSelectorButton
            selectedAsset={asset}
            setAsset={setAsset}
            asset="ETH"
          >
            <FaEthereum size={`3em`} />
            <p className="mx-2 mb-2">ETH/USD</p>
          </AssetSelectorButton>
          <AssetSelectorButton
            selectedAsset={asset}
            setAsset={setAsset}
            asset="SOL"
          >
            <SiSolana size={`3em`} />
            <p className="mx-2 mb-2">SOL/USD</p>
          </AssetSelectorButton>
          <AssetSelectorButton
            selectedAsset={asset}
            setAsset={setAsset}
            asset="MATIC"
          >
            <SiPolygon size={`3em`} />
            <p className="mx-2 mb-2">MATIC/USD</p>
          </AssetSelectorButton>
        </div>

        <Card className="max-w-md p-20 my-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            {avgPrice === "NaN" ? "Loading..." : `$${avgPrice}`}
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
