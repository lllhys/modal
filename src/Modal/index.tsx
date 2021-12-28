import React, { useEffect, useState } from 'react';
import { IModalClass, IModalConfig, IModalContainerProps, ModalState, NoneAnimate } from './types';
import store, { makeObserver } from '../store';
import { defaultModalConfig } from './constants';
import { getArrayEle } from '../utils';
import { ModalObject } from './class/ModalObject';
import "../../assets/index.css";
import 'animate.css';
// import "../../assets/keyframe.css"

export const visibleStates = [ModalState.SHOW, ModalState.CLOSING, ModalState.OPENING];

const isAnimating = (pop: IModalClass) => {
  return pop.state === ModalState.CLOSING || pop.state === ModalState.OPENING;
};

/**
 * animate end 处理， 切换对象生命状态
 */
const handleAnimateEnd = (pop: IModalClass) => {
  // console.log('aaaa')
  // if (pop.state === ModalState.OPENING) pop.changeState(ModalState.SHOW);
  // if (pop.state === ModalState.CLOSING) pop.changeState(ModalState.CLOSED);
  if (pop.state === ModalState.OPENING) pop.state = ModalState.SHOW;
  if (pop.state === ModalState.CLOSING) pop.state = ModalState.CLOSED;
};

/**
 * 计算body动画
 * @param pop
 */
const calculateBodyAnimation = (pop: IModalClass) => {
  if (pop.state === ModalState.SHOW) return '';
  const ani = pop.animate;
  if (ani === NoneAnimate) return '';
  else return `${ani.name} ${ani.duration}ms ${ani.timingFunction} `;
};

/**
 * 计算蒙层动画
 * @param pop
 */
const calculateMaskAnimation = (pop: IModalClass) => {
  if (pop.state === ModalState.OPENING) return 'modal-zoom-in';
  if (pop.state === ModalState.CLOSING) return 'modal-zoom-out';
  return '';
};

/**
 * 计算弹窗蒙层style
 * @param pop
 */
const calculateMaskStyle = (pop: IModalClass | IModalConfig) => {
  let style: React.CSSProperties = {};
  if (pop.mask && pop.maskStyle) style = { ...pop.maskStyle };
  if (pop.zIndex !== undefined) style.zIndex = pop.zIndex;
  return style;
};


/**
 * ModalContainer 组件
 * @param props
 * @constructor
 */
