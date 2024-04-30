import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { getClient } from "@/helpers/apollo-client";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import React from "react";

export const revalidate = 1440;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: true,
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  const dataToSend = cleanData(results, city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend,
    }),
  });

  const { result, status } = await res.json();

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-tremor-background-strong">
      <InformationPanel city={city} lat={lat} results={results} long={long} />
      <div className="flex-1 p-4 lg:p-10">
        <div className="flex flex-col gap-4">
          <div className="">
            <h2 className="text-tremor-content text-xl">Tagesübersicht</h2>
            <p className="text-sm text-tremor-content-subtle">
              Letztes Update:{" "}
              {new Date(results.current_weather.time).toLocaleString("de-DE")} (
              {results.timezone})
            </p>
          </div>
          <div className="">{status && <CalloutCard message={result} />}</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <StatCard
              title="Maximale Temperatur"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="yellow"
            />
            <StatCard
              title="Minimale Temperatur"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="green"
            />

            <div>
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="rose"
              />

              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="Hoher UV Index, Sonnenschutz auftragen!"
                  warning
                />
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Windgeschwindigkeit"
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                color="cyan"
              />
              <StatCard
                title="Windrichtung"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <TempChart results={results} />
            <RainChart results={results} />
            <HumidityChart results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
