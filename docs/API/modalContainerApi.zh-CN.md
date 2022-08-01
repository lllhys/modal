# ModalContainer组件

弹窗组件容器，挂载在React中（请勿与Modal.init同时使用）

## 参数

### config

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

### map

{key: value} value为类组件/函数式组件

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| Record<string, ReactComponent \| ReactFunctionComponent> | - | key/value |
