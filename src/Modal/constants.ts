import {
  IBaseModalOptions,
  ICloseModalOptions,
  ICreateModalOptions,
  IModalAnimate,
  IModalConfig,
} from './types';

export const defaultAnimateName = 'zoom{}';

export const defaultAnimate: IModalAnimate = {
  duration: 300,
  name: defaultAnimateName,
  timingFunction: '',
};

export const defaultCreateOptions: ICreateModalOptions = {
  immediately: true,
  animate: defaultAnimate,
  mask: true,
  maskClosable: false,
  maskStyle: {},
  props: undefined,
  zIndex: 1000,
};

export const defaultCloseOptions: ICloseModalOptions = {
  immediately: true,
  animate: defaultAnimate,
};

export const defaultModalConfig: IModalConfig = {
  showSingle: false,
  zIndex: 3000,
  mask: true,
  maskStyle: {
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  multiMask: false,
  destroyOnInvisible: false,
};
