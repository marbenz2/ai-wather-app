"use client";

import { AreaChart, Card, Title } from "@tremor/react";
import React from "react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
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
    "UV Index": results.hourly.uv_index[i],
    "Temperatur (C)": results.hourly.temperature_2m[i],
  }));

  return (
    <Card className="p-2 lg:p-6">
      <Title>Temperatur & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["UV Index", "Temperatur (C)"]}
        colors={["rose", "yellow"]}
        minValue={0}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TempChart;
