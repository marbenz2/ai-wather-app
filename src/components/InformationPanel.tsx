import weatherCodeToString from "@/lib/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import CityPicker from "./CityPicker";

type Props = {
  city: string;
  results: Root;
  lat: string;
  long: string;
};

function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div className="flex flex-col text-tremor-content p-4 lg:p-10 bg-tremor-background gap-12 border-b md:border-b-0 md:border-r border-tremor-border-accent">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-thin">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          Long, Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr />
      <div className="flex justify-between gap-8">
        <div className="flex flex-col w-full">
          <p className="text-xl">
            {new Date().toLocaleDateString("de-DE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-thin">
            Zeitzone:{" "}
            {new Date()
              .toLocaleString("de-DE", {
                timeZone: "Europe/Berlin",
                timeZoneName: "long",
              })
              .split(" ")
              .pop()}
          </p>
        </div>
        <p className="text-xl">
          {new Date().toLocaleTimeString("de-DE", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </p>
      </div>
      <hr />
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between gap-8">
          <Image
            alt={weatherCodeToString[results.current_weather.weathercode].label}
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[results.current_weather.weathercode].icon
            }.png`}
            width={75}
            height={75}
          />
          <p className="text-xl">
            {weatherCodeToString[results.current_weather.weathercode].label}
          </p>
        </div>

        <p className="text-6xl text-end">
          {results.current_weather.temperature.toFixed(1)}°C
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <SunIcon className="h-10 w-10 text-gray-400" />
          <p className="text-xl">
            {new Date(results.daily.sunrise[0]).toLocaleTimeString("de-DE", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
        </div>

        <div className="flex justify-between items-center gap-4">
          <MoonIcon className="h-10 w-10 text-gray-400" />

          <p className="text-xl">
            {new Date(results.daily.sunset[0]).toLocaleTimeString("de-DE", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
