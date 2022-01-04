---
title: 内置动画
order: 3
---

## 内置动画库

组件依赖于动画库[animate.css](https://animate.style/)，你可以使用上面的任意一个动画作为弹窗的打开/关闭过渡动画。

## 使用

弹窗的打开关闭方法都提供了 options 配置，具体参阅 API 手册。animate 配置支持一下参数

- name: keyframes 的名称，支持你项目中手写的 global css 或者时 animate.css 当中的动画名称
- duration: 持续时间（ms）
- timingFunction： 参阅[animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)

### 动画名规范

为了使动画的声明更为方便，动画名称支持了占位符（\*）与替换（{a|b}}两种特殊的语法，用于在打开和关闭时自动替换为不同的动画名称。

例如当你需要打开动画为 fadeInDown，关闭动画使用 fadeOutUp 时，将占位符与替换语法结合则**一次配置就能实现**，而不需要在打开和关闭时都设置一次动画属性。

#### 替换

替换语法为`{A|B}`，类似于占位符，将会在打开时使用 A，关闭时使用 B。例如 name 为`fadeIn{Down|Up}`将在打开动画时使用`fadeInDown`动画，关闭时使用`fadeInUp`动画。

特殊使用： 如果你需要打开和关闭时完全不同的动画，那就直接声明一个替换作为动画名称。例如 name 为`{jello|wobble}`则表示打开时使用`jello`，关闭时使用`wobble`。

#### 占位符

占位符为`*`，你可以将占位理解为替换的语法糖。用于自动识别在打开动画时替换为`In`关闭时替换为`Out`。例如 name 为`fade*`将在打开动画时使用`fadeIn`动画，关闭时使用`fadeOut`动画。

<code src="../examples/animation.tsx" />
