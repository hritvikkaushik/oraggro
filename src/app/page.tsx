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
import React, { useState } from "react";

interface AssetSelectorProps extends React.PropsWithChildren {
  selectedAsset: string;
  asset: string;
  setAsset: React.Dispatch<React.SetStateAction<string>>;
}

const AssetSelector: React.FC<AssetSelectorProps> = (props) => {
  return (
    <div
      className={`flex flex-col items-center rounded-md hover:cursor-pointer pt-2 active:bg-gray-300 active:dark:bg-gray-700 justify-center ${
        props.selectedAsset === props.asset
          ? "bg-sky-300 dark:bg-sky-950"
          : null
      }`}
      onClick={() => {
        props.setAsset(props.asset);
      }}
    >
      {props.children}
    </div>
  );
};

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
          <AssetSelector selectedAsset={asset} setAsset={setAsset} asset="BTC">
            <FaBitcoin size={`3em`} />
            <p className="mx-2 mb-2">BTC/USD</p>
          </AssetSelector>
          <AssetSelector selectedAsset={asset} setAsset={setAsset} asset="ETH">
            <FaEthereum size={`3em`} />
            <p className="mx-2 mb-2">ETH/USD</p>
          </AssetSelector>
          <AssetSelector selectedAsset={asset} setAsset={setAsset} asset="SOL">
            <SiSolana size={`3em`} />
            <p className="mx-2 mb-2">SOL/USD</p>
          </AssetSelector>
          <AssetSelector
            selectedAsset={asset}
            setAsset={setAsset}
            asset="MATIC"
          >
            <SiPolygon size={`3em`} />
            <p className="mx-2 mb-2">MATIC/USD</p>
          </AssetSelector>
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
