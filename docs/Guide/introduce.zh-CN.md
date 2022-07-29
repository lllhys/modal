---
title: 介绍
order: 1
nav:
  title: 指南
  order: 1
---

# Modal - 弹窗组件

移动端弹窗组件，实现了组件的完整生命周期，内置常用的关键帧动画，同时提供了事件监听回调。

## 文档

使用文档： https://lllhys.github.io/modal/

## 安装

```shell
yarn add @lllhys/modal
# or
npm install @lllhys/modal
```

## 使用

这是一个简单的使用 demo，了解更多请移步文档。

```tsx | pure
import Modal, {ModalContainer, IModalProps} from '@lllhys/modal';


const ModalFC = (props: IModalProps<{}>) => {
  return <div></div>
}

// init a modal container
Modal.init();

// App.jsx
const App = () => {
  const handleClick = () => {
    const modal = Modal.openModal(ModalFC);
  }
  return <>
    <button onClick={handleClick} > open < /button>
    {/* Or use container component to register*/}
    {/*< ModalContainer / >*/}
    </>
}


```
