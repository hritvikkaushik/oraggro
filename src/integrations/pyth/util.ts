import { tableDisplayPrice } from "@/app/PricesTable";
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
    updated: new Date(pythPrice.publishTime).toDateString(),
    value: convertPythPrice(pythPrice),
  };
}
