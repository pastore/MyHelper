export function exists(value: any): boolean {
  return value !== undefined;
}

export function isNotNull(value: any): boolean {
  return exists(value) && value !== null;
}
