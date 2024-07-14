import { useState, useEffect } from "react";
import axios from "axios";
import { diaPrice } from "./types";
import { diaAssetMapping } from "./assetMapping";

const useDIAPrice = (interval = 10000, assetName: string) => {
  const [price, setPrice] = useState<diaPrice>();
  const [error, setError] = useState(null);

  // const mappedAssetName = diaAssetMapping.get(assetName);

  useEffect(() => {
    const fetchPrice = () => {
      const options = {
        method: "GET",
        url: `https://api.diadata.org/v1/quotation/${assetName}`,
        headers: { "Content-Type": "application/json" },
      };

      axios
        .request(options)
        .then((response) => {
          // console.log(response.data);
          // console.log("DIA: ", response.data);
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
