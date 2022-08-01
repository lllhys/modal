export interface ModalEvent {
  type: EventType;
  value: any;
  target: any;
}

export type EventCall<T = ModalEvent> = (event: T) => void;

export interface EventClass {
  // events: { [key: string]: EventCall[] };
  addEventListener: (name: string, call: EventCall) => void;
  removeEventListener: (name: string, call: EventCall) => void;
  removeAllEventListeners: () => void;
}

export enum EventType {
  ON_STATE_CHANGE = 'onStateChange',
  ON_OPEN_START = 'onOpenStart',
  ON_OPEN_END = 'onOpenEnd',
  ON_OPEN_ANIMATION_START = 'onOpenAnimationStart',
  ON_OPEN_ANIMATION_END = 'onOpenAnimationEnd',
  ON_CLOSE_START = 'onCloseStart',
  ON_CLOSE_END = 'onCloseEnd',
  ON_CLOSE_ANIMATION_START = 'onCloseAnimationStart',
  ON_CLOSE_ANIMATION_END = 'onCloseAnimationEnd',
}
