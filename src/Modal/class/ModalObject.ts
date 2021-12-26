import {FunctionEvent, FunctionEventTypes, PropertyEvent, UseEvent} from './Event';
import store, {updateAll} from '../../store';
import {
  ICloseModalOptions,
  ICreateModalOptions,
  IModalAnimate,
  IModalClass,
  INoneAnimate,
  IOptions,
  IOptionsExceptKey,
  ModalState,
  NoneAnimate,
  ReactComponent,
} from '../types';
import {defaultAnimate, defaultAnimateName, defaultCreateOptions} from '../constants';

let globalId = 0;

@UseEvent
export class ModalObject implements IModalClass {
  component;
  options: any;
  props: any = { _modal: this };
  id;
  key = '`1234567^$%^&%*89hhjkjh'; // 乱写的default key，应该不会有b能取到这个key吧
  animate: IModalAnimate | INoneAnimate = defaultAnimate;
  private animateName = defaultAnimateName; // 动画名备份
  mask = true;
  maskClosable = false;
  maskStyle = {};
  zIndex = 1000;
  private asyncCallback: { [key: string]: Function } = {};

  private _state: ModalState = ModalState.INIT;

  get state() {
    return this._state;
  }

  @PropertyEvent("state")
  set state(state: ModalState) {
    this._state = state;
    if (this.asyncCallback[state]) {
      this.asyncCallback[state]();
      // clear
      delete this.asyncCallback[state];
    }

    if (state === ModalState.CLOSED) {
      // 移除目标
      store.popList = store.popList.filter((v) => v !== this);
    }
    updateAll();
  }

  constructor(com: ReactComponent, options: IOptions) {
    this.component = com;
    this.id = globalId++;
    // key 不允许二次副职
    options?.key && (this.key = options.key);
    // 融合全局配置与默认配置
    this.setOptions({
      ...defaultCreateOptions,
      ...store.config,
      ...options,
    });
    this.state = ModalState.CREATED;
  }

  setOptions(options: IOptionsExceptKey) {
    this.options = options;
    const singleAndNotMulti = store.config.showSingle && !store.config.multiMask;
    // console.log("singleAndNotMulti", singleAndNotMulti)
    // props 处理
    options.props && (this.props = { ...this.props, ...options.props });
    // mask 处理
    options.mask !== undefined && (this.mask = singleAndNotMulti ? false : options.mask);
    // mask closable
    options.maskClosable !== undefined && (this.maskClosable = options.maskClosable);
    // style
    options.maskStyle && (this.maskStyle = options.maskStyle);
    // z index
    options.zIndex !== undefined && (this.zIndex = options.zIndex);
    // 动画处理
    if (options.animate) {
      if (options.animate === NoneAnimate) this.animate = this.animateName = NoneAnimate;
      else {
        this.animate = { ...defaultAnimate, ...options.animate };
        this.animateName = options.animate.name;
      }
    }
  }

  @FunctionEvent('Open', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async open(options?: ICreateModalOptions) {
    options && this.setOptions(options);
    if (this.state !== ModalState.CREATED) {
      console.warn(
        'This modal is already visible, calling the open method again will not take effect.',
        this,
      );
      return;
    }
    if (!store.popList.includes(this)) {
      // 监听组件
      store.popList.push(this);
    }
    // this.state = ModalState.OPENING;
    if (this.animate === NoneAnimate) {
      // this.changeState(ModalState.SHOW);
      this.state = ModalState.SHOW;
    } else {
      await this.showOpenAnimation();
    }
  }

  @FunctionEvent('Close', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async close(options?: ICloseModalOptions) {
    options && this.setOptions(options);
    if (this.animate === NoneAnimate) {
      // this.changeState(ModalState.CLOSED);
      this.state = ModalState.CLOSED;
    } else {
      await this.showCloseAnimation();
    }
  }

  @FunctionEvent('OpenAnimation', [FunctionEventTypes.AFTER, FunctionEventTypes.BEFORE])
  private async showOpenAnimation(ani?: IModalAnimate | INoneAnimate) {
    // 异步
    await new Promise((resolve) => {
      if (ani) this.animate = ani;
      // store.popList.push(this);
      this.replaceWildcardAnimation('In');
      this.asyncCallback[ModalState.SHOW] = resolve;
      // this.changeState(ModalState.OPENING);
      this.state = ModalState.OPENING;
      // 避免animate失效，做容错
      setTimeout(() => {
        if (this.state === ModalState.OPENING) {
          console.error('You may be using the wrong animation name or your device may not be compatible with this library, please check.')
          this.state = ModalState.SHOW;
        }
      }, (this.animate === NoneAnimate? 0 : this.animate.duration!)+ 50)
    });
  }

  @FunctionEvent('CloseAnimation', [FunctionEventTypes.AFTER, FunctionEventTypes.BEFORE])
  private async showCloseAnimation(ani?: IModalAnimate | INoneAnimate) {
    // 异步
    await new Promise((resolve) => {

      if (ani) this.animate = ani;
      this.replaceWildcardAnimation('Out');
      this.asyncCallback[ModalState.CLOSED] = resolve;
      // this.changeState(ModalState.CLOSING);
      this.state = ModalState.CLOSING;

      // 避免animate失效，做容错
      setTimeout(() => {
        if (this.state === ModalState.CLOSING) {
          console.error('You may be using the wrong animation name or your device may not be compatible with this library, please check.')
          this.state = ModalState.CLOSED;
        }
      }, (this.animate === NoneAnimate? 0 : this.animate.duration!)+ 50)
    });
  }

  modifyProps(newProps: any) {
    this.props = { ...this.props, ...newProps };
    // 更新一下
    updateAll();
  }

  // changeState(state: ModalState) {
  //   this.state = state;
  //   if (this.asyncCallback[state]) {
  //     this.asyncCallback[state]();
  //     // clear
  //     delete this.asyncCallback[state];
  //   }
  //
  //   if (state === ModalState.CLOSED) {
  //     // 移除目标
  //     store.popList = store.popList.filter((v) => v !== this);
  //   }
  //   updateAll();
  // }

  replaceWildcardAnimation(stage: 'In' | 'Out') {
    if (this.animate === NoneAnimate) return;
    let name = this.animateName;
    const wildcardReg = /^(.*){(.+)\|(.+)}(.*)$/;
    if (/{.*}/.test(name)){
      const regResult = wildcardReg.exec(name);
      console.log(regResult);
      if (regResult){
        // 处理名称中的{}替换值
        name = regResult[1] + regResult[stage === 'In'? 2: 3] + regResult[4];
      }else {
        throw Error('you use error wildcard animation name, please check again');
      }
    }
    if (name.indexOf('*') !== -1) this.animate.name = name.replace('*', stage);
    if (
      this.options.animate &&
      this.options.animate !== NoneAnimate &&
      !this.options.animate.timingFunction
    ) {
      this.options.animate.timingFunction = 'ease-' + stage.toLowerCase();
    }
  }
}
