import React, {useReducer} from "react";
import {IModal, IModalMap, IStore} from "./types";


const store: IStore = {
  updaters: [],
  popList: new Proxy([] as IModal[], {
    set(target, p, value, receiver) {
      console.log("set监听", target, p, value, receiver);

      target[p as keyof typeof target] = value;
      if (p !== "length") {
        // 执行更新
        updateAll();
      }

      console.log("target", target)
      return true
    }
  }),
  modalMap: {}
}

export function updateAll() {
  store.updaters.map(v => v())
}

export function update() {

}

export default store;


