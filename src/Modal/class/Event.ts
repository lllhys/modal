import type { EventCall, IEvent, IEventClass, EventType } from '../types';
import { firstToUpper } from '../../utils';

export enum FunctionEventTypes {
  BEFORE = 'before',
  AFTER = 'after',
}

type IEventListeners = Record<string, EventCall[]>;

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
  value;

  constructor(type: EventType, target: any, value?: any) {
    this.type = type;
    this.target = target;
    this.value = value;
  }
}

/**
 * 事件装饰器
 * @param Target
 */
export function UseEvent<T extends { new (...args: any[]): any }>(Target: T) {
  return class extends Target implements IEventClass {
    events: Record<string, EventCall[]> = {};

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
        const e = new Event(beforeName as EventType, this);
        // @ts-ignore
        this.events?.[beforeName] && this.events[beforeName].forEach((v: EventCall) => v(e));
      }
      const result = await row.apply(this, args);
      if (events.includes(FunctionEventTypes.AFTER)) {
        // 执行after监听回调
        const afterName = `on${name}End`;
        const e = new Event(afterName as EventType, this);
        // @ts-ignore
        this.events?.[afterName] && this.events[afterName].forEach((v: EventCall) => v(e));
      }
      return result;
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
    const eventName = `on${firstToUpper(name)}Change`;
    const set = descriptor.set;
    // set 方法覆盖
    descriptor.set = function (newVal: any) {
      // console.log(newVal);
      const e = new Event(eventName as EventType, this, newVal);
      // @ts-ignore
      this.events?.[eventName] && this.events[eventName].forEach((v: EventCall) => v(e));
      set && set.apply(this, [newVal]);
    };
    return descriptor;
  };
}
