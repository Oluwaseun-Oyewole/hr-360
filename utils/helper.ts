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
    str === null ||
    str.match(/^ *$/) !== null ||
    str.trim() === "" ||
    str === ""
  );
}
