import React, {useReducer} from "react";
import store from "./store";




const useUpdate = () => {
  const [, forceUpdate] = useReducer(s => s + 1, 0);
  // 注册进入store
  store.updaters.push(forceUpdate);
}



// decorator
export function makeObserver<T = any>(Com: React.FC<T>) {

  const _new: React.FC<T> = (props) => {
    useUpdate();

    return (
      <Com {...props} />
    )
  }

  return React.memo(_new)

}
