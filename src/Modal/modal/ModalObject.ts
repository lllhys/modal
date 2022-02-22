import { FunctionEvent, FunctionEventTypes, PropertyEvent, UseEvent } from '../event/Event';
import type { ModalCreateOptions, ModalUpdateOptions, ReactComponent } from './types';
import { ModalState } from './types';
import { StoreModalList } from '../store';
import { updateAll } from '../store/store';
import { ModalOptions, NoneAnimation } from './ModalOption';
import type ModalAnimation from './ModalAnimation';

let globalId = 0;

@UseEvent
export class ModalObject {
  private readonly _bodyComponent: ReactComponent;
  readonly id;
  readonly key: string = '`467^$%89jkjh^&%*'; // 乱写的default key，应该不会有b能取到这个key吧
  private _options: ModalOptions; // 可配置的options and props
  private _props: any = { _modal: this };
  private _asyncCallback: Record<string, CallableFunction> = {};
  private _state: ModalState = ModalState.INIT; // life-circle state

  constructor(com: ReactComponent, options?: ModalCreateOptions) {
    this.id = globalId++;
    // key 不允许二次赋值

    options?.key && (this.key = options.key);
    delete options?.key;
    // new option
    this._options = new ModalOptions(options || {});

    // bodyComponent
    this._bodyComponent = com;

    this.state = ModalState.CREATED;
  }

  /**
   * ------------------------All getter and setters.----------------------------
   */
  get state() {
    return this._state;
  }

  @PropertyEvent('state')
  set state(state: ModalState) {
    this._state = state;
    if (this._asyncCallback[state]) {
      this._asyncCallback[state]();
      // clear
      delete this._asyncCallback[state];
    }
    if (state === ModalState.CLOSING) {
      StoreModalList.prePop(this);
    }
    if (state === ModalState.CLOSED) {
      // 移除目标
      StoreModalList.pop(this);
      // store.modalList = store.modalList.filter((v) => v !== this);
    }
    updateAll();
  }

  get options(): ModalOptions {
    return this._options;
  }

  get bodyComponent() {
    return this._bodyComponent;
  }

  get props(): any {
    return this._props;
  }

  // setOptions(options: IOptionsExceptKey) {
  //   this._options = options;
  //   const singleAndNotMulti = store.config.showSingle && !store.config.multiMask;
  //   // console.log("singleAndNotMulti", singleAndNotMulti)
  //   // props 处理
  //   options.props && (this._props = { ...this._props, ...options.props });
  //   // mask 处理
  //   options.mask !== undefined && (this._mask = singleAndNotMulti ? false : options.mask);
  //   // mask closable
  //   options.maskClosable !== undefined && (this._maskClosable = options.maskClosable);
  //   // style
  //   options.maskStyle && (this._maskStyle = options.maskStyle);
  //   // z index
  //   options.zIndex !== undefined && (this._zIndex = options.zIndex);
  //   // 动画处理
  //   if (options.animate) {
  //     if (options.animate === NoneAnimate) this._animate = this.animateName = NoneAnimate;
  //     else {
  //       this._animate = { ...defaultAnimate, ...options.animate };
  //       this.animateName = options.animate.name;
  //     }
  //   }
  // }

  @FunctionEvent('Open', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async open(options?: ModalUpdateOptions) {
    options && this._options.updateOptions(options);
    if (this.state !== ModalState.CREATED && this.state !== ModalState.CLOSED) {
      console.warn(
        'This modal is already visible, calling the open method again will not take effect.',
        this,
      );
      return;
    }
    if (!StoreModalList.has(this)) {
      // 监听组件
      StoreModalList.push(this);
      // store.modalList.push(this);
    }
    const _options = this.options;
    if (
      options?.immediately ||
      (_options.bodyAnimation === NoneAnimation && _options.maskAnimation === NoneAnimation)
    ) {
      // this.changeState(ModalState.SHOW);
      this.state = ModalState.SHOW;
    } else {
      await this.showOpenAnimation();
    }
  }

  @FunctionEvent('Close', [FunctionEventTypes.BEFORE, FunctionEventTypes.AFTER])
  async close(options?: Omit<ModalUpdateOptions, 'zIndex'>) {
    options && this._options.updateOptions(options);
    const _options = this.options;
    if (
      _options.immediately ||
      (_options.bodyAnimation === NoneAnimation && _options.maskAnimation === NoneAnimation)
    ) {
      // this.changeState(ModalState.CLOSED);
      this.state = ModalState.CLOSED;
    } else {
      await this.showCloseAnimation();
    }
  }

  @FunctionEvent('OpenAnimation', [FunctionEventTypes.AFTER, FunctionEventTypes.BEFORE])
  private async showOpenAnimation() {
    await this.handleAnimation('open');
  }

  @FunctionEvent('CloseAnimation', [FunctionEventTypes.AFTER, FunctionEventTypes.BEFORE])
  private async showCloseAnimation() {
    await this.handleAnimation('close');
  }

  private async handleAnimation(stage: 'open' | 'close') {
    const onState = stage === 'open' ? ModalState.OPENING : ModalState.CLOSING;
    const doneState = stage === 'open' ? ModalState.SHOW : ModalState.CREATED;
    // 异步
    await new Promise((resolve) => {
      // store.popList.push(this);
      this._asyncCallback[doneState] = resolve;
      // this.changeState(ModalState.OPENING);
      this.state = onState;
      const bodyAni = this._options.bodyAnimation as ModalAnimation;
      // 避免animate失效，做容错
      setTimeout(() => {
        if (this.state === onState) {
          console.error(
            `You maybe using the wrong animation name ${bodyAni._originName} -> ${bodyAni.name} or your device may not be compatible with this library, please check.`,
          );
          this.state = doneState;
        }
      }, bodyAni.duration + 50);
    });
  }

  setProps<T = any>(newProps: T) {
    this._props = { ...this._props, ...newProps };
    // 更新一下
    updateAll();
  }

  setOptions(options: ModalUpdateOptions) {
    this._options.updateOptions(options);
  }

  // private replaceWildcardAnimation(stage: SwitchType) {
  //   if (this._animate === NoneAnimate) return;
  //   // let name = this.animateName;
  //   // const wildcardReg = /^(.*){(.+)\|(.+)}(.*)$/;
  //   // if (/{.*}/.test(name)) {
  //   //   const regResult = wildcardReg.exec(name);
  //   //   // console.log(regResult);
  //   //   if (regResult) {
  //   //     // 处理名称中的{}替换值
  //   //     name = regResult[1] + regResult[stage === 'In' ? 2 : 3] + regResult[4];
  //   //     // console.log(name)
  //   //   } else {
  //   //     throw Error('you use error wildcard animation name, please check again');
  //   //   }
  //   // }
  //   // if (name.indexOf('*') !== -1) name = name.replace('*', stage);
  //
  //   this._animate.name = replaceWildcard(this.animateName, stage);
  //   if (
  //     this._option.animate &&
  //     this._option.animate !== NoneAnimate &&
  //     !this._option.animate.timingFunction
  //   ) {
  //     this._animate.timingFunction = 'ease-' + stage.toLowerCase();
  //   }
  // }

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
}
