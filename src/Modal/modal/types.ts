import type React from 'react';

export type ReactComponent = React.FunctionComponentFactory<any> | React.ComponentClass;

export type ModalPopType = ReactComponent | string;

export type ReactElement = JSX.Element;

export interface Animation {
  name?: string;
  duration?: number; //ms
  timingFunction?: string; // 不做处理，直接挂在css
}

export type ModalAnimationType = false | Animation;

// base options
interface BaseOptions {
  zIndex?: number; // z-index
  showMask?: boolean; // open mask
  maskStyle?: React.CSSProperties; // mask style
  maskClosable?: boolean; // mask closable
  immediately?: boolean; // without animation, close modal immediately.
  maskAnimation?: ModalAnimationType;
  maskComponent?: ReactComponent | ReactElement;
  bodyAnimation?: ModalAnimationType;
  props?: Record<any, any>;
  key?: string;
}

interface BaseGlobalOptions {
  showSingleModal?: boolean; // 只显示单一弹窗
  showSingleMask?: boolean; // 只显示单一蒙层
  destroyOnInvisible?: boolean;
}

export type ModalBaseOptions = BaseOptions;

export type ModalCreateOptions = ModalBaseOptions;

// export type ModalCloseOptions = Pick<
//   ModalBaseOptions,
//   'bodyAnimation' | 'maskAnimation' | 'props' | 'immediately'
// >;

export type ModalUpdateOptions = Omit<ModalBaseOptions, 'key'>;

export type ModalGlobalConfig = Omit<BaseOptions, 'props' | 'key'> & BaseGlobalOptions;

export type ModalMap = Record<string, ReactComponent>;

export interface ModalContainerProps {
  modalMap?: ModalMap;
  config?: ModalGlobalConfig;
}

export enum ModalState {
  INIT = 'init', // 组件被实例化，但是未被监听
  CREATED = 'created', // 组件初始化完成，已经被监听
  OPENING = 'opening', // 组件进入视窗，开始播放出现动画
  SHOW = 'show', // 组件进入视窗，驻留
  HIDING = 'hiding', // 隐藏中
  HIDDEN = 'hidden', // 多弹窗情形下，配置为单一显示时非最上层组件状态
  UNHIDING = 'unhiding', // 取消隐藏
  CLOSING = 'closing', // 组件进入视窗，开始播放关闭动画
  CLOSED = 'closed', // 组件移除视窗，但是仍被监听
  DESTROYED = 'destroyed', // 组件被移除监听
}

export enum AnimationStage {
  IN = 'In',
  OUT = 'Out',
}
