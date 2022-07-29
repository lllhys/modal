# Modal

## 全局注册/更新方法

### `Modal.init(config?, map?)`

初始化弹窗容器（请勿同时使用init和挂载ModalContainer组件）

#### 参数

##### config

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

##### map

{key: value} value为类组件/函数式组件

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| Record<string, ReactComponent \| ReactFunctionComponent> | - | key/value |


### `Modal.setGlobalConfig(config)`

更新全局配置

#### 参数

##### config

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

## 全局弹窗控制

### `Modal.openModal(pop, options?)`

创建一个弹窗实例并打开

#### 参数

##### pop

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| ReactComponent \| ReactFunctionComponent \| string | - | 弹窗组件/弹窗key |

##### options

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| zIndex | Number | 3000 | to control different modal levels |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |

### `Modal.closeModal(pop, options?)`

关闭一个弹窗

#### 参数

##### pop

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| ReactComponent \| ReactFunctionComponent \| string | - | 弹窗组件/弹窗key |

##### options

| Name | Type | Default | description |
| --- | --- | --- | --- |
| key | string | - | modal key |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |

### `Modal.createModal(pop: ModalPopType, options?: ModalCreateOptions)`

创建一个弹窗实例

#### 参数

##### pop

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| ReactComponent \| ReactFunctionComponent \| string | - | 弹窗组件/弹窗key |

##### options

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |

## 全局实例查找

### `Modal.getModalInstanceByMap(modal)`

通过弹窗组件查找对应的实例（如有多个则为最后一个）

#### 参数

##### pop

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| ReactComponent \| ReactFunctionComponent | - | 弹窗组件 |


### `Modal.getModalInstanceByName(name)`

通过map name查找对应的实例（如有多个则为最后一个）


#### 参数

##### name

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| string | - | 弹窗Map中的key |

### `Modal.getModalInstanceByKey(key)`

通过弹窗实例唯一key查找对应的实例


#### 参数

##### name

| 类型 | 默认值 | 解释 |
| --- | --- | --- |
| string | - | 弹窗唯一key |


