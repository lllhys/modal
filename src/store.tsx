import { IStore } from './Modal/types';
import React, { useReducer } from 'react';
import {ModalObject} from "./Modal/class/ModalObject";

const store: IStore = {
  updaters: [],
  popList: new Proxy([] as ModalObject[], {
    set(target, p, value, receiver) {
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
  config: {},
};

export function updateAll() {
  store.updaters.map((v) => v());
}

export function update() {}

const useUpdate = () => {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  if (!store.updaters.includes(forceUpdate)) {
    // 注册进入store
    store.updaters.push(forceUpdate);
  }
  return []
};

// decorator
export function makeObserver<T = any>(Com: React.FC<T>) {
  const _new: React.FC<T> = (props) => {
    useUpdate();

    return <Com {...props} />;
  };

  return React.memo(_new);
}
export default store;
