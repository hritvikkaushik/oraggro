"use client";

import { Price, PriceServiceConnection } from "@pythnetwork/price-service-client";
import { useEffect, useState, useRef } from "react";

const getPriceFeed = async () => {
  const connection = new PriceServiceConnection("https://hermes.pyth.network");

  const priceIds = [
    "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
    //   "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
  ];

  connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
    const price = priceFeed.getPriceNoOlderThan(60);
    console.log(`Received an update for ${priceFeed.id}: ${price?.price}`);
  });

  setTimeout(() => {
    connection.closeWebSocket();
  }, 60000);
};

// const usePythFeedPrice = () => {
//   const [price, setPrice] = useState<number>();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPrice(1000);
//     }, 3000);

//     // Clean up the timer on unmount
//     return () => clearTimeout(timer);
//   }, []);
//   return price;
// };

// export default usePythFeedPrice;

const usePythPrice = (priceId: string) => {
    const [price, setPrice] = useState<Price>();
    const connectionRef = useRef<PriceServiceConnection>();
  
    useEffect(() => {
      // Create the PriceServiceConnection
      const connection = new PriceServiceConnection('https://hermes.pyth.network');
      connectionRef.current = connection;
  
      // Subscribe to price feed updates
      connection.subscribePriceFeedUpdates([priceId], (priceFeed) => {
        const latestPrice = priceFeed.getPriceNoOlderThan(60);
        if (latestPrice) {
          setPrice(latestPrice);
        }
      });
  
      // Clean up the WebSocket connection when the component unmounts
      return () => {
        if (connectionRef.current) {
          connectionRef.current.closeWebSocket();
        }
      };
    }, [priceId]);
  
    return price;
  };
  
  export default usePythPrice;