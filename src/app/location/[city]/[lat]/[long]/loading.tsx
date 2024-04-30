import { SunIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-tremor-background-strong">
      <SunIcon
        className="w-24 h-24 animate-bounce text-yellow-500"
        color="yellow"
      />
      <h1
        className={`text-6xl text-center mb-10 animate-pulse text-tremor-content`}
      >
        Lade Wetterdaten und KI...
      </h1>
      <h2
        className={`text-xl font-thin text-center mb-10 animate-pulse text-tremor-content`}
      >
        Einen Moment bitte, wir bereiten die Wetterdaten für Sie auf!
      </h2>
    </div>
  );
}

export default Loading;
