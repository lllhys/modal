# @lllhys/modal

A mobile side modal component, to achieve a complete life cycle of the object, built-in commonly used keyframe animation, while providing an event listener callback.

## Docs

You can see our docs on https://lllhys.github.io/modal/

## Install

```shell
yarn add @lllhys/modal
# or
npm install @lllhys/modal
```

## Usage

This is a simple demonstration of how to use `Modal`, please read the documentation if you want to learn more.[Doc](https://lllhys.github.io/modal/)

```tsx | pure
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
