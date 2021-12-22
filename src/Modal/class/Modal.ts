import {
  ICloseModalOptions,
  ICreateModalOptions,
  IModalClass,
  popProp,
  ReactComponent,
} from '../types';
import { ModalObject } from './ModalObject';
import store from '../../store';
import './AugmentationModalObject';

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
    let modal;
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

  const getModalInstance = (pop: popProp, options?: { key?: string }): ModalObject | undefined => {
    if (options?.key) return getModalInstanceByKey('key');
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

  export function closeModal(pop: popProp, options?: ICloseModalOptions): ModalObject {
    // 融合默认参数
    const _options = { ...options };

    const modal = getModalInstance(pop, options);

    if (!modal) {
      throw Error('Cannot find target modal instance, please check your params');
    }
    // 立即关闭
    if (_options.immediately !== false) modal.close();
    return modal;
  }
}

export default Modal;
