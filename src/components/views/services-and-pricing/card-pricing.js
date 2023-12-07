import { CheckInGreenIcon } from "@/components/Icons/CheckInGreenIcon";
import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SmallDataText = ({ data }) => {
  return <span className="text-2xl">{data}</span>;
};

const CardPricing = ({ data }) => {
  return (
    <div className={"mt-3 relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border " + (data?.span ? "border-purple-500" : "border-primary")}>
      {data?.span && (
        <div className="p-4 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {data?.span}
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold text-center">{data.title}</h3>
        <p className="text-center text-sm my-2 text-zinc-600">{data.description}</p>
        <div className="my-4 text-center text-zinc-600">
          <span className="text-1xs text-zinc-400 line-through mb-1">
            {data.discount && <>{data.typePricing + data.discount}</>}
          </span>
          {data.discount && (
            <Chip className={"ml-1 text-white " + (data?.span ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-primary")}>
              {data.percentageSavings}
            </Chip>
          )}
          <br />
          <SmallDataText data={data.typePricing} />
          <span className="text-4xl font-bold">{data.pricing}</span>
          <SmallDataText data={"/ " + data.longTime} />
        </div>

        <div className="my-6">
          <Button
            as={Link}
            href="/contact-us"
            size="lg"
            radius="none"
            className={"w-full text-white " + (data?.span ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-primary")}
          >
            {data.button}
          </Button>
        <p className="text-center text-sm my-2 text-zinc-600">{data.caption}</p>
        </div>
        {data.modules.map((module, i) => (
          <div key={i} className="mt-4">
            <strong>{module.title}</strong>
            <ul className="mt-2 space-y-2">
              {module.services.map((service, j) => (
                <li className="flex items-center" key={j}>
                  <CheckInGreenIcon />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPricing;
