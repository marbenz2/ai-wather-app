"use client";

import React, { useEffect, useState, useMemo } from "react"; // useMemo added here
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { TextInput } from "@tremor/react";
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const selectedCityOption = findCityOption(input);
      if (selectedCityOption) {
        handleSelectedCity(selectedCityOption);
      } else {
        const cities = City.getCitiesOfCountry(selectedCountry.value.isoCode);
        const city = cities?.find(
          (city) => city.name.toLowerCase() === input.toLowerCase()
        );
        if (city) {
          handleSelectedCity({
            value: {
              latitude: city.latitude!,
              longitude: city.longitude!,
              countryCode: city.countryCode,
              name: city.name,
              stateCode: city.stateCode,
            },
            label: city.name,
          });
        }
      }
    }
  };

  const handleBlur = () => {
    const selectedCityOption = findCityOption(input);
    if (selectedCityOption) {
      handleSelectedCity(selectedCityOption);
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
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-tremor-content">
          <GlobeAmericasIcon className="text-tremor-content h-5 w-5" />
          <label htmlFor="city">Stadt</label>
        </div>
        <TextInput
          spellCheck="false"
          type="text"
          className="text-tremor-content-inverted"
          id="city"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          list="cityOptions"
          placeholder="Stadt eingeben..."
        />
        <datalist id="cityOptions">
          {cityOptions?.map((option) => (
            <option
              key={`${option?.label}-${option?.value?.stateCode}`}
              value={option?.label}
            />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default CityPicker;
