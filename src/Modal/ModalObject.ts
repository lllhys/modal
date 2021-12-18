import {event, Events, useEvent} from "./Events";
import store, {updateAll} from "../_util/store";
import {IModalAnimate, IModalClass, INoneAnimate, IOptions, ModalState, NoneAnimate, ReactComponent} from "../_util/types";


let globalId = 0;

const defaultAnimateName = 'zoom{}'
const defaultAnimate: IModalAnimate = {
  duration: 500,
  name: defaultAnimateName,
  timingFunction: ""
}

@useEvent
class ModalObject implements IModalClass {


  component;
  options;
  props = undefined;
  id;
  key = "`1234567^$%^&%*89hhjkjh"; // 乱写的default key，应该不会有b能取到这个key吧
  animate: IModalAnimate | INoneAnimate = defaultAnimate;
  private animateName = defaultAnimateName // 动画名备份
  state = ModalState.INIT;

  constructor(com: ReactComponent, options?: IOptions) {
    this.component = com;
    this.options = options;
    this.id = globalId++;
    // key 不允许二次副职
    options?.key && (this.key = options.key);
    options && this.setOptions(options);
    // 监听组件
    store.popList.push(this);
    this.state = ModalState.CREATED;
    console.log(options)
  }

  setOptions(options: IOptions) {
    options.props && (this.props = options.props);
    if (options.animate) {
      if (options.animate === NoneAnimate) this.animate = this.animateName = NoneAnimate
      else {
        this.animate = {...defaultAnimate, ...options.animate};
        this.animateName = options.animate.name;
      }
    }
  }

  @event([Events.BEFORE, Events.AFTER])
  async open() {
    this.state = ModalState.OPENING;
    if (this.options?.immediately) {
      this.changeState(ModalState.SHOW)
    } else {
      await this.showOpenAnimation();
    }
  }

  @event([Events.BEFORE, Events.AFTER])
  async close() {
    if (this.options?.immediately) {
      this.changeState(ModalState.CLOSED)
    } else {
      await this.showCloseAnimation();
    }
  }


  // TODO 事件回调

  @event([Events.AFTER, Events.BEFORE])
  async showOpenAnimation(ani?: IModalAnimate | INoneAnimate) {
    if (ani) this.animate = ani;
    // store.popList.push(this);
    this.replaceWildcardAnimation('In');
    this.changeState(ModalState.OPENING)
  }

  @event([Events.AFTER, Events.BEFORE])
  showCloseAnimation(ani?: IModalAnimate | INoneAnimate) {
    if (ani) this.animate = ani;
    this.replaceWildcardAnimation('Out');
    this.changeState(ModalState.CLOSING)
  }

  modifyProps(newProps: any) {
    this.props = newProps;
    // 更新一下
    updateAll()
  }

  changeState(state: ModalState) {
    this.state = state;
    if (state === ModalState.CLOSED) {
      // 移除目标
      store.popList = store.popList.filter(v => v!== this)
    }
    updateAll();
  }

  replaceWildcardAnimation(stage: "In" | "Out"){
    if(this.animate === NoneAnimate) return;
    const name = this.animateName;
    if (name.indexOf('{}')!== -1) this.animate.name =  name.replace('{}', stage)
  }

}

/**
 * 切换组件生命周期方法
 */
export const changModalState = () => {

}


export default ModalObject;
