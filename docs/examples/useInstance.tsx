import React, { useRef } from 'react';
import Modal, { ModalContainer, IModalProps } from '@lllhys/modal';

const Test = (props: IModalProps) => {
  const handleClick = () => {
    // Open a new modal and set maskStyle attr.
    // 打开一个新的弹窗
    const modal = Modal.pushModal(Test, {
      maskStyle: {
        backgroundColor: 'rgba(183,170,24,0.5)',
      },
    });
  };
  const handleClickCLose = () => {
    // You can close the modal with the current modal instance.
    // 使用当前弹窗实例关闭弹窗
    props._modal.close();
    // or use Modal.closeModal function to close, the top modal will be closed when there is a repeat modal unless you specify a key.
    // 或者也可以使用 Modal.closeModal(Test),当有重复弹窗时将关闭最上层的弹窗，如果需要关闭指定弹窗请传入key
  };
  return (
    <div
      style={{
        width: '250px',
        height: '400px',
        left: 0,
        top: 0,
        position: 'absolute',
        background:
          'url("//yun.duiba.com.cn/spark/v2/temp_base/1639793106439/弹窗我的礼品/弹窗9.png") no-repeat top left / 100% 100%',
      }}
    >
      <button onClick={handleClick}>Open new</button>
      <button onClick={handleClickCLose}>Close Current</button>
    </div>
  );
};

export default () => {
  const handleClick = () => {
    const modal = Modal.createModal(Test);

    modal.addEventListener('onStateChange', () => {
      console.log("state change")
    })
    modal.addEventListener('onOpenStart', () => {
      console.log('onOpenStart');
    });

    modal.addEventListener('onOpenEnd', () => {
      console.log('onOpenEnd');
    });

    modal.addEventListener('onCloseEnd', () => {
      console.log('onCloseEnd');
    });

    modal.open();
  };

  return (
    <div>
      <h6>use instance</h6>
      <button onClick={handleClick}>Open new</button>
      <ModalContainer
        config={{
          showSingle: true,
          destroyOnInvisible: true,
          multiMask: true,
          maskStyle: {
            backgroundColor: 'rgba(0, 100, 100, 0.5)',
          },
        }}
      />
    </div>
  );
};
