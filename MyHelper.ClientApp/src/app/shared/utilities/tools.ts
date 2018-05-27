export function exists(value: any): boolean {
  return value !== undefined;
}

export function isNotNull(value: any): boolean {
  return exists(value) && value !== null;
}

export function isNotNullOrEmpty(value: string): boolean {
  return isNotNull(value) && value !== '';
}

export function arrayFromEnum<T>(T): any[] {
  const array = [];
  for (const item in T) {
    if (typeof T[item] === 'number' && T[item] !== 0) {
      array.push({ id: T[item], name: item });
    }
  }
  return array;
}
