import {EventCall, IEvent, IEventClass, EventType} from '../types';
import {firstToUpper} from "../../utils";

export enum FunctionEventTypes {
  BEFORE = 'before',
  AFTER = 'after',
}

interface IEventListeners {
  [name: string]: EventCall[];
}

/**
 * get event from target object.
 * @param events
 * @param name
 * @param call
 */
const getEventListener = (
  events: IEventListeners,
  name: string,
  call: EventCall,
): undefined | EventCall => {
  if (!events[name]) return undefined;
  const _r = events[name]?.filter((v) => v === call);
  return _r.length ? _r[0] : undefined;
};


class Event implements IEvent {

  type;
  target;

  constructor(type: EventType, target: any) {
    this.type = type;
    this.target = target
  }

}

/**
 * 事件装饰器
 * @param Target
 */
export function UseEvent<T extends { new(...args: any[]): {} }>(Target: T) {
  return class extends Target implements IEventClass {
    events: { [key: string]: EventCall[] } = {};

    constructor(...args: any[]) {
      super(...args);
    }

    addEventListener(name: string, call: EventCall) {
      if (!this.events) this.events = {};
      if (!getEventListener(this.events, name, call)) {
        const l = this.events[name] || [];
        l.push(call);
        this.events[name] = l;
      }
    }

    removeEventListener(name: string, call: EventCall) {
      if (!this.events) this.events = {};
      if (!this.events[name]) return;
      this.events[name] = this.events[name]?.filter((v: EventCall) => v !== call);
    }

    removeAllEventListeners() {
      this.events = {};
    }
  };
}

/**
 * 方法装饰器
 * @param name
 * @param events
 * @constructor
 */
export function FunctionEvent(name: string, events: FunctionEventTypes[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const row = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      if (events.includes(FunctionEventTypes.BEFORE)) {
        // 执行before监听回调
        const beforeName = `on${name}Start`;
        // @ts-ignore
        this.events?.[beforeName] && this.events[beforeName].forEach((v: Function) => v());
      }
      await row.apply(this, args);
      if (events.includes(FunctionEventTypes.AFTER)) {
        // 执行after监听回调
        const afterName = `on${name}End`;
        // @ts-ignore
        this.events?.[afterName] && this.events[afterName].forEach((v: Function) => v());
      }
    };
    return descriptor;
  };
}


/**
 * 属性装饰器
 * @param name
 * @constructor
 */
export function PropertyEvent(name: string) {

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const eventName = `on${firstToUpper(name)}Change`
    const set = descriptor.set;
    // set 方法覆盖
    descriptor.set = function (newVal: any) {
      // console.log(newVal);
      // @ts-ignore
      this.events?.[eventName] && this.events[eventName].forEach((v: Function) => v());
      set && set.apply(this, [newVal]);
    }
    return descriptor;
  }


}

