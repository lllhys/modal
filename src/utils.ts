export function getArrayEle<T = any>(arr: T[], i: number): T | undefined {
  if (!arr || !arr.length || i >= arr.length || -i > arr.length) return undefined;
  if (i >= 0) return arr[i];
  if (i < 0) return arr[arr.length + i];
}



export function firstToUpper(str: string){
  return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
}
