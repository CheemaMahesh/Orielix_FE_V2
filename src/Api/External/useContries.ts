import axios from "axios";
import { useState } from "react";

export type CountryLoading = {
  getCountries: boolean;
  getStates: boolean;
  getCities: boolean;
};

export const LOADING_INITIAL_STATE: CountryLoading = {
  getCountries: false,
  getStates: false,
  getCities: false,
};

export type CountryType = {
  country: string;
  iso3: string;
};

export type StateType = {
  name: string;
  state_code: string;
};

export const useCountries = () => {
  const [isLoading, setIsLoading] = useState<CountryLoading>(
    LOADING_INITIAL_STATE
  );

  const handleLoading = (type: string, value: boolean) => {
    setIsLoading((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const getCountries = async () => {
    try {
      handleLoading("getCountries", true);
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      if (response.data.error) {
        throw new Error("Failed to fetch countries");
      }
      const res = response.data?.data?.map((item) => ({
        country: item.country,
        iso3: item.iso3,
      }));
      return res || [];
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      handleLoading("getCountries", false);
    }
  };

  const getStates = async (country: string) => {
    try {
      handleLoading("getStates", true);
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country }
      );
      if (response.data.error) {
        throw new Error("Failed to fetch states");
      }
      const res = response.data?.data?.states || [];
      return res;
    } catch (err) {
      console.error("Error fetching states:", err);
    } finally {
      handleLoading("getStates", false);
    }
  };

  const getCities = async (country: string, state: string) => {
    try {
      handleLoading("getCities", true);
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state }
      );
      if (response.data.error) {
        throw new Error("Failed to fetch cities");
      }
      const res = response.data?.data || [];
      return res;
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      handleLoading("getCities", false);
    }
  };

  return { isLoading, getCountries, getStates, getCities };
};
