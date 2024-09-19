import { z } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getJiraIssueLink = (host: string = '', issueKey: string) => {
  return `${host}/browse/${issueKey}`;
};

export function replaceUndefinedWithEmptyString(
  obj: Record<string, any>,
): Record<string, any> {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key] === undefined ? '' : obj[key];
    }
  }

  return newObj;
}

export function createEmptyObjectFromZodSchema<T extends z.ZodObject<any>>(
  schema: T,
): z.infer<T> {
  const emptyObject: any = {};

  for (const key in schema.shape) {
    emptyObject[key] = '';
  }

  return emptyObject as z.infer<T>;
}
