"use client";

import { Input } from "@/components/ui/input";
import citiesList from "@/lib/cities-list";
import { forwardRef, useMemo, useState } from "react";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [location, setLocation] = useState<string>("");
    const [hasFocus, setFocus] = useState<boolean>(false);

    const cities = useMemo(() => {
      if (!location.trim()) return [];
      const searchWords = location.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [location]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city"
          type="search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...props}
          ref={ref}
        />
        {location.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                key={city}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocation("");
                }}
                className="block w-full p-2 text-start"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
