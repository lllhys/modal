import React, { useEffect, useRef } from 'react';
import {
  defaultGlobalModalConfig,
  defaultHideAnimation,
  invisibleStates,
  modalAnimationStage,
} from '../../constants';
import type { ModalObject } from '../ModalObject';
import { NoneAnimation } from '../ModalOption';
import type { ModalContainerProps } from '../types';
import { AnimationStage, ModalState } from '../types';
import store, { makeObserver } from '../../store';

import './index.css';
import 'animate.css';

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

/**
 * 弹窗点击handler
 * @param modal
 */
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
  if (modal.state === ModalState.OPENING) modal.state = ModalState.SHOW;
  if (modal.state === ModalState.CLOSING) modal.state = ModalState.CLOSED;
};

/**
 * 处理显示隐藏结束后状态切换
 * @param e
 * @param modal
 */
const handleTransitionEnd = (e: React.TransitionEvent, modal: ModalObject) => {
  // @ts-ignore
  if (e.target.id !== `Modal_${modal.id}`) return;
  if (modal.state === ModalState.HIDING) modal.state = ModalState.HIDDEN;
  else if (modal.state === ModalState.UNHIDING) modal.state = ModalState.SHOW;
};

/**
 * 动画
 * @param modal
 * @param type
 */
const generateAnimation = (modal: ModalObject, type: 'body' | 'mask') => {
  if (
    modal.options.immediately ||
    modal.state === ModalState.SHOW ||
    modal.state === ModalState.HIDDEN ||
    modal.state === ModalState.UNHIDING ||
    modal.state === ModalState.HIDING
  )
    return '';
  // attr key
  const key: 'maskAnimation' | 'bodyAnimation' = `${type}Animation`;
  const animation = modal.options[key];

  const stage = getModalAnimationStage(modal) ?? AnimationStage.IN;

  if (animation === NoneAnimation) return '';
  else return animation.getAnimationStyle(stage);
};

/**
 * 生成隐藏渐变动画
 * @param modal
 */
const generateTransition = (modal: ModalObject) => {
  if (modal.state === ModalState.UNHIDING)
    return { opacity: 1, transition: defaultHideAnimation.getAnimationStyle() };
  if (modal.state === ModalState.HIDING)
    return { opacity: 0, transition: defaultHideAnimation.getAnimationStyle() };
};

/**
 * 获取可显示列表
 */
const getShowPopList = () => {
  return store.modalList.filter((v) => !invisibleStates.includes(v.state));
};

/**
 * ModalContainer 组件
 * @param props
 * @constructor
 */
const ModalContainer: React.FC<ModalContainerProps> = (props) => {
  // const { modalList } = store;

  const showPopList = getShowPopList();

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    if (showPopList.length) {
      html.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      html.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }
  });

  useEffect(() => {
    store.hasInit++;
    if (store.hasInit > 1)
      throw new Error('You have mounted multiple global containers, please check.');
    return () => {
      store.hasInit--;
    };
  }, []);

  useEffect(() => {
    if (!props.modalMap) return;
    // 更新store的modalMap
    store.modalMap = props.modalMap;
  }, [props.modalMap]);

  useEffect(() => {
    if (!props.config) return;
    store.config = { ...defaultGlobalModalConfig, ...props.config };
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

    // console.log(modal.id, modal.state);

    return (
      <section
        key={modal.id}
        id={`Modal_${modal.id}`}
        className="modal-container"
        style={{
          zIndex: modalOptions.zIndex,
          display: sectionDisplay,
          ...generateTransition(modal),
        }}
        onTransitionEnd={(e) => handleTransitionEnd(e, modal)}
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
        <div
          id={`ModalBody_${modal.id}`}
          className="modal-body"
          style={{
            animation: generateAnimation(modal, 'body'),
          }}
          {
            ...generateBodyClickHandlers(modal)
          }
          onAnimationEnd={(e) => handleAnimationEnd(e, modal)}
        >
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

  return <section style={{ zIndex: store.config.zIndex }}>{renderAllModals()}</section>;
};

export type ModalProps<T = any> = { _modal: ModalObject } & T;

export default makeObserver<ModalContainerProps>(ModalContainer);
