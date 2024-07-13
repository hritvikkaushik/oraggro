import { useState, useEffect } from "react";
import axios from "axios";

export interface diaPrice {
  Symbol: string;
  Name: string;
  Address: string;
  Blockchain: string;
  Price: number;
  PriceYesterday: number;
  VolumeYesterdayUSD: number;
  Time: string;
  Source: string;
  Signature: string;
}

const useDIAPrice = (interval = 10000, assetName: string) => {
  const [price, setPrice] = useState<diaPrice>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = () => {
      const options = {
        method: "GET",
        url: `https://api.diadata.org/v1/assetQuotation/${assetName}/0x0000000000000000000000000000000000000000`,
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          setPrice(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
        });
    };

    // Fetch price immediately on mount
    fetchPrice();

    // Set up the interval to fetch price regularly
    const intervalId = setInterval(fetchPrice, interval);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [interval, assetName]);

  return { price, error };
};

export default useDIAPrice;
