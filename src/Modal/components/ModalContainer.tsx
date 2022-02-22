import React, { useEffect, useState } from 'react';
import { makeObserver } from '../store/store';
import {
  defaultGlobalModalConfig,
  defaultHideAnimation,
  invisibleStates,
  modalAnimationStage,
} from '../constants';
import type { ModalObject } from '../modal/ModalObject';
import './index.css';
import 'animate.css';
import store from '../store';
import { NoneAnimation } from '../modal/ModalOption';
import { AnimationStage, ModalContainerProps, ModalGlobalConfig, ModalState } from '../modal/types';
// import "../../assets/keyframe.css"

/**
 * 弹窗关闭过程中阻止点击事件捕获
 * @param e
 * @param modal
 */
const handleModalClick = (e: React.MouseEvent, modal: ModalObject) => {
  if (
    modal.state === ModalState.OPENING ||
    modal.state === ModalState.CLOSING ||
    modal.state === ModalState.CLOSED
  ) {
    e.stopPropagation();
    return;
  }

  // @ts-ignore
  if (e.target.id !== `ModalBody_${modal.id}`) return;
  if (modal.options.maskClosable) {
    modal.close();
  }
};

// /**
//  * 弹窗蒙层点击事件
//  * @param e
//  * @param modal
//  */
// const handleMaskClick = (e: React.MouseEvent, modal: ModalObject) => {
//
// };

const generateBodyClickHandlers = (modal: ModalObject) => {
  const clickHandler = (e: React.MouseEvent) => handleModalClick(e, modal);
  return {
    onClickCapture: clickHandler,
    onMouseDownCapture: clickHandler,
    onMouseUpCapture: clickHandler,
    onClick: clickHandler,
    onMouseUp: clickHandler,
    onMouseDown: clickHandler,
  };
};

const initConfigProp = (config: ModalGlobalConfig | undefined) => {
  store.config = { ...defaultGlobalModalConfig, ...config };
};

// const inAnimating = (modal: ModalObject) => {
//   return animatingStates.includes(modal.state);
// };

const getModalAnimationStage = (modal: ModalObject) => {
  return modalAnimationStage[modal.state];
};

/**
 * animate end 处理， 切换对象生命状态
 */
const handleAnimationEnd = (e: React.AnimationEvent, modal: ModalObject) => {
  // @ts-ignore
  if (e.target.id !== `ModalBody_${modal.id}`) return;
  // if (e.eventPhase !== 2) return;
  // change state.
  if (modal.state === ModalState.OPENING || modal.state === ModalState.UNHIDING)
    modal.state = ModalState.SHOW;
  if (modal.state === ModalState.HIDING) modal.state = ModalState.HIDDEN;
  if (modal.state === ModalState.CLOSING) modal.state = ModalState.CLOSED;
};

const generateAnimation = (modal: ModalObject, type: 'body' | 'mask') => {
  if (
    modal.state === ModalState.SHOW ||
    modal.state === ModalState.HIDDEN ||
    modal.options.immediately
  )
    return '';
  if (modal.state === ModalState.UNHIDING)
    return defaultHideAnimation.getAnimationStyle(AnimationStage.IN);
  if (modal.state === ModalState.HIDING)
    return defaultHideAnimation.getAnimationStyle(AnimationStage.OUT);
  // attr key
  const key: 'maskAnimation' | 'bodyAnimation' = `${type}Animation`;
  const animation = modal.options[key];

  const stage = getModalAnimationStage(modal) ?? AnimationStage.IN;

  if (animation === NoneAnimation) return '';
  else return animation.getAnimationStyle(stage);
};

const generateBodyProps = (modal: ModalObject) => {
  return {
    className: `modal-body`,
    style: { animation: generateAnimation(modal, 'body') },
    onAnimationEnd: (e: React.AnimationEvent) => handleAnimationEnd(e, modal),
    ...generateBodyClickHandlers(modal),
  };
};

const getShowPopList = () => {
  return store.modalList.filter((v) => !invisibleStates.includes(v.state));
};
//
// const generateMaskProps = (modal: ModalObject, stage?: AnimationStage) => {
//   return {
//     className: `modal-mask`,
//     style: {
//       ...modal.option.maskStyle,
//       animation: generateAnimation(modal, 'mask', stage),
//     },
//   };
// };

/**
 * ModalContainer 组件
 * @param props
 * @constructor
 */
const ModalContainer: React.FC<ModalContainerProps> = (props) => {
  // const { modalList } = store;

  const [zIndex, setZIndex] = useState(defaultGlobalModalConfig.zIndex);

  const showPopList = getShowPopList();

  useEffect(() => {
    if (showPopList.length) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  });

  useEffect(() => {
    store.hasInit = true;
  }, []);

  useEffect(() => {
    if (!props.modalMap) return;
    // 更新store的modalMap
    store.modalMap = props.modalMap;
  }, [props.modalMap]);

  useEffect(() => {
    initConfigProp(props.config);
    setZIndex(store.config.zIndex);
  }, [props.config]);

  const renderModal = (modal: ModalObject, index: number) => {
    const modalOptions = modal.options;
    const BodyCom = modal.bodyComponent;
    const MaskCom = modalOptions.maskComponent;

    const _config = store.config;

    // destroy 时直接销毁
    if (_config.destroyOnInvisible && modal.state === ModalState.HIDDEN) return;
    const sectionDisplay =
      !_config.destroyOnInvisible && modal.state === ModalState.HIDDEN ? 'none' : '';

    const maskDisplay = !_config.showSingleMask || index === 0 ? '' : 'none';

    return (
      <section
        key={modal.id}
        id={`Modal_${modal.id}`}
        className="modal-container"
        style={{ zIndex: modalOptions.zIndex, display: sectionDisplay }}
      >
        {/*
            mask
         */}
        <div
          id={`ModalMask_${modal.id}`}
          className="modal-mask"
          style={{
            ...modal.options.maskStyle,
            animation: generateAnimation(modal, 'mask'),
            display: maskDisplay,
          }}
        >
          <MaskCom {...modal.props} />
        </div>

        {/*
            body
         */}
        <div id={`ModalBody_${modal.id}`} {...generateBodyProps(modal)}>
          <BodyCom {...modal.props} />
        </div>
      </section>
    );
  };

  const renderAllModals = () => {
    return showPopList.map((modal, index) => {
      return renderModal(modal, index);
    });
  };

  return <section style={{ zIndex }}>{renderAllModals()}</section>;
};

export type ModalProps<T = any> = { _modal: ModalObject } & T;

export default makeObserver<ModalContainerProps>(ModalContainer);
