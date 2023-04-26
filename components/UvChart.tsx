"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function UvChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => {
    const adjustedHour = i === 0 ? 0 : Number(hour);
    return {
      time: `${adjustedHour}:00`,
      "UV Index": results.hourly.uv_index[i],
    };
  });

  const dataFormater = (number: number) => `${number}`;

  return (
    <Card className="p-2">
      <Title>UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["UV Index"]}
        colors={["rose"]}
        minValue={0}
        maxValue={15}
        valueFormatter={dataFormater}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default UvChart;
