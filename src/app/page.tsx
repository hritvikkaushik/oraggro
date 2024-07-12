"use client"


import usePythPrice from "@/hooks/usePythPrice";
import { useEffect, useState } from "react";

export default function Home() {

  const btcPrice = usePythPrice('0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex gap-5">
        <a href="#">Coin1</a>
        <a href="#">Coin2</a>
        <a href="#">Coin3</a>
        <a href="#">Coin4</a>
      </div>
      
      <div>
        <h2>Average price</h2>
        <h1>{btcPrice?`${btcPrice.price}`:"Loading..."}</h1>
        <p>Computed average from <b>3</b> oracles.</p>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row content-between gap-40">
          <div>Oracle</div>
          <div>Price</div>
          <div>Updated</div>
        </div>

        <div className="flex flex-row content-between gap-40">
        <div>Pyth</div>
        <div>{btcPrice?`${btcPrice.price}`:"Loading..."}</div>
        <div>{btcPrice?`${btcPrice.publishTime}`:"Loading..."}</div>
        </div>
      </div>
    </main>
  );
}
