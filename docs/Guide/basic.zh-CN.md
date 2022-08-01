---
title: 基础功能
order: 2
nav:
  title: 指南
  order: 1
---

## 弹窗容器 - ModalContainer

使用前应将弹窗容器实例化，组件提供两种方式实力话弹窗容器
1. `Modal.init`方法，该方法默认在document下添加节点作为弹窗容器
2. `ModalContainer`组件，使用ModalContainer组件可以在你需要的任意地方注册添加弹窗容器

> 注意⚠️：弹窗容器存在单例限制，无法多次添加容器

### 弹窗使用：声明式与实例式使用

组件提供了 2 种不同的打开弹窗方式，声明式使用与实例式使用：

- 声明式使用：通过全局传入弹窗 Map 声明，后续通过声明的key对弹窗进行控制
- 实例式使用：不全局传入弹窗声明，后续直接传入 React 组件并通过返回的实例进行控制
·
如需声明式使用请将 ModalMap 传入，后续可以通过 ModalMap 中的 Key 进行控制弹窗，同时声明式使用与实例式使用可以混用

### 全局配置

如需设置全局蒙层背景、蒙层状态等全局属性，请传入配置 config

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
| modalMap | Object: { [key: string]: ReactComponent \| ReactFunctionComponent } | false | 声明式使用时传入的弹窗声明 map |
| config | <a href='#config参数'>Config</a> | - | 全局配置参数，实例配置参数留空时默认取全局配置参数 |

#### Config 参数

| 参数 | 类型 | 默认值 | 解释 |
| --- | --- | --- | --- |
| showSingleModal | Boolean | false | 单实例模式：每次仅显示最上层蒙层，其他蒙层隐藏或销毁（通过 destroyOnInvisible 控制） |
| showSingleMask | Boolean | false | 控制单例模式下蒙层是否独立 |
| destroyOnInvisible | Boolean | false | 单例模式下不可见时销毁 React 组件（不销毁弹窗实例，可见时重新挂载组件） |
| zIndex | Number | 3000 | 全局 zIndex/弹窗容器zIndex |
| showMask | Boolean | true | 全局蒙层开关 |
| maskStyle | Object | {backgroundColor: 'rgba(0, 0, 0, 0.7)',} | 全局蒙层 CSS 样式 |
| maskClosable | Boolean | false | 全局点击蒙层可关闭开关 |
| prioritization | Boolean | false | 弹窗优先级控制 |
| immediately | Boolean | false | 关闭弹窗动画，直接打开/关闭弹窗 |
| maskAnimation | Object: {name: String, duration: Number, timingFunction: String} | {name: 'fade*', duration: 400} | 弹窗蒙层动画属性 |
| bodyAnimation | Object: {name: String, duration: Number, timingFunction: String} | {name: 'zoom*', duration: 400} | 弹窗主体动画属性 |
| maskComponent | ReactComponent \| ReactFunctionComponent | \<div /> | 弹窗蒙层组件 |



## 弹窗对象 - ModalObject

每个弹窗对象都实例化自 ModalObject 类，弹窗实例提供了声明周期、事件监听、属性控制等。你都可以通过弹窗实例进行操作（同时部分操作也支持通过全局方法进行操作）

### 控制方法

弹窗实例提供了`open`、`close`、`setProps`、`setOptions`等方法用于控制弹窗打开、关闭、设置 props、设置 options 等操作，具体使用见 API 手册

### 事件方法

提供了`addEventListener`、`removeEventListener`、`removeAllEventListeners`方法用于控制弹窗实例上的事件，具体使用见 API 手册

## 全局方法

导出了 Modal 命名空间，该命名空间下有以下用于控制弹窗的全局方法

- createModal: 创建一个弹窗实例，本质就是`new ModalObject`套了层皮
- openModal: 创建一个弹窗实例，并调用改实例的`open`方法打开弹窗
- closeModal: 通过 Key、声明（在 modalMap 中写的名字）、弹窗组件类（或函数）关闭弹窗， 如果你维护了弹窗实例，建议直接调用实例的 close 方法
- closeAllModals: 关闭所有弹窗
- setGlobalConfig: 更新全局属性
- setGlobalModalMap: 更新全局弹窗映射
- init: 初始化弹窗容器

同时导出了几个从弹窗队列中查找指定弹窗的方法，你可以自行查看。

详细内容见 API 手册
