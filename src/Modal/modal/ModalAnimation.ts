import type { Animation } from './types';
import { AnimationStage } from './types';
import { checkHasWildcard, replaceWildcard } from '../../utils';

export const defaultAnimateName = 'zoom*';

export const defaultAnimationConfig = {
  duration: 400,
  name: defaultAnimateName,
  timingFunction: '',
};

export default class ModalAnimation {
  duration: number = 2000;
  timingFunction: string;
  name: string;

  _originName: string;

  constructor(animation: Animation) {
    const _animation = { ...defaultAnimationConfig, ...animation };
    this.name = this._originName = _animation.name;
    this.duration = _animation.duration;
    this.timingFunction = _animation.timingFunction;
  }

  getAnimationName(stage?: AnimationStage) {
    const hasWildcard = checkHasWildcard(this._originName);
    if (!hasWildcard) return this._originName;
    if (!stage) {
      throw new Error('You must set animation stage when use wildcard.');
    }
    this.name = replaceWildcard(this._originName, stage);
    return this.name;
  }

  getAnimation(stage?: AnimationStage) {
    return {
      name: this.getAnimationName(stage),
      duration: this.duration,
      timingFunction: this.timingFunction,
    };
  }

  getAnimationStyle(stage?: AnimationStage) {
    return `${this.getAnimationName(stage)} ${this.duration}ms ${this.timingFunction}`;
  }
}
