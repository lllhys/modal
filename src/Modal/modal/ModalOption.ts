import type {
  ModalAnimationType,
  ModalBaseOptions,
  ModalUpdateOptions,
  ReactComponent,
} from './types';
import ModalAnimation from './ModalAnimation';
import { defaultModalOptions } from '../constants';
import React from 'react';
import store from '../store';

export enum UpdateType {
  UPDATE,
  REPLACE,
}

export type NoneAnimationType = 'none';
export const NoneAnimation = 'none';

const handleAnimation = (animation: ModalAnimationType): NoneAnimationType | ModalAnimation => {
  if (animation === false || animation === NoneAnimation) return NoneAnimation;
  // animation
  return new ModalAnimation(animation);
};

const getValue = <T, V extends keyof T>(target: T, key: V): T[V] => {
  return target[key];
};

const getDefaultValue = <T extends keyof typeof defaultModalOptions>(
  key: T,
): Required<typeof defaultModalOptions>[T] => {
  // 傻逼类型，ts ignore真香
  // @ts-ignore
  return getValue(store.config, key) ?? getValue(defaultModalOptions, key);
};

export class ModalOptions {
  options: ModalBaseOptions = {};
  zIndex: number = getDefaultValue('zIndex');
  showMask: boolean = getDefaultValue('showMask');
  maskStyle: React.CSSProperties = getDefaultValue('maskStyle');
  immediately: boolean = getDefaultValue('immediately');
  maskClosable: boolean = getDefaultValue('maskClosable');
  // @ts-ignore
  maskComponent: ReactComponent = getDefaultValue('maskComponent');
  // @ts-ignore
  maskAnimation: ModalAnimation | NoneAnimationType = getDefaultValue('maskAnimation');
  // @ts-ignore
  bodyAnimation: ModalAnimation | NoneAnimationType = getDefaultValue('bodyAnimation');

  constructor(initOptions: ModalBaseOptions) {
    this.options = initOptions;
    this.updateOptions(initOptions, UpdateType.REPLACE);
  }

  getMixedOptions(): ModalBaseOptions {
    // 从全局拿option 融合
    return {
      ...defaultModalOptions,
      ...store.config,
      ...this.options,
    };
  }

  updateOptions(options: ModalUpdateOptions, type: UpdateType = UpdateType.UPDATE) {
    let _tmpOptions = options;
    switch (type) {
      case UpdateType.REPLACE:
        this.options = options;
        _tmpOptions = this.getMixedOptions();
        break;
      case UpdateType.UPDATE:
        this.options = { ...this.options, ...options };
        break;
      default:
        console.warn('Error update type when update modal options');
        return;
    }

    // update attr
    for (const key of Object.getOwnPropertyNames(_tmpOptions)) {
      // update local attr;
      switch (key) {
        case 'bodyAnimation':
        case 'maskAnimation':
          this[key] = handleAnimation(_tmpOptions[key]!);
          break;
        case 'maskComponent':
          if (typeof _tmpOptions?.maskComponent === 'function') {
            this.maskComponent = _tmpOptions.maskComponent;
          } else {
            this.maskComponent = () => {
              return (
                (_tmpOptions.maskComponent as JSX.Element | undefined) || React.createElement('div')
              );
            };
          }
          break;
        default:
          // @ts-ignore
          this[key] = _tmpOptions[key];
      }
    }
  }
}
