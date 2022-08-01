import React, { useRef } from 'react';
import Modal, { ModalContainer, ModalProps } from '@lllhys/modal';

const Test = (props: ModalProps) => {
  console.log(props._modal)
  const handleOpen = () => {
    Modal.openModal(Test, {
      bodyAnimation: {
        name: 'zoom*{Left|Right}',
      },
    });
  };

  const handleClose = () => {
    Modal.closeModal();
    // or Modal.closeModal(Test);
    // or props._modal.close();
  };

  const handleCloseAll = () => {
    Modal.closeAllModals();
  };

  return (
    <>
      <h6>this is a modal</h6>
      <button onClick={handleOpen}>openModal</button>
      <button onClick={handleClose}>closeModal</button>
      <button onClick={handleCloseAll}>closeAllModals</button>
    </>
  );
};

export default () => {
  const handleCreate = () => {
    const modal = Modal.createModal(Test, { bodyAnimation: { name: 'flip*{Y|X}' }});

    setTimeout(() => {
      modal.open();
    }, 1000);
  };

  const handleOpen = () => {
    Modal.openModal(Test, {maskClosable: true, showMask: false });
  };

  return (
    <div>
      <h6>global function use</h6>
      <button onClick={handleCreate}>createModal and open(delay 1000)</button>
      <button onClick={handleOpen}>openModal</button>
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
