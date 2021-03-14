export const currentTimeInSec = (): string => {
  return Math.floor(new Date().getTime() / 1000).toString();
};
