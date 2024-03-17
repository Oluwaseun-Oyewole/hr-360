export const truncate = (str: string, n: number): string => {
  if (str?.length <= n) {
    return str;
  }
  return str?.slice(0, n) + "...";
};

export const formatLargeNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
