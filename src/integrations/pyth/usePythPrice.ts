"use client";

import {
  Price,
  PriceServiceConnection,
} from "@pythnetwork/price-service-client";
import { useEffect, useState, useRef } from "react";
import { pythAssetMapping } from "./assetMapping";

const usePythPrice = (asset: string, updateInterval: number = 3000) => {
  const [price, setPrice] = useState<Price>();
  const [loading, setLoading] = useState(true);

  const connectionRef = useRef<PriceServiceConnection>();
  const latestPriceRef = useRef<Price>();

  const priceId = pythAssetMapping.get(asset) || "";

  useEffect(() => {
    const initializeConnection = () => {
      if (connectionRef.current) {
        // console.log("Closing websocket");
        connectionRef.current.closeWebSocket();
        setLoading(true);
      }
      // Create the PriceServiceConnection
      const connection = new PriceServiceConnection(
        "https://hermes.pyth.network"
      );
      connectionRef.current = connection;
      // Subscribe to price feed updates
      connection.subscribePriceFeedUpdates([priceId], (priceFeed) => {
        const latestPrice = priceFeed.getPriceNoOlderThan(60);
        if (latestPrice) {
          // console.log("Pyth date: ", latestPrice.publishTime);
          latestPriceRef.current = latestPrice;
          setPrice(latestPriceRef.current);
          setLoading(false);
        }
      });
    };

    initializeConnection();

    const intervalId = setInterval(() => {
      if (latestPriceRef.current !== null) {
        setPrice(latestPriceRef.current);
      }
    }, updateInterval);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (connectionRef.current) {
        connectionRef.current.closeWebSocket();
      }
      clearInterval(intervalId);
    };
  }, [priceId, updateInterval]);

  return { price, loading };
};

export default usePythPrice;
