export function getArrayEle<T = any>(arr: T[], i: number): T | undefined {
  if (!arr || !arr.length || i >= arr.length || -i > arr.length) return undefined;
  if (i >= 0) return arr[i];
  if (i < 0) return arr[arr.length + i];
}
