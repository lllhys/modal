# ModalObject

## Constructor Options

构造函数参数

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| key | String |  | The keyword used to find popovers must be unique |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| zIndex | Number | 3000 | to control different modal levels |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |

## Functions

对象方法

### `open(options?)`

用户打开当前弹窗实例

#### 参数

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| zIndex | Number | 3000 | to control different modal levels |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |

### `close(options?)`

用户关闭当前弹窗实例

#### 参数

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |


### `setOptions(options)`

更新弹窗属性

#### 参数

| Name | Type | Default | description |
| --- | --- | --- | --- |
| props | Object | {} | modal props |
| animate | {name: string, duration: number, timingFunction: string} | {name: “zoom{}”, duration: 400} | open and close animation, supporting the use of the`{}` symbol for the coordination of open and close animation |
| mask | Boolean | true | to control whether there is a mask |
| maskClosable | Boolean | true | to control whether you can close modal when click mask |
| maskStyle | Object | {backgroundColor: “rgba(100, 100, 100, 0.5)”} | to control mask style |
| zIndex | Number | 3000 | to control different modal levels |
| immediately | Boolean | true | close 和 open 时控制是否直接打开 |


### `setProps<T = any>(props: T)`

更新弹窗组件的props
