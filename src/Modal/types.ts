import React from 'react';
import {ModalObject} from "./class/ModalObject";

export interface IModalContainerProps {
  modalMap?: IModalMap;
  config?: IModalConfig;
}

export interface IModalMap {
  [modalName: string]: ReactComponent;
}

export interface IModalConfig {
  showSingle?: boolean;
  zIndex?: number;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  multiMask?: boolean;
  destroyOnInvisible?: boolean;
}


export enum EventType {
  ON_STATE_CHANGE= 'onStateChange',
  ON_OPEN_START = "onOpenStart",
  ON_OPEN_END = 'onOpenEnd',
  ON_OPEN_ANIMATION_START = 'onOpenAnimationStart',
  ON_OPEN_ANIMATION_END = 'onOpenAnimationEnd',
  ON_CLOSE_START = 'onCloseStart',
  ON_CLOSE_END = 'onCloseEnd',
  ON_CLOSE_ANIMATION_START = 'onCloseAnimationStart',
  ON_CLOSE_ANIMATION_END = 'onCloseAnimationEnd'
}

export interface IEvent {
  type: EventType;
  value: any;
  target: any;
}

export type EventCall = (event: IEvent) => void;

export interface IEventClass {
  // events: { [key: string]: EventCall[] };
  addEventListener: (name: string, call: EventCall) => void;
  removeEventListener: (name: string, call: EventCall) => void;
  removeAllEventListeners: () => void;
}


/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export type ReactComponent = React.FunctionComponentFactory<any> | React.ComponentClass;

export interface IModalClass extends Required<Omit<IOptions, 'immediately'>> {
  open: (options?: ICreateModalOptions) => void;
  close: (options?: ICloseModalOptions) => void;
  state: ModalState; // 声明周期
  // changeState: (state: ModalState) => void;
  options: any | IOptions | undefined; // 211221 临时改为any
  component: ReactComponent;
  id: number;
}

export interface IModalAnimate {
  name: string;
  duration?: number; //ms
  timingFunction?: string; // 不做处理，直接挂在css
}

export type INoneAnimate = 'none';
export const NoneAnimate = 'none';

/**
 * 弹窗配置基类型
 */
export interface IBaseModalOptions {
  props?: Object;
  key?: string;
  immediately?: boolean;
  animate?: IModalAnimate | INoneAnimate;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: React.CSSProperties;
  zIndex?: number;
}

/**
 * 新建弹窗配置
 */
export type ICreateModalOptions = IBaseModalOptions;
/**
 * 关闭弹窗配置
 */
export type ICloseModalOptions = Pick<IBaseModalOptions, 'immediately' | 'animate' | 'key'>;

export type IOptions = IBaseModalOptions;

export type IOptionsExceptKey = Omit<IOptions, 'key'>;

export type popProp = string | ReactComponent;

/**
 * 组件生命周期
 */
export enum ModalState {
  INIT = 'init', // 组件被实例化，但是未被监听
  CREATED = 'created', // 组件初始化完成，已经被监听
  OPENING = 'opening', // 组件进入视窗，开始播放出现动画
  SHOW = 'show', // 组件进入视窗，驻留
  // HIDING = 'hiding',              // 隐藏中
  // HIDDEN = 'hidden',              // 多弹窗情形下，配置为单一显示时非最上层组件状态
  CLOSING = 'closing', // 组件进入视窗，开始播放关闭动画
  CLOSED = 'closed', // 组件移除视窗，但是仍被监听
  DESTROYED = 'destroyed', // 组件被移除监听
}

/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export interface IStore extends Required<IModalContainerProps> {
  updaters: React.DispatchWithoutAction[];
  popList: ModalObject[];
}
