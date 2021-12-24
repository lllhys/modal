---
title: 基础使用
order: 2
nav:
  title: 指南
  order: 1
---

## 弹窗容器 - ModalContainer

使用前应将弹窗容器实例化，建议将弹窗容器挂载在最顶层组件中（如App组件），如需声明式使用请将modalMap传入。 如需设置全局蒙层背景、蒙层状态等全局属性，请传入配置config。具体参数请查阅API手册

```jsx | pure
import Modal, {ModalContainer} from "@lllhys/modal";
import TestModal from "你的弹窗组件"

const modalMap = {
  TestModal
}

export const App = () => {
  return <>
    <ModalContainer modalMap={modalMap} config={{mask: false}}/>
    <!-- 你的逻辑 -->
  </>
}
```

## 弹窗对象 - ModalObject

每个弹窗对象都实例化自ModalObject，通过弹窗对象的实例，你可以很好的控制弹窗的打开与关闭等等操作，这就是`实例式使用`。
同时弹窗实例提供了事件监听的方法，你可以对需要的弹窗事件进行监听。

## 全局方法

导出了Modal命名空间，改命名空间下有以下用于控制弹窗的全局方法

  - createModal: 创建一个弹窗实例，本质就是`new ModalObject`包了层皮
  - pushModal: 创建一个弹窗实例，并调用改实例的`open`方法打开弹窗
  - closeModal: 通过Key、声明（在modalMap中写的名字）、弹窗组件类（或函数）关闭弹窗， 如果你维护了弹窗实例，建议直接调用实例的close方法
  - closeModalAll: 关闭所有弹窗<Badge>刚发现忘写了，晚点写吧</Badge>

同时导出了几个从弹窗队列中查找指定弹窗的方法，你可以自行查看。

## 上手使用


