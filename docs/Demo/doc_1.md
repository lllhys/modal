## Modal

Demo:

```tsx
import React from 'react';
import Modal, { ModalContainer } from '@lllhys/modal';

let modal;
let key = 0;

const Test = () => {
  const handleClick = () => {
    Modal.pushPop('test', { key: ++key });
  };
  const handleClickCLose = () => {
    Modal.closePop('test', { animate: { name: 'zoomOut' } });
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
    modal = Modal.pushPop('test', { key: ++key, animate: { name: 'fade{}' } });
  };

  return (
    <div>
      <button onClick={handleClick}>打开弹窗</button>
      <ModalContainer modalMap={modalMap} />
    </div>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

切面设计

ModalClass 定义 Modal 的 open close 各种方法

外层包裹事件分发切面 对 open close 方法做处理，做事件分发
