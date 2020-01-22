# Api

## JSApi.wrap

> 自定义Action

|参数名称|参数说明|参数类型|可选值|默认值|
|-|-|-|-|-|
|`action`| 交互操作的名称(点号分隔以区分层次) | `string` | -- | --|
|`handler`| 交互操作对应的处理函数 | `Function` | -- | --|

使用如下:

```js
JSApi.wrap("app.test",function(){
	console.log("haha");
});

JSApi.app.test(); // it will output: haha
```

## JSApi.on

> 自定义监听Action

|参数名称|参数说明|参数类型|可选值|默认值|
|-|-|-|-|-|
|`action`| 交互操作的名称(点号分隔以区分层次) | `string` | -- | --|

使用如下:

```js
JSApi.on("app.test");

// 之后可以如下调用
JSApi.onAppTest({
	success:function(){}
	error:function(){}
});

```

## JSApi.invokeH5

> 提供给宿主通知H5

|参数名称|参数说明|参数类型|可选值|默认值|
|-|-|-|-|-|
|`actionOrCbId`| 交互操作的名称或者callbackid | `string` | -- | --|
|`dataJSON`| 当前操作需要传递给H5的参数|`string`|--|--

使用如下:

```js
JSApi.invokeH5('view.refresh');

JSApi.invokeH5("shared',"{\"status\":true,\"scope\":\"wx\"}");
```