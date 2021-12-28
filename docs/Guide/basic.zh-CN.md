---
title: 基础使用
order: 2
nav:
  title: 指南
  order: 1
---

## 弹窗容器 - ModalContainer

使用前应将弹窗容器实例化，建议将弹窗容器挂载在最顶层组件中（如App组件）。

### 声明式与实例式使用

组件提供了2种不同的使用方式，声明式使用与实例式使用：

- 声明式使用：通过全局传入弹窗Map声明，后续通过声明对弹窗进行控制
- 实例式使用：不全局传入弹窗声明，后续直接传入React组件并通过返回的实例进行控制

如需声明式使用请将ModalMap传入，后续可以通过ModalMap中的Key进行控制弹窗，同时声明式使用与实例式使用可以混用

### 全局配置

如需设置全局蒙层背景、蒙层状态等全局属性，请传入配置config


```jsx | pure
import Modal, {ModalContainer} from "@lllhys/modal";
import TestModal from "你的弹窗组件"

const modalMap = {
  TestModal
}

export const App = () => {
  return <>
    <ModalContainer modalMap={modalMap} config={{mask: false}}/>
    <!-- Your code. -->
  </>
}
```

### ModalContainer Props

| 参数 | 类型 | 默认值 | 解释 |
| --- | --- | --- | --- |
| modalMap | Object: { [key: string]: ReactComponent \| ReactFunctionComponent } | false | 声明式使用时传入的弹窗声明map |
| config | <a href='#config参数'>Config</a> | - | 全局配置参数，实例配置参数留空时默认取全局配置参数 |


#### Config参数

| 参数 | 类型 | 默认值 | 解释 |
| --- | --- | --- | --- |
| multiMask | Boolean | false | 控制单例模式下蒙层是否独立 |
| showSingle | Boolean | false | 单实例模式：每次仅显示最上层蒙层，其他蒙层隐藏或销毁（通过destroyOnInvisible控制） |
| destroyOnInvisible | Boolean | false | 单例模式下不可见时销毁React组件（不销毁实例，可见时重新挂载） |
| zIndex | Number | 3000 | 全局zIndex |
| mask | Boolean | true | 全局蒙层开关 |
| maskStyle | Object | {backgroundColor: 'rgba(0, 0, 0, 0.7)',} | 全局蒙层CSS样式 |


## 弹窗对象 - ModalObject

每个弹窗对象都实例化自ModalObject类，弹窗实例维护了弹窗队列中的每个弹窗的声明周期、事件监听等。
你都可以通过弹窗实例进行操作（同时部分操作也支持通过全局方法进行操作）

### 控制方法

弹窗实例提供了`open`、`close`、`modifyProps`、`setOptions`等方法用于控制弹窗打开、关闭、设置props、设置options等操作，具体使用见API手册

### 事件方法

提供了`addEventListener`、`removeEventListener`、`removeAllEventListeners`方法用于控制弹窗实例上的事件，具体使用见API手册

## 全局方法

导出了Modal命名空间，该命名空间下有以下用于控制弹窗的全局方法

  - createModal: 创建一个弹窗实例，本质就是`new ModalObject`套了层皮
  - pushModal: 创建一个弹窗实例，并调用改实例的`open`方法打开弹窗
  - closeModal: 通过Key、声明（在modalMap中写的名字）、弹窗组件类（或函数）关闭弹窗， 如果你维护了弹窗实例，建议直接调用实例的close方法
  - closeModalAll: 关闭所有弹窗

同时导出了几个从弹窗队列中查找指定弹窗的方法，你可以自行查看。

详细内容见API手册

