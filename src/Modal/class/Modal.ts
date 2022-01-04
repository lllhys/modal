import {
  IBaseModalOptions,
  ICloseModalOptions,
  ICreateModalOptions,
  ModalState,
  NoneAnimate,
  popProp,
  ReactComponent,
} from '../types';
import { ModalObject } from './ModalObject';
import store from '../../store';
import './AugmentationModalObject';
import { getArrayEle } from '../../utils';
import { visibleStates } from '../index';

namespace Modal {
  export const getModalInstanceByName = (name: string): ModalObject | undefined => {
    if (!store.modalMap[name]) {
      throw new Error(
        'Unable to find the corresponding popover component. You must make sure ModalMap is registered in ModalContainer when using the name pop.',
      );
    }
    return getModalInstanceByPop(store.modalMap[name]);
  };
  export const getModalInstanceByPop = (pop: ReactComponent): ModalObject | undefined => {
    let modal = getArrayEle(store.popList, -1);
    store.popList.forEach((v) => {
      v.component === pop && (modal = v);
    });
    return modal;
  };
  export const getModalInstanceByKey = (key: string): ModalObject | undefined => {
    let modal;
    store.popList.forEach((v) => {
      v.key === key && (modal = v);
    });
    return modal;
  };

  export const getLastVisibleModal = (): ModalObject | undefined => {
    let result;
    store.popList.forEach((v) => visibleStates.includes(v.state) && (result = v));
    return result;
  };

  /**
   *
   * @param pop
   * @param options
   */
  const getModalInstance = (pop?: popProp, options?: { key?: string }): ModalObject | undefined => {
    if (!pop) return getLastVisibleModal();
    if (options?.key) return getModalInstanceByKey(options.key);
    if (typeof pop === 'string') return getModalInstanceByName(pop);
    else return getModalInstanceByPop(pop);
  };

  export function createModal(pop: popProp, options?: ICreateModalOptions): ModalObject {
    // 融合默认参数
    // const _options = {...defaultCreateOptions, ...options};
    const _options = { ...options };
    let com: ReactComponent;
    if (typeof pop === 'string') {
      if (!store.modalMap[pop]) {
        throw new Error(
          'Unable to find the corresponding popover component. You must make sure ModalMap is registered in ModalContainer when using the name pop.',
        );
      }
      com = store.modalMap[pop];
    } else com = pop;
    return new ModalObject(com, _options);
  }

  export function pushModal(pop: popProp, options?: ICreateModalOptions): ModalObject {
    const _options = { ...options };

    const modal = Modal.createModal(pop, options);
    // 立即打开
    if (_options.immediately !== false) modal.open();
    return modal;
  }

  /**
   * close target modal function. if you set pop param to undefined will close the top modal.
   * @param pop
   * @param options
   */
  export function closeModal(pop?: popProp, options?: ICloseModalOptions): ModalObject {
    // 融合默认参数
    const _options = { ...options };

    const modal = getModalInstance(pop, options);

    if (!modal) {
      throw Error('Cannot find target modal instance, please check your params');
    }
    // 立即关闭
    if (_options.immediately !== false) modal.close(_options);
    return modal;
  }

  /**
   * close all modals
   * @param options if you want to close all modals immediately you can set immediately to true.
   */
  export function closeAllModals(options?: Pick<IBaseModalOptions, 'immediately'>): void {
    // set the last one have animation and the others close immediately.
    const immediately = !!options?.immediately;
    const _popList = store.popList,
      len = _popList.length;
    for (let i = 0; i < len; i++) {
      if (i === len - 1 && !immediately) _popList[i].close();
      else _popList[i].state = ModalState.CLOSED;
    }
  }
}

export default Modal;
