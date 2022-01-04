---
title: 弹窗控制
order: 2
---

## 弹窗控制

提供了全局方法和实例方法，都可用于控制弹窗的打开与关闭。 使用全局方法时你可以通过指定的实例 key、组件类（函数）、map 声明（声明模式下使用）来操作弹窗。

<Alert type="info">
  注意，由于closeModal仅为了减少部分场景下弹窗实例跨层传递/共享所带来不必要的问题而产生的，并且弹窗较多的场景下效率较低，应避免大量使用。
</Alert>

实例方法增加了对弹窗组件 props，options 的配置方法。

## 全局方法

全局提供了`createModal`、`pushModal`、`closeMdoal`、`closeAllModals`方法用于控制弹窗的打开与关闭。

<code src="../examples/globalFunction.tsx" />

## 实例方法

实例提供了`open`、`close`、`setOptions`、`setProps`。open 和 close 用于控制打开与关闭，setOptions 和 setProps 用于设置配置参数和组件 props。 setOptions 为静态方法，不会带来组件刷新的副作用，所以应该避免在弹窗打开的过程中使用。

<Alert type="warning">
  setProps独立成方法而非setter的目的是希望你重视set这些值后可能带来的组件刷新的副作用。
</Alert>

<code src="../examples/instanceFunction.tsx" />
