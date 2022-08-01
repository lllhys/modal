---
title: basic
order: 1
nav:
  title: Demo
  order: 2
---

## 实例式使用

### 使用

通过`createModal`方法或`ModalObject`类创建一个 modal 实例，后续通过调用 modal 实例的 open、close 等方法控制弹窗的打开与关闭。

### demo

<code src="../examples/useInstance.tsx" />

## 声明式使用

### 使用

通过`createModal`方法或`ModalObject`类创建一个 modal 实例，创建实例时应传入声明的组件 key，后续通过`closeModal`或通过组件 props 传入的 modal 实例控制关闭弹窗。

### demo

<code src="../examples/useStatement.tsx" />
