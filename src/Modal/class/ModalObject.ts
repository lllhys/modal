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

  private readonly _component;
  private readonly _id;
  private readonly _key: string = '`1234567^$%^&%*89hhjkjh'; // 乱写的default key，应该不会有b能取到这个key吧

  // 可配置的options and props
  private _options: any;
  private _props: any = {_modal: this};

  // configs
  private _animate: IModalAnimate | INoneAnimate = defaultAnimate;
  private animateName = defaultAnimateName; // 动画名备份
  private _mask = true;
  private _maskClosable = false;
  private _maskStyle = {};
  private _zIndex = 1000;
  private asyncCallback: { [key: string]: Function } = {};

  // life-circle
  private _state: ModalState = ModalState.INIT;


  /**
   * ------------------------All getter and setters.----------------------------
   */
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

  get options(): any {
    return this._options;
  }

  get component() {
    return this._component;
  }

  get id() {
    return this._id;
  }

  get animate(): IModalAnimate | INoneAnimate {
    return this._animate;
  }

  get zIndex(): number {
    return this._zIndex;
  }

  get maskStyle(): {} {
    return this._maskStyle;
  }

  get maskClosable(): boolean {
    return this._maskClosable;
  }

  get mask(): boolean {
    return this._mask;
  }

  get props(): any {
    return this._props;
  }

  get key(): string {
    return this._key;
  }

  constructor(com: ReactComponent, options?: IOptions) {
    this._component = com;
    this._id = globalId++;
    // key 不允许二次副职
    options?.key && (this._key = options.key);
    // 融合全局配置与默认配置
    this.setOptions({
      ...defaultCreateOptions,
      ...store.config,
      ...options,
    });
    this.state = ModalState.CREATED;
  }

  setOptions(options: IOptionsExceptKey) {
    this._options = options;
    const singleAndNotMulti = store.config.showSingle && !store.config.multiMask;
    // console.log("singleAndNotMulti", singleAndNotMulti)
    // props 处理
    options.props && (this._props = {...this._props, ...options.props});
    // mask 处理
    options.mask !== undefined && (this._mask = singleAndNotMulti ? false : options.mask);
    // mask closable
    options.maskClosable !== undefined && (this._maskClosable = options.maskClosable);
    // style
    options.maskStyle && (this._maskStyle = options.maskStyle);
    // z index
    options.zIndex !== undefined && (this._zIndex = options.zIndex);
    // 动画处理
    if (options.animate) {
      if (options.animate === NoneAnimate) this._animate = this.animateName = NoneAnimate;
      else {
        this._animate = {...defaultAnimate, ...options.animate};
        this.animateName = options.animate.name;
      }
    }
  }

  @FunctionEvent('Open', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async open(options?: ICreateModalOptions) {
    options && this.setOptions(options);
    if (this.state !== ModalState.CREATED && this.state !== ModalState.CLOSED) {
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
    if (this._animate === NoneAnimate) {
      // this.changeState(ModalState.SHOW);
      this.state = ModalState.SHOW;
    } else {
      await this.showOpenAnimation();
    }
  }

  @FunctionEvent('Close', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async close(options?: ICloseModalOptions) {
    options && this.setOptions(options);
    if (this._animate === NoneAnimate) {
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
      if (ani) this._animate = ani;
      // store.popList.push(this);
      this.replaceWildcardAnimation('In');
      this.asyncCallback[ModalState.SHOW] = resolve;
      // this.changeState(ModalState.OPENING);
      this.state = ModalState.OPENING;
      // 避免animate失效，做容错
      setTimeout(() => {
        if (this.state === ModalState.OPENING) {
          console.error(`You may be using the wrong animation name ${this.animateName} -> ${this.animate === NoneAnimate ? NoneAnimate : this.animate.name} or your device may not be compatible with this library, please check.`)
          this.state = ModalState.SHOW;
        }
      }, (this._animate === NoneAnimate ? 0 : this._animate.duration!) + 50)
    });
  }

  @FunctionEvent('CloseAnimation', [FunctionEventTypes.AFTER, FunctionEventTypes.BEFORE])
  private async showCloseAnimation(ani?: IModalAnimate | INoneAnimate) {
    // 异步
    await new Promise((resolve) => {

      if (ani) this._animate = ani;
      this.replaceWildcardAnimation('Out');
      this.asyncCallback[ModalState.CLOSED] = resolve;
      // this.changeState(ModalState.CLOSING);
      this.state = ModalState.CLOSING;

      // 避免animate失效，做容错
      setTimeout(() => {
        if (this.state === ModalState.CLOSING) {
          console.error(`You may be using the wrong animation name ${this.animateName} or your device may not be compatible with this library, please check.`)
          this.state = ModalState.CLOSED;
        }
      }, (this._animate === NoneAnimate ? 0 : this._animate.duration!) + 50)
    });
  }

  setProps<T = any>(newProps: T) {
    this._props = {...this._props, ...newProps};
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

  private replaceWildcardAnimation(stage: 'In' | 'Out') {
    if (this._animate === NoneAnimate) return;
    let name = this.animateName;
    const wildcardReg = /^(.*){(.+)\|(.+)}(.*)$/;
    if (/{.*}/.test(name)) {
      const regResult = wildcardReg.exec(name);
      // console.log(regResult);
      if (regResult) {

        // 处理名称中的{}替换值
        name = regResult[1] + regResult[stage === 'In' ? 2 : 3] + regResult[4];
        // console.log(name)
      } else {
        throw Error('you use error wildcard animation name, please check again');
      }
    }
    if (name.indexOf('*') !== -1) name = name.replace('*', stage);
    this._animate.name = name;
    if (
      this._options.animate &&
      this._options.animate !== NoneAnimate &&
      !this._options.animate.timingFunction
    ) {
      this._animate.timingFunction = 'ease-' + stage.toLowerCase();
    }
  }
}
