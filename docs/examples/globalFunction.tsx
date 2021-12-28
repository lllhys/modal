import React, { useRef } from 'react';
import Modal, { ModalContainer, IModalProps } from '@lllhys/modal';

const Test = (props: IModalProps) => {

  return (
    <h3>this is a modal</h3>
  );
};

export default () => {

  const handleCreate = () => {

  }

  const handleOpen = () => {

  }

  return (
    <div>
      <h5>global function use</h5>
      <button onClick={handleCreate}>createModal and open(delay 1000)</button>
      <button onClick={handleOpen}>openModal</button>
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
