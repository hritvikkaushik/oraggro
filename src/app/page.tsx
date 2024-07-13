"use client";

import NavigationBar from "@/components/NavigationBar";
import usePythPrice from "@/hooks/usePythPrice";
import { Card } from "flowbite-react";
import { PricesTable } from "./PricesTable";

export default function Home() {
  const btcPrice = usePythPrice(
    "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"
  );

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col items-center justify-between p-24 dark:bg-gray-900 dark:text-gray-400">
        <div className="flex gap-5">
          <a href="#">Coin1</a>
          <a href="#">Coin2</a>
          <a href="#">Coin3</a>
          <a href="#">Coin4</a>
        </div>

        <Card className="max-w-md p-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            ${btcPrice ? `${btcPrice.price.slice(0, 5)}` : "Loading..."}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Average price of below <b>2</b> oracles
          </p>
        </Card>
      </div>

      <PricesTable price={btcPrice}></PricesTable>
    </>
  );
}
