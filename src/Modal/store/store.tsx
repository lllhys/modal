import React, { useReducer } from 'react';
import store from './index';

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

    return <Com {...props} />;
  };

  return React.memo(_new);
}
