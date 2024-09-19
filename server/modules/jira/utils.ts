/* eslint-disable @typescript-eslint/no-explicit-any */
export function transformData(
  mapping: Record<string, string>,
  data: Record<string, any>,
): Record<string, any> {
  const transformedData: Record<string, any> = {};

  for (const key in mapping) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      transformedData[mapping[key]] = data[key];
    }
  }

  return transformedData;
}
