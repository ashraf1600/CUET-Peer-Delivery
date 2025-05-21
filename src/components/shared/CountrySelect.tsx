"use client";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import PropTypes from "prop-types";
import React from "react";

interface CountrySelectProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  labels: { [key: string]: string };
  disabled?: boolean;
  [key: string]: any;
}

// Function to convert country code to flag emoji
const getCountryFlag = (countryCode: string): string => {
  // For special case "ZZ" (international)
  if (countryCode === "ZZ") return "🌐";

  // Convert country code to regional indicator symbols
  // Each letter is represented by a regional indicator symbol (Unicode range 1F1E6-1F1FF)
  // For example, "US" becomes "🇺🇸"
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

const CountrySelect = ({
  value,
  onChange,
  labels,
  disabled,
  ...rest
}: CountrySelectProps) => (
  <select
    {...rest}
    value={value}
    onChange={(event) => onChange(event.target.value || undefined)}
    disabled={disabled}
  >
    <option value="">
      {getCountryFlag("ZZ")} {labels["ZZ"]}
    </option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {getCountryFlag(country)} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

export default CountrySelect;
