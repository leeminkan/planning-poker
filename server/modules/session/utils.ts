export const getFormattedSessionRoom = (id: string) => {
  return `SESSION-${id}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefinedValuesFromObject = <T>(obj: any): T => {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};
