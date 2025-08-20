import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { COOKIES_KEYS } from "./constants";

export const truncate = (str: string, n: number): string => {
  if (str?.length <= n) {
    return str;
  }
  return str?.slice(0, n) + "...";
};
export function formatCurrency(
  amount: number,
  currencySymbol: string = "$"
): string {
  const roundedAmount = Math.round(amount * 100) / 100;
  const [integerPart, fractionalPart] = roundedAmount.toFixed(2).split(".");
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedCurrency = `${currencySymbol}${integerWithCommas}.${fractionalPart}`;
  return formattedCurrency;
}

export function isEmptyOrSpaces(str: string) {
  return (
    str === null || str.match(/^ *$/) !== null || str.trim() === "" || !str
  );
}

export function saveToStorage(key: string, value: any) {
  try {
    return Cookies.set(key, JSON.stringify(value));
  } catch (error) {
    return error;
  }
}

export function getFromStorage(key: string): any {
  try {
    const value = Cookies.get(key);
    if (value) return JSON.parse(value);
    else return null;
  } catch (error) {
    return error;
  }
}

export function removeFromStorage(key: string): void {
  try {
    return Cookies.remove(key);
  } catch (error: any) {
    return error;
  }
}

export const getDecodedToken = () => {
  const token = getFromStorage(COOKIES_KEYS.TOKEN);
  if (!token || typeof token !== "string") {
    return;
  }
  const decodedToken = jwtDecode<{ email: string }>(token);
  return decodedToken;
};
