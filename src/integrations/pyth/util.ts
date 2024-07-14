import { tableDisplayPrice } from "@/app/components/PricesTable";
import { Price } from "@pythnetwork/price-service-client";

export function convertPythPrice(priceObj: Price) {
  const price = parseInt(priceObj.price);
  const expo = priceObj.expo;
  const humanReadablePrice = price * Math.pow(10, expo);
  return humanReadablePrice.toFixed(2);
}

export function mapPythPriceToDisplayTablePrice(
  pythPrice: Price | undefined
): tableDisplayPrice {
  if (pythPrice === undefined) {
    return {
      source: "Pythnet Price Feeds",
    };
  }

  return {
    source: "Pythnet Price Feeds",
    updated: convertTimestampToReadableDate(pythPrice.publishTime),
    value: convertPythPrice(pythPrice),
  };
}

function convertTimestampToReadableDate(timestamp: number) {
  // Convert timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return readableDate;
}
