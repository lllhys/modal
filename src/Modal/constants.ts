import { AnimationStage, ModalState } from './modal/types';
import React from 'react';
import ModalAnimation, { defaultAnimationConfig } from './modal/ModalAnimation';

export const defaultModalBodyAnimation = new ModalAnimation(defaultAnimationConfig);

export const defaultModalMaskAnimation = new ModalAnimation({
  ...defaultAnimationConfig,
  name: 'fade*',
});

export const defaultCreateOptions = {
  immediately: false,
  maskComponent: React.createElement('div'),
  maskAnimation: defaultModalMaskAnimation,
  bodyAnimation: defaultModalBodyAnimation,
  showMask: true,
  maskClosable: false,
  maskStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  props: undefined,
  zIndex: 1000,
};

export const defaultModalOptions = defaultCreateOptions;

export const defaultGlobalModalConfig = {
  ...defaultCreateOptions,
  zIndex: 100,
  showSingleModal: false,
  showSingleMask: false,
  destroyOnInvisible: false,
};

export const visibleStates = [
  ModalState.SHOW,
  ModalState.CLOSING,
  ModalState.OPENING,
  ModalState.HIDING,
];

export const invisibleStates = [
  ModalState.CREATED,
  ModalState.INIT,
  ModalState.CLOSED,
  ModalState.CLOSED,
];

export const animatingStates = [
  ModalState.OPENING,
  ModalState.CLOSING,
  ModalState.HIDING,
  ModalState.UNHIDING,
];

export const defaultHideAnimation = new ModalAnimation({
  duration: 200,
  name: 'all',
  timingFunction: '',
});

export const modalAnimationStage: Record<string, AnimationStage | undefined> = {
  [ModalState.OPENING]: AnimationStage.IN,
  [ModalState.UNHIDING]: AnimationStage.IN,
  [ModalState.CLOSING]: AnimationStage.OUT,
  [ModalState.HIDING]: AnimationStage.OUT,
};
