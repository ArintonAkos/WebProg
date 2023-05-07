export const capitalizeFirstLetter = (input: string | undefined): string => {
  if (!input || input.length === 0) {
    return '';
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const includesAny = (input: string | undefined, search: string[]): boolean => {
  if (!input || input.length === 0) {
    return false;
  }

  return search.some((s) => input.includes(s));
};

export const splitByCapital = (input: string | undefined): Array<String> => {
  if (!input || input.length === 0) {
    return [];
  }

  const regex = /(?=[A-Z])/; // positive lookahead for capital letter
  return input.split(regex);
};