const ModalContainer: React.FC<IModalContainerProps> = (props) => {
  console.log('-----rerender------')

  const { popList } = store;

  const [zIndex, setZIndex] = useState(defaultModalConfig.zIndex);

  useEffect(() => {
    if (!props.modalMap) return;
    // 更新store的modalMap
    store.modalMap = props.modalMap;
  }, [props.modalMap]);

  useEffect(() => {
    store.config = { ...defaultModalConfig, ...props.config };
    setZIndex(store.config.zIndex);
  }, [props.config]);



  /**
   * 弹窗关闭过程中阻止点击事件捕获
   * @param e
   * @param pop
   */
  const preventClick = (e: React.MouseEvent, pop: IModalClass) => {
    if (
      pop.state === ModalState.OPENING ||
      pop.state === ModalState.CLOSING ||
      pop.state === ModalState.CLOSED
    ) {
      e.stopPropagation();
    }
  };

  /**
   * 弹窗阻止冒泡
   * @param e
   */
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  /**
   * 弹窗蒙层点击事件
   * @param e
   * @param pop
   */
  const handleMaskClick = (e: React.MouseEvent, pop: IModalClass) => {
    if (pop.maskClosable) {
      pop.close();
    }
  };

  const getShowPopList = () => {
    return popList.filter((v) => visibleStates.includes(v.state));
    // 以下为旧的单弹窗逻辑，目前重构中
    // if (!store.config.showSingle) return list;
    //
    // // 处理单一弹窗场景
    // if (list.length < 2) return list;
    //
    // const tailender = getArrayEle(list, -1)!;
    // const penult = getArrayEle(list, -2)!;
    // if (tailender?.state === ModalState.CLOSING || tailender?.state === ModalState.OPENING) {
    //   // 返回两个，控制渲染
    //   return [penult, tailender]
    // }
    //
    // return [tailender]
  };

  const showPopList = getShowPopList();

  /**
   *
   * @param pop
   * @param options switchType: 单实例状态下需要控制下层弹窗的显示与隐藏
   */
  const generateMaskProps = (
    pop: IModalClass,
    options?: { invisible?: boolean; switchType?: 'in' | 'out' },
  ) => {
    const mask = pop.mask !== undefined ? pop.mask : store.config.mask;

    const switchAni =
      options?.switchType &&
      (options.switchType === 'in' ? 'fadeIn 500ms forwards' : 'fadeOut 500ms forwards');

    return {
      className: `modal-container ${calculateMaskAnimation(pop)} ${mask && 'modal-mask'}`,
      style: options?.invisible
        ? { display: 'none' }
        : { ...calculateMaskStyle(pop), animation: switchAni },
      onClick: (e: React.MouseEvent) => handleMaskClick(e, pop),
      key: pop.id,
    };
  };

  const generateBodyProp = (pop: IModalClass) => {
    return {
      className: `modal-body`,
      style: { animation: calculateBodyAnimation(pop) },
      onAnimationEnd: () => handleAnimateEnd(pop),
      onClickCapture: (e: React.MouseEvent) => preventClick(e, pop),
      onMouseDownCapture: (e: React.MouseEvent) => preventClick(e, pop),
      onMouseUpCapture: (e: React.MouseEvent) => preventClick(e, pop),
      onClick: stopPropagation,
      onMouseDown: stopPropagation,
      onMouseUp: stopPropagation,
    };
  };

  /**
   * 重写的单弹窗模式
   */
  const renderSingleMode = () => {
    if (!showPopList.length) return;

    const config = store.config;
    // 销毁其他弹窗
    const destroy = config.destroyOnInvisible;

    const last = getArrayEle(showPopList, -1)!;

    const lastAnimateType = isAnimating(last);
    // 可视的弹窗数
    const effectiveNum = lastAnimateType ? 2 : 1;

    const _showPopList = showPopList.slice(
      destroy ? showPopList.length - effectiveNum : 0,
      showPopList.length,
    );

    const len = _showPopList.length;

    const singleAndNotMulti = config.showSingle && !config.multiMask;

    //       className: `modal-container ${calculateMaskAnimation(pop)} ${mask && "modal-mask"}`,
    //       style: options?.invisible ? {display: 'none'} : {...calculateMaskStyle(pop), animation: switchAni},
    return (
      <section
        style={singleAndNotMulti ? calculateMaskStyle(config) : {}}
        className={
          singleAndNotMulti
            ? `modal-container ${calculateMaskAnimation(showPopList[0])} ${
                config.mask && 'modal-mask'
              }`
            : ''
        }
      >
        {_showPopList.map((pop, index) => {
          const Pop = pop.component;
          return (
            <section
              {...generateMaskProps(pop, {
                invisible: index < len - effectiveNum,
                switchType:
                  lastAnimateType && index === len - effectiveNum
                    ? last.state === ModalState.OPENING
                      ? 'out'
                      : 'in'
                    : undefined,
              })}
            >
              <div {...generateBodyProp(pop)}>
                {/*{{...Pop, props: pop.props}}*/}
                <Pop {...pop.props} />
              </div>
            </section>
          );
        })}
      </section>
    );
  };

  /**
   * 多弹窗模式渲染
   */
  const renderMultiMode = () => {
    return showPopList.map((pop) => {
      const Pop = pop.component;
      return (
        <section {...generateMaskProps(pop)}>
          <div {...generateBodyProp(pop)}>
            {/*{{...Pop, props: pop.props}}*/}
            <Pop {...pop.props} />
          </div>
        </section>
      );
    });
  };

  return (
    <section style={{ zIndex }}>
      {store.config.showSingle ? renderSingleMode() : renderMultiMode()}
    </section>
  );
};

export type IModalProps<T= any> = { _modal: ModalObject } & T;

export default makeObserver<IModalContainerProps>(ModalContainer);
