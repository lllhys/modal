import type { ModalProps, ModalEvent } from '@lllhys/modal';
import { ModalContainer, ModalObject, EventType } from '@lllhys/modal';
import React, { useRef } from 'react';

const Test = (props: ModalProps<any>) => {
  const handleClickCLose = () => {
    props._modal.close();
  };
  return (
    <div>
      <button onClick={handleClickCLose}>Close Current</button>
    </div>
  );
};

export default () => {
  const modalRef = useRef<ModalObject>();

  const handleCreate = () => {
    const modal = (modalRef.current = new ModalObject(Test, {
      bodyAnimation: { name: 'flip*{Y|X}' },
    }));
    modal.addEventListener(EventType.ON_STATE_CHANGE, (e) => {
      console.log(e.type, e.value);
    });

    const callback = (e: ModalEvent) => {
      console.log(e.type, e.target);
    };

    modal.addEventListener(EventType.ON_OPEN_END, callback);

    modal.addEventListener(EventType.ON_CLOSE_END, callback);
  };

  const handleOpen = () => {
    if (!modalRef.current) {
      alert('please click `new instance` first.');
      return;
    }
    modalRef.current.open();
  };

  return (
    <div>
      <h6>event</h6>
      <button onClick={handleCreate}>new modal instance</button>
      <button onClick={handleOpen}>open</button>

      <ModalContainer
        config={{
          showSingleModal: true,
          destroyOnInvisible: true,
          maskStyle: {
            backgroundColor: 'rgba(0, 100, 100, 0.5)',
          },
        }}
      />
    </div>
  );
};
