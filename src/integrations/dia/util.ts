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
    updated: convertTimestampToReadableDate(new Date(diaPrice.Time)),
    value: diaPrice.Price.toFixed(2),
  };
}

function convertTimestampToReadableDate(date: Date) {
  // Extract date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  // Extract time components
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Format the date and time
  const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return readableDate;
}
