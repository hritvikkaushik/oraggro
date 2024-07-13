import { tableDisplayPrice } from "@/app/PricesTable";
import { diaPrice } from "./types";

export function mapDIAPriceToDisplayTablePrice(
  diaPrice: diaPrice | undefined
): tableDisplayPrice {
  if (diaPrice === undefined) {
    return {
      source: "DIA Price Oracle",
    };
  }

  return {
    source: "DIA Price Oracle",
    updated: new Date(diaPrice.Time).toDateString(),
    value: diaPrice.Price.toFixed(2),
  };
}
