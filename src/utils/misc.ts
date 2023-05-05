import { test } from '@playwright/test';

export const print = console.info;
export const error = (message: any) => {
  console.error(message);
  process.exit();
};
export const TRUTHYS = [
  'true',
  'True',
  'TRUE',
  '1',
  1,
];

export async function delay(time_ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time_ms);
  });
}

export function objectToMap(obj: any) {
  const map: any = new Map();

  for (const key of Object.keys(obj)) {
    map.set(key, obj[key]);
    if (obj[key] instanceof Object) {
      map.set(key, objectToMap(obj[key]));
    }
  }
  return map;
}

export function mapToObject(map: any) {
  const object: any = {};

  for (const [key, value] of map) {
    object[key] = value;
    if (value instanceof Map) {
      object[key] = mapToObject(value);
    }
  }
  return object;
}

export function log(message: string) {
  test.info().annotations.push({ type: 'info', description: `${message}\n` });
}
