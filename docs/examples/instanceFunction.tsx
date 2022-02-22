import React, { useRef } from 'react';
import Modal, { ModalContainer, ModalProps, ModalObject } from '@lllhys/modal';

const Test = (props: ModalProps<{ text?: string }>) => {
  console.log('rerender', props);
  const handleOpen = () => {
    Modal.openModal(Test, {
      bodyAnimation: {
        name: 'zoom*{Left|Right}',
      },
    });
  };

  const handleClose = () => {
    // 使用通过props传递进来的当前弹窗实例
    props._modal.close();
  };

  const handleCloseAll = () => {
    Modal.closeAllModals();
  };

  const handleSetProps = () => {
    props._modal.setProps<{ text?: string }>({ text: 'ctesttst' });
  };

  return (
    <>
      <h6>this is a modal</h6>

      <p style={{ fontSize: '16px' }}>{props.text || 'you can click `set props` to set text'}</p>
      <button onClick={handleOpen}>openModal</button>
      <button onClick={handleClose}>closeModal</button>
      <button onClick={handleSetProps}>set props</button>
    </>
  );
};

export default () => {
  const modalRef = useRef<ModalObject>();

  const handleCreate = () => {
    modalRef.current = new ModalObject(Test, { bodyAnimation: { name: 'flip*{Y|X}' } });
  };

  const handleOpen = () => {
    if (!modalRef.current) {
      alert('please click `new instance` first.');
      return;
    }
    modalRef.current.open();
  };

  const handleSetOptions = () => {
    if (!modalRef.current) {
      alert('please click `new instance` first.');
      return;
    }
    modalRef.current.setOptions({
      maskStyle: {
        backgroundColor: 'rgba(114,19,126,0.7)',
      },
    });
    alert('click `open` to see.');
  };

  return (
    <div>
      <h6>instance function use</h6>
      <button onClick={handleCreate}>new modal instance</button>
      <button onClick={handleOpen}>open</button>
      <button onClick={handleSetOptions}>set options</button>

      <ModalContainer
        config={{
          maskStyle: {
            backgroundColor: 'rgba(200, 200, 100, 0.7)',
          },
        }}
      />
    </div>
  );
};
