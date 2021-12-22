# rc-dialog

A mobile side modal component, to achieve a complete life cycle of the object, built-in commonly used keyframe animation, while providing an event listener callback.

## Example

http://localhost:8007/examples/

online example: https://dialog.react-component.vercel.app/

## Install

```shell
yarn add @lllhys/modal
# or
npm install @lllhys/modal
```

## Usage

This is a simple demonstration of how to use `Modal`, please read the documentation if you want to learn more.

```ts
import Modal, {ModalContainer, IModalProps} from '@lllhys/modal';

interface IProps {

}

const ModalFC = (props: IModalProps<IProps>) => {

}

// App.jsx

const App = () => {
  const handleClick = () => {
    const modal = Modal.createModal(ModalFC);
  }
  return <>
    <button onClick = {handleClick} > open < /button>
    < ModalContainer / >
    </>
}


```
