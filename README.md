# rc-dialog

react dialog component

[![NPM version][npm-image]][npm-url] [![dumi](https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square)](https://github.com/umijs/dumi) [![build status][github-actions-image]][github-actions-url] [![Test coverage][coveralls-image]][coveralls-url] [![Dependencies][david-image]][david-url] [![DevDependencies][david-dev-image]][david-dev-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/rc-dialog.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-dialog
[github-actions-image]: https://github.com/react-component/dialog/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/dialog/actions
[circleci-image]: https://img.shields.io/circleci/react-component/dialog/master?style=flat-square
[circleci-url]: https://circleci.com/gh/react-component/dialog
[coveralls-image]: https://img.shields.io/coveralls/react-component/dialog.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/dialog?branch=master
[david-url]: https://david-dm.org/react-component/dialog
[david-image]: https://david-dm.org/react-component/dialog/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/dialog?type=dev
[david-dev-image]: https://david-dm.org/react-component/dialog/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-dialog.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-dialog
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-dialog
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-dialog

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
