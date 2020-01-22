# 快速开始

方便原生App、微信、钉钉等应用中与H5进行通信的接口对接层

## 适用场景

- 适用在混合应用中H5与App之间的通信
- 适用微信、钉钉等已存在jssdk应用中的二次封装，从而保证对上层应用项目的接口统一

## 兼容性

|IOS|Android|
|-|-|
|>7|>=4.4.4|

## 优势

- 高度可定制化
- 统一上层应用接口,降低项目在多端环境下对接的复杂度
- 支持Typescript,配合VSCode可以实现体验良好的智能提示

## 原理

通过一套`Action`规则约定,来实现操作的映射;

针对原生App端, 此宿主端会在内部JSContext中注入一个供H5可以全局访问的JSBridge对象,并且该对象提供了唯一一个操作方法,具体代码定义如下:

```js
/**
 *  android内部提供的注入到JS全局上下文中的对象方法
 *  
 *  @param {String} action 操作名称
 *  @param {String} dataJSONStr 传递的数据(JSON字符串形式，需要执行JSON的反序列化)，默认空字符串
 *  @param {String} callbackid 客户端需要回调操作的会传入此回调函数的唯一标识，默认			传入空字符串
 */
JSBridge.invoke = function(action,dataJSONStr,callbackid){
	/**
	 * 
	 * do something
	 * 
	 */
}

/**
 *  IOS内部提供的注入到JS全局上下文中的对象方法
 *  
 *  @param {Object} payload action操作携带的参数
 *  @prop {String} payload.action 操作名称
 *  @prop {String} payload.data 传递的数据(JSON字符串形式，需要执行JSON的反序列化)，默认空字符串
 *  @prop {String} payload.callbackid 客户端需要回调操作的会传入此回调函数的唯一标识，默认空字符串
 */
JSBridge.invoke = function(payload){

	/**
	 * 
	 * do something
	 * 
	 */

}

```

## 安装

### `项目内安装如下`

```bash
yarn add @jsapi/core 

yarn add @jsapi/dingtalk

yarn add @jsapi/wx
```

### `CDN引入`

TODO

## `使用`

npm方式引入

```javascript

import JSApi from "jsapi";

/**
 * 
 * then use JSApi to do something 
 * 
 */

```

