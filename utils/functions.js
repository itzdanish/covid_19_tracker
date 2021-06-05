import { Platform, Linking } from "react-native";

const getCovid19DataSummary = async () => {
  try {
    let response = await fetch("https://api.covid19api.com/summary");
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getCurrentGlobalData = async () => {
  try {
    const res = await getCovid19DataSummary();
    return res["Global"];
  } catch (error) {
    return { err: "Server error" };
  }
};

export const getSpecifiedDateGlobalData = async (from, to) => {
  try {
    let response = await fetch(
      `https://api.covid19api.com/world?from=${from}&to=${to}`
    );
    return response.json();
  } catch (error) {
    return { err: "Server error" };
  }
};

export const getSpecifiedDateCountryData = async () => {
  try {
    const res = await getCovid19DataSummary();
    return res["Global"];
  } catch (error) {
    return { err: "Server error" };
  }
};

export const getCurrentDateCountryData = async (selected_item) => {
  try {
    const res = await getCovid19DataSummary();
    const countries = res["Countries"];
    return countries.find((country) => {
      return country["Country"] === selected_item;
    });
  } catch (error) {
    return { err: "Server error" };
  }
};

export const getOsName = () => Platform.OS;

export const callToPhone = async (phone) => {
  phone = getOsName() !== "android" ? `telprompt:${phone}` : `tel:${phone}`;
  Linking.openURL(phone);
};
