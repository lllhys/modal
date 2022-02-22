import { updateAll } from './store';
import type React from 'react';
import type { ModalObject } from '../modal/ModalObject';
import type { ModalContainerProps } from '../modal/types';
import { ModalGlobalConfig, ModalState } from '../modal/types';
import { getArrayEle } from '../../utils';
import { defaultGlobalModalConfig } from '../constants';

export interface IStore extends Required<ModalContainerProps> {
  config: Required<ModalGlobalConfig>;
  updaters: React.DispatchWithoutAction[];
  modalList: ModalObject[];
  hasInit: boolean;
}

const store: IStore = {
  updaters: [],
  modalList: new Proxy([] as ModalObject[], {
    set(target, p, value) {
      // console.log('type=======', p);
      // console.log("set监听", target, p, value, receiver);

      target[p as keyof typeof target] = value;
      if (p !== 'length') {
        // 执行更新
        updateAll();
      }
      // console.log("target", target)
      return true;
    },
  }),
  modalMap: {},
  config: defaultGlobalModalConfig,
  hasInit: false,
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StoreModalList {
  export function has(modal: ModalObject) {
    return store.modalList.includes(modal);
  }

  export function getModalIndex(modal: ModalObject) {
    if (!has(modal)) return undefined;
    return store.modalList.findIndex((v) => v.id === modal.id);
  }

  export function push(modal: ModalObject) {
    if (store.modalList.includes(modal)) throw new Error('This modal already in modalList.');
    store.modalList.push(modal);
    if (store.config.showSingleModal) {
      // 前面的弹窗切换成暂隐
      const before = getArrayEle(store.modalList, -2);
      if (before && (before.state === ModalState.SHOW || before.state === ModalState.UNHIDING))
        before.state = ModalState.HIDING;
    }
  }

  export function prePop(modal: ModalObject) {
    const modalIndex = store.modalList.findIndex((v) => v.id === modal.id);
    if (store.config.showSingleModal) {
      if (modalIndex === store.modalList.length - 1) {
        // 最后一个弹窗时,切换前一个弹窗状态
        const before = getArrayEle(store.modalList, -2);
        if (before && (before.state === ModalState.HIDDEN || before.state === ModalState.HIDING))
          before.state = ModalState.UNHIDING;
      }
    }
  }

  export function pop(modal: ModalObject) {
    // console.log(store.modalList.map((v) => v.state));
    // store.modalList.splice(modalIndex, 1);
    store.modalList = store.modalList.filter((v) => v.id !== modal.id);
  }
}

export default store;
