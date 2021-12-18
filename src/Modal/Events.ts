import {EventCall, IEventClass, IEventFunc, IModal} from "../_util/types";
import ModalObject from "./ModalObject";

export enum Events {
  BEFORE = "before",
  AFTER = "after"
}

interface IEventListeners{
  [name: string]: EventCall[]
}


const getEventListener = (events: IEventListeners, name: string, call: EventCall): undefined | EventCall => {
  if (!events[name]) return undefined
  const _r = events[name]?.filter(v => v === call)
  return _r.length ? _r[0] : undefined
}

export function useEvent<T extends {new (...args: any[]): {}}>(target: T){

  return class extends target implements IEventClass{
    events: {[key: string]: EventCall[]} = {}
    constructor(...args: any[]) {
      super(...args);
    }

    addEventListener (name: string, call: EventCall) {
      if (!this.events) this.events = {}
      if (!getEventListener(this.events, name, call)) {
        const l = this.events[name] || []
        l.push(call);
        this.events[name] = l;
      }
    }

    removeEventListener (name: string, call: EventCall) {
      if (!this.events) this.events = {}
      if (!this.events[name]) return;
      this.events[name] = this.events[name]?.filter((v: EventCall) => v !== call);
    }


    removeAllEventListeners () {
      this.events = {}
    }
  }


  // target.prototype.addEventListener = function (name: string, call: EventCall) {
  //   if (!this.events) this.events = {}
  //   if (!getEventListener(this.events, name, call)) {
  //     const l = this.events[name] || []
  //     l.push(call);
  //     this.events[name] = l;
  //   }
  // }
  //
  // target.prototype.removeEventListener = function (name: string, call: EventCall) {
  //   if (!this.events) this.events = {}
  //   if (!this.events[name]) return;
  //   this.events[name] = this.events[name]?.filter((v: EventCall) => v !== call);
  // }
  //
  // target.prototype.removeAllEventListeners = function () {
  //   this.events = {}
  // }
  // return target;
}


export function event(events: Events[]){

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const row = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      if (events.includes(Events.BEFORE)) {
        // getEventListener()
        // 执行before监听回调
      }
      await row.apply(this, args);
      if (events.includes(Events.AFTER)) {
        // 执行before监听回调
      }
    }
    return descriptor

  }
}


// export default function events(target: any) {
//
//
//   function _n() {
//     let events: {
//       [name: string]: EventCall[]
//     } = {};
//
//     function getEventListener(name: string, call: EventCall): undefined | EventCall {
//       if (!events[name]) return undefined
//       const _r = events[name]?.filter(v => v === call)
//       return _r.length ? _r[0] : undefined
//     }
//
//
//     class _new extends ModalObject implements IEventFunc {
//       addEventListener(name: string, call: EventCall): void {
//       }
//
//       removeAllEventListeners(): void {
//       }
//
//       removeEventListener(name: string, call: EventCall): void {
//       }
//
//     }

    // let _c: any = {
    //   addEventListener: function (name: string, call: EventCall) {
    //     if (!getEventListener(name, call)) {
    //       const l = events[name] || []
    //       l.push(call);
    //       events[name] = l;
    //     }
    //   },
    //   removeEventListener: function (name: string, call: EventCall) {
    //     if (!events[name]) return;
    //     events[name] = events[name]?.filter(v => v !== call);
    //   },
    //   removeAllEventListeners: function () {
    //     events = {}
    //   },
    // }
//
//     const targetProtoFuncName = Object.getOwnPropertyNames(target.prototype);
//
//     for (let name of targetProtoFuncName) {
//       if (name === 'constructor') continue;
//
//       // 非constructor 注册
//
//       _c[name] = function (...params: any[]) {
//
//         // pre event call
//         // call target
//         target.prototype[name](...params);
//
//         // after event call
//       }
//
//     }
//     return _c as IModal
//   }
//
//
//   return _n;
//
//
// }
