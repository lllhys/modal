import React from "react";


export interface IModalProps {
  modalMap?: IModalMap
  config?: IModalConfig
}

export interface IModalMap {
  [modalName: string]: ReactComponent
}

export interface IModalConfig {

}


export type IModal = (IEventFunc & IModalClass)


export interface IEventType {

}

export interface IEvent {
  type: IEventType,
  target: any,
}

export type EventCall = (event: IEvent) => void

export interface IEventFunc {
  addEventListener: (name: string, call: EventCall) => void
  removeEventListener: (name: string, call: EventCall) => void
  removeAllEventListeners: () => void
}

export interface IEventClass {
  events: {[key: string]: EventCall[]}
  addEventListener: (name: string, call: EventCall) => void
  removeEventListener: (name: string, call: EventCall) => void
  removeAllEventListeners: () => void
}

export type Event<T> = IEventClass & T;


/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 */


export type ReactComponent = React.FunctionComponent | React.ComponentClass;
// export type ReactComponent = React.ReactNode

export interface IModalClass {
  constructor: Function
  open: () => void,
  close: () => void
  changeState: (state: ModalState) => void
  options: IOptions | undefined
  component: ReactComponent
  props: any | undefined
  id: number
  key: string
  animate: IModalAnimate | INoneAnimate
  state: ModalState
}


export interface IModalAnimate {
  name: string,
  duration: number, //ms
  timingFunction: string // 不做处理，直接挂在css
}

export type INoneAnimate = "none"
export const NoneAnimate = "none"

interface IBaseModalOptions {
  props?: Object
  key?: string
  immediately?: boolean
  animate?: IModalAnimate | INoneAnimate
  mask?: boolean
  maskClosable: boolean
  maskStyle: boolean
  zIndex: boolean
}

export interface ICreateModalOptions extends IBaseModalOptions {

}

export interface ICloseModalOptions extends IBaseModalOptions {

}

export type IOptions = ICreateModalOptions | ICloseModalOptions | IBaseModalOptions

export type popProp = string | ReactComponent


/**
 * 组件生命周期
 */
export enum ModalState {
  INIT = 'init',                  // 组件被实例化，但是未被监听
  CREATED = "created",            // 组件初始化完成，已经被监听
  // BEFORE_OPEN_ANI = 'before open ani',
  OPENING = 'opening',            // 组件进入视窗，开始播放出现动画
  SHOW = 'show',                  // 组件进入视窗，驻留
  // BEFORE_CLOSE_ANI = 'before close ani',
  CLOSING = 'closing',            // 组件进入视窗，开始播放关闭动画
  CLOSED = 'closed',              // 组件移除视窗，但是仍被监听
  DESTROY = 'destroy'             // 组件被移除监听
}


/**
 * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export interface IStore {
  updaters: React.DispatchWithoutAction[]
  popList: IModalClass[]
  modalMap: IModalMap
}
