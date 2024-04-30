"use client";

import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("de-DE", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);
  const data = hourly.map((hour, i) => ({
    time: hour,
    "Luftfeuchtigkeit (%)": results.hourly.relativehumidity_2m[i],
  }));
  const dataFormatter = (number: number) => `${number}%`;

  return (
    <Card className="p-2 lg:p-6">
      <Title>Luftfeuchtigkeit</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Luftfeuchtigkeit (%)"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        yAxisWidth={40}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}

export default HumidityChart;
