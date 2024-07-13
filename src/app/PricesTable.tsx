"use client";
import { diaPrice } from "@/hooks/useDIAPrice";
import { Price } from "@pythnetwork/price-service-client";
import { CustomFlowbiteTheme, Table } from "flowbite-react";

export function PricesTable(props: {
  pythPrice: Price | undefined;
  diaPrice: diaPrice | undefined;
}) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable theme={tableTheme}>
        <Table.Head>
          <Table.HeadCell>Oracle</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Updated</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {"Pythnet Price Feeds"}
            </Table.Cell>
            <Table.Cell>
              ${props.pythPrice ? `${props.pythPrice.price}` : "Loading..."}
            </Table.Cell>
            <Table.Cell>
              {props.pythPrice
                ? `${props.pythPrice.publishTime}`
                : "Loading..."}
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {"DIA Data Oracle"}
            </Table.Cell>
            <Table.Cell>
              ${props.diaPrice ? `${props.diaPrice.Price}` : "Loading..."}
            </Table.Cell>
            <Table.Cell>
              {props.diaPrice ? `${props.diaPrice.Time}` : "Loading..."}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};
