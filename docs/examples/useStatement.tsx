import React from 'react';
import Modal, { ModalContainer } from '@lllhys/modal';

let modal;
// let key = 0;

const Test = () => {
    const handleClick = () => {
        Modal.openModal('test');
    };
    const handleClickCLose = () => {
        Modal.closeModal('test', { animate: { name: 'zoomOutUp' } });
    };
    return (
        <div>
            <button onClick={handleClick}>打开弹窗</button>
            <button onClick={handleClickCLose}>关闭弹窗</button>
        </div>
    );
};

const modalMap = {
    test: Test,
};

export default () => {
    const handleClick = () => {
        Modal.openModal('test', { animate: { name: 'fade*' } });
    };

    return (
        <div>
            <h6>use statement</h6>
            <button onClick={handleClick}>打开弹窗</button>
            <ModalContainer modalMap={modalMap} />
        </div>
    );
};
