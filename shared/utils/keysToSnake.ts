export const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// Recursive function to convert keys of object(s)
export const keysToSnake = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToSnake(item)) as any;
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        camelToSnake(key),
        keysToSnake(value),
      ])
    ) as T;
  } else {
    return obj;
  }
};
