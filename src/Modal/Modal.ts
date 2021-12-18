import {ICreateModalOptions, IModal, IModalClass, popProp, ReactComponent} from "../_util/types";
import React from "react";
import ModalObject from "./ModalObject"
import store from "../_util/store";


const Modal = {

  createPop() {

  },

  pushPop(pop: popProp, options?: ICreateModalOptions) {

    let com: ReactComponent;
    if (typeof pop === "string") {
      if (!store.modalMap[pop]) {
        throw new Error("Unable to find the corresponding popover component. You must make sure ModalMap is registered in ModalContainer when using the name pop.")
      }
      com = store.modalMap[pop];
    } else com = pop;
    let modalObject = new ModalObject(com, options);
    modalObject.open();

    // @ts-ignore
    return modalObject as IModal

  },

  closePop(pop: popProp, options?: ICreateModalOptions) {

    // store中查找对应的pop
    let modal: IModalClass | undefined;
    // 存在key时通过key查找
    if (options?.key) {
      store.popList.forEach(v => {
        v.key === options.key && (modal = v)
      })
    } else {
      let com = pop;
      if (typeof pop === "string") {
        if (!store.modalMap[pop]) {
          throw new Error("Unable to find the corresponding popover component. You must make sure ModalMap is registered in ModalContainer when using the name pop.")
        }
        com = store.modalMap[pop];
      }
      // console.log('com', com)
      store.popList.forEach(v => {
        v.component === com && (modal = v)
      })
    }
    // console.log(modal)
    modal?.close();
    // modalObject.close();
  }


}


export default Modal
