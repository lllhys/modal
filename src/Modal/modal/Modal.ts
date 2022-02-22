import { ModalObject } from './ModalObject';
import './AugmentationModalObject';
import { getArrayEle } from '../../utils';
import store from '../store';
import type {
  ModalCreateOptions,
  ModalGlobalConfig,
  ModalMap,
  ModalPopType,
  ModalUpdateOptions,
  ReactComponent,
} from './types';
import { ModalState } from './types';
import { defaultGlobalModalConfig, invisibleStates } from '../constants';
import ReactDOM from 'react-dom';
import ModalContainer from '../components/ModalContainer';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Modal {
  export const getModalInstanceByMap = (modal: ReactComponent): ModalObject | undefined => {
    let lastModal = getArrayEle(store.modalList, -1);
    store.modalList.forEach((v) => {
      v.bodyComponent === modal && (lastModal = v);
    });
    return lastModal;
  };
  export const getModalInstanceByName = (name: string): ModalObject | undefined => {
    if (!store.modalMap[name]) {
      throw new Error(
        'Unable to find the corresponding popover component. You must make sure ModalMap is registered in ModalContainer when using the name pop.',
      );
    }
    return getModalInstanceByMap(store.modalMap[name]);
  };
  export const getModalInstanceByKey = (key: string): ModalObject | undefined => {
    let modal;
    store.modalList.forEach((v) => {
      v.key === key && (modal = v);
    });
    return modal;
  };

  export const getLastVisibleModal = (): ModalObject | undefined => {
    let result;
    store.modalList.forEach((v) => !invisibleStates.includes(v.state) && (result = v));
    return result;
  };

  /**
   *
   * @param pop
   * @param key
   */
  const getModalInstance = (pop?: ModalPopType, key?: string): ModalObject | undefined => {
    if (!pop) return getLastVisibleModal();
    if (key) return getModalInstanceByKey(key);
    if (typeof pop === 'string') return getModalInstanceByName(pop);
    else return getModalInstanceByMap(pop);
  };

  export function createModal(pop: ModalPopType, options?: ModalCreateOptions): ModalObject {
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

  export function openModal(pop: ModalPopType, options?: ModalCreateOptions): ModalObject {
    const _options = { ...options };

    const modal = Modal.createModal(pop, options);
    // 立即打开
    if (_options.immediately !== false) modal.open();
    return modal;
  }

  /**
   * close target modal function. if you set pop param to undefined will close the top modal.
   * @param pop
   * @param key
   * @param options
   */
  export function closeModal(
    pop?: ModalPopType,
    options?: ModalUpdateOptions & { key?: string },
  ): ModalObject {
    // 融合默认参数
    const _options = { ...options };

    const modal = getModalInstance(pop, options?.key);

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
  export function closeAllModals(options?: Pick<ModalUpdateOptions, 'immediately'>): void {
    // set the last one have animation and the others close immediately.
    const immediately = !!options?.immediately;
    const _modalList = store.modalList,
      len = _modalList.length;
    for (let i = 0; i < len; i++) {
      if (i === len - 1 && !immediately) _modalList[i].close();
      else _modalList[i].state = ModalState.CLOSED;
    }
  }

  export function setGlobalConfig(config: ModalGlobalConfig) {
    store.config = { ...defaultGlobalModalConfig, ...config };
  }

  export function setGlobalModalMap(map: ModalMap) {
    store.modalMap = map;
  }

  export function init(config?: ModalGlobalConfig, map?: ModalMap) {
    if (store.hasInit) throw new Error('Global container already exists, no need to init again');
    // 全局挂载
    const target = document.body.appendChild(document.createElement('div'));
    ReactDOM.render(
      React.createElement(ModalContainer, { modalMap: map, config: config }, null),
      target,
    );
  }
}

export default Modal;
