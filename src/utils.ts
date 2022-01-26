import { SwitchType } from './Modal/types';

export function getArrayEle<T = any>(arr: T[], i: number): T | undefined {
  if (!arr || !arr.length || i >= arr.length || -i > arr.length) return undefined;
  if (i >= 0) return arr[i];
  if (i < 0) return arr[arr.length + i];
}

export function firstToUpper(str: string) {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
}

export function replaceWildcard(name: string, stage: SwitchType) {
  let _name = name;
  const wildcardReg = /^(.*){(.+)\|(.+)}(.*)$/;
  if (/{.*}/.test(name)) {
    const regResult = wildcardReg.exec(name);
    // console.log(regResult);
    if (regResult) {
      // 处理名称中的{}替换值
      _name = regResult[1] + regResult[stage === SwitchType.IN ? 2 : 3] + regResult[4];
      // console.log(name)
    } else {
      throw Error('you use error wildcard animation name, please check again');
    }
  }
  if (name.indexOf('*') !== -1) _name = _name.replace('*', stage);
  return _name;
}
