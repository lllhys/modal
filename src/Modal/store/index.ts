import React, { useReducer } from 'react';
import type { ModalObject } from '../modal/ModalObject';
import type { ModalContainerProps } from '../modal/types';
import { ModalGlobalConfig, ModalState } from '../modal/types';
import { getArrayEle } from '../../utils';
import { defaultGlobalModalConfig } from '../constants';

export interface IStore extends Required<ModalContainerProps> {
  config: Required<ModalGlobalConfig>;
  updaters: React.DispatchWithoutAction[];
  modalList: ModalObject[];
  hasInit: number;
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
  hasInit: 0,
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
      if (before) {
        if (before.state === ModalState.SHOW || before.state === ModalState.UNHIDING)
          before.state = ModalState.HIDING;
        else if (before.state === ModalState.OPENING) before.state = ModalState.HIDING;
      }
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

export function updateAll() {
  store.updaters.map((v) => v());
}

const useUpdate = () => {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  if (!store.updaters.includes(forceUpdate)) {
    // 注册进入store
    store.updaters.push(forceUpdate);
  }
  return [];
};

// hoc
export function makeObserver<T = any>(Com: React.FC<T>) {
  const _new: React.FC<T> = (props) => {
    useUpdate();

    return React.createElement(Com, { ...props });
  };

  return React.memo(_new);
}

export default store;
