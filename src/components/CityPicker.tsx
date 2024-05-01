"use client";

import React, { useEffect, useState, useMemo } from "react"; // useMemo added here
import {
  GlobeEuropeAfricaIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Button, TextInput } from "@tremor/react";
import { City } from "country-state-city";
import { useRouter } from "next/navigation";

type CityOption = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
};

const selectedCountry = {
  value: {
    latitude: "51.00000000",
    longitude: "9.00000000",
    isoCode: "DE",
  },
  label: "Germany",
};

const CityPicker = () => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [invalidInput, setInvalidInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  const findCityOption = (label: string) =>
    cityOptions?.find((option) => option?.label === label);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    const selectedCityOption = findCityOption(input);
    if (selectedCityOption) {
      handleSelectedCity(selectedCityOption);
      setInvalidInput(false);
    } else {
      // Check if the current input exactly matches one of the suggestions in the datalist
      const matchingCityOption = cityOptions?.find(
        (option) => option?.label.toLowerCase() === input.toLowerCase()
      );
      if (matchingCityOption) {
        handleSelectedCity(matchingCityOption);
        setInvalidInput(false);
      } else {
        setInvalidInput(true);
        setTimeout(() => setInvalidInput(false), 1000);
      }
    }
  };

  const handleSelectedCity = (city: CityOption) => {
    router.push(
      `/location/${city?.value.name}/${city?.value.latitude}/${city?.value.longitude}`
    );
  };

  const cityOptions = useMemo(() => {
    const cities = City.getCitiesOfCountry(selectedCountry.value.isoCode);
    if (!cities) {
      return [];
    }
    const uniqueCities = Array.from(
      new Set(cities.map((city) => city.name.toLowerCase()))
    ).map((name) => cities.find((city) => city.name.toLowerCase() === name));
    return uniqueCities
      ?.filter(
        (city) =>
          city &&
          city.name.toLowerCase().startsWith(debouncedInput.toLowerCase())
      )
      .map((state) => {
        if (!state) {
          return null;
        }
        return {
          value: {
            latitude: state.latitude!,
            longitude: state.longitude!,
            countryCode: state.countryCode,
            name: state.name,
            stateCode: state.stateCode,
          },
          label: state.name,
        };
      })
      .filter((state) => state !== null);
  }, [debouncedInput]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-tremor-content">
        <GlobeEuropeAfricaIcon className="h-5 w-5" />
        <label htmlFor="city">Stadt</label>
      </div>
      <div className="flex w-full">
        <TextInput
          spellCheck="false"
          type="text"
          className={`text-tremor-content rounded-r-none ring-0 min-w-0 ${
            invalidInput
              ? "ring-1 ring-red-500 animate-[pulse_1s_ease-in-out_infinite]"
              : ""
          }`}
          id="city"
          value={input}
          onChange={handleInputChange}
          list="cityOptions"
          placeholder="Suche..."
        />
        <Button
          className="rounded-l-none"
          icon={MagnifyingGlassIcon}
          onClick={handleSubmit}
        />
      </div>
      <datalist id="cityOptions">
        {cityOptions?.map((option) => (
          <option
            key={`${option?.label}-${option?.value?.stateCode}`}
            value={option?.label}
          />
        ))}
      </datalist>
    </div>
  );
};

export default CityPicker;
