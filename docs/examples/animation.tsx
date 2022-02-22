import React from 'react';
import Modal, { ModalContainer, ModalProps } from '@lllhys/modal';

const Test = (props: ModalProps) => {
  const handleClose = () => {
    props._modal.close();
  };

  return (
    <>
      <h6>this is a modal</h6>
      <button onClick={handleClose}>closeModal</button>
    </>
  );
};

export default () => {
  const handleOpen1 = () => {
    Modal.openModal(Test, {
      bodyAnimation: { name: 'fade*' },
    });
  };

  const handleOpen2 = () => {
    Modal.openModal(Test, {
      bodyAnimation: { name: 'slide*{Up|Down}' },
    });
  };

  const handleOpen3 = () => {
    Modal.openModal(Test, {
      bodyAnimation: { name: '{jello|wobble}' },
    });
  };

  return (
    <div>
      <h6>use animation</h6>
      <h6>use animation</h6>
      <h6>use animation</h6>
      <h6>use animation</h6>
      <h6>use animation</h6>
      <h6>use animation</h6>
      <h6>use animation</h6>

      <button onClick={handleOpen1}>open fade*</button>
      <button onClick={handleOpen2}>open {`slide*{Up|Down}`}</button>
      <button onClick={handleOpen3}>open {`{jello|wobble}`}</button>
      <ModalContainer config={{ maskStyle: { backgroundColor: 'rgba(147,186,255,0.8)' } }} />
    </div>
  );
};
