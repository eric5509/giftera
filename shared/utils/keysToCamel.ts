export const snakeToCamel = (str: string) =>
  str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

// Recursive function to convert keys of object(s)
export const keysToCamel = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamel(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),
        keysToCamel(value),
      ])
    ) as T;
  } else {
    return obj;
  }
};
