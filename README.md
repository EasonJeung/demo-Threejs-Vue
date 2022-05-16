# A demo for [Three.js](http://threejs.org) and [Vue.js](https://vuejs.org)

使用 Vue 和 Three.js 创建一个简单的范例。

Vue 单组件文件虽然有利于代码维护，但是它的组件结构比较简单，不够灵活。

特别是当我写 Three.js 的时候，在 Script 标签中写 JavaScript 代码实在是太痛苦了。

于是我决定引入额外的 js 文件，来把 Three.js 和 Vue.js 的代码分离。

## 代码结构
在 `src/components/` 中，有一个 `IntroduceModel.vue` 组件，用来把 Three.js 的代码引入到页面中。

为了简单起见，我直接在 `src/components/` 下创建了 Three.js 文件(`model.js` 和 `model_tesla.js`)，在正式开发中请不要这样做。
- `model.js` 文件创建了一个简单的方块模型，用来演示 Three.js 的基本功能。
- `model_tesla.js` 文件则导入了一个网上的模型，用来演示 Three.js 的更复杂的功能。

默认使用 `model.js` 文件，如果需要使用 `model_tesla.js` 文件，请在 `src/components/IntroduceModel.vue` 中注释掉
```js
modelSrcipt.src = '/src/components/model.js';
```
并取消掉 `model_tesla.js` 部分的注释。
```js
modelSrcipt.src = '/src/components/model_tesla.js';
```
## 使用
> Make sure you have node.js (version >= 12) installed on your computer.
- 拉取本项目
- 安装依赖： `npm install` 
- 运行 demo： `npm run demo`
- 查看 demo： `http://localhost:3000`

## 参考
- [Three.js](http://threejs.org)
- [How to load an external script in Vue component?](https://vue-view.com/how-to-load-an-external-script-in-vue-component/)
- [Vue+Three.js，新手demo](https://zhuanlan.zhihu.com/p/333615381)