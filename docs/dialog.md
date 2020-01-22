# 弹窗类

## dialog.toast

> 通知宿主去弹出提示信息

* H5调用如下：

```js
// 单纯的弹出
JSApi.dialog.toast("删除成功!");

// 待提示信息隐藏后回调操作
JSApi.dialog.toast("删除成功!",function(){
	/**
	 *  toast closed
	 */
});

// 个性化提示
JSApi.dialog.toast({
	content:"删除成功!",
	iconUrl:"",
	iconBase64:""	
});

// 带回调的个性化提示
JSApi.dialog.toast({
	content:"删除成功!",
	iconUrl:"",
	iconBase64:""	
},function(){
	/**
	 *  toast closed
	 */
});

```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.toast`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理

* App端接收到的对象数据结构定义如下:

```js
{
	/**
	 * 提示框显示的内容
	 */
	content: string;
	/**
	 * 图标url
	 */
	iconUrl?: string;
	/**
	 * 图标对应的base64
	 */
	iconBase64?: string;
	/**
	 * 是否折行展示
	 */
	isBreak?: boolean;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

## dialog.alert

> 通知宿主弹出提示框

* H5调用如下:

```js
// 默认提示
JSApi.dialog.alert("你好,我是alert");

// 带回调的提示
JSApi.dialog.alert("你好,我是alert",function(){
	/**
	 * 点击确定按钮后的回调
	 */
});

// 不带回调的个性化提示
JSApi.dialog.alert({
	titie:"自定义标题",
	content:"你好,我是alert",
	okText:"ok",
	extra:{}
});

// 带回调的个性化提示
JSApi.dialog.alert({
	titie:"自定义标题",
	content:"你好,我是alert",
	okText:"ok",
	extra:{}
},function(){
	/**
	 * 点击确定按钮后的回调
	 */
});


```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.alert`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理


* App端接收到的对象数据结构定义如下:

```js
{
	/**
	 * 提示框显示的内容
	 */
	content: string;
	/**
	 * 提示框显示的标题,默认值：提示
	 */
	title?: string;
	/**
	 * 提示框确定按钮的文本,默认值: 确定
	 */
	okText?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```


## dialog.confirm

> 通知宿主显示确认框

* H5调用如下:

```js
// 默认的确认提示框
JSApi.dialog.confirm("是否确认删除?",function(activeBtnConfig){
	
});

// 个性化的确认提示框
JSApi.dialog.confirm({
	content:"是否确认删除?",
	title:"删除提示"
},function(activeBtnConfig){

})
```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.confirm`的操作指令
	* 接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 点击提示框的按钮之後，利用callbackid去通知H5执行回调函数

* App端接收到的对象数据结构定义如下:

```js
{
	/**
	 * 确认框显示的内容
	 */
	content: string;
	/**
	 * 确认框显示的标题,默认值: 提示
	 */
	title?: string;
	/**
	 * 确认框确定按钮的文本,默认值: 确定
	 */
	okText?: string;
	/**
	 * 确认框的取消文本,默认值: 取消
	 */
	cancelText?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

## dialog.showLoading

> 通知宿主显示loading对话框

* H5调用如下

```js
JSApi.dialog.showLoading();
JSApi.dialog.showLodaing("加载中...");
```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.showLoading`的操作指令
	* 执行原生代码的处理

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 自定义的loading显示文本
	 */
	text:string;
}
```

## dialog.hideLoading

> 通知宿主关闭loading对话框

* H5调用如下

```js
JSApi.dialog.hideLoading();
```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.hideLoading`的操作指令
	* 执行原生代码的处理

## dialog.show

> 通知宿主显示对话框

* H5调用如下

```js

// 一般的对话框
JSApi.dialog.show("我是一个dialog",function(activeBtnConfig){
	// activeBtnConfig的数据结构，同dialog.confirm的定义
});

// 个性化对话框
JSApi.dialog.show({
	content:"我是一个dialog",
	title:"我是dialog的标题",
	btns:[
		{
			cmd:"ok",
			text:"确定",
			type:"primary"
		}
	]
},function(activeBtnConfig){
	// activeBtnConfig的数据结构，同dialog.confirm的定义
})

```

* App端处理逻辑如下:

	* 接受到`action`=`dialog.show`的操作指令
	* 接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 点击对话框的按钮之後，利用callbackid去通知H5执行回调函数


* App端接收到的对象数据结构定义如下:

```js
{
	/**
	 * 弹出框显示的内容
	 */
	content: string;
	/**
	 * 弹出框显示的标题
	 */
	title?: string;
	/**
	 * 弹出框的按钮设置
	 *
	 * @type {activeBtnConfig[]}
	 */
	btns: activeBtnConfig[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

### activeBtnConfig

* App在弹出对话框之后，点击按钮会回调H5，并携带对应数据结构的参数,该数据结构统一为avtiveBtnConfig, 它的结构定义如下:

```js
{
	/**
	 * 操作按钮的命令标识
	 */
	cmd: string;
	/**
	 * 按钮显示文本
	 */
	text?: string;
	/**
	 * 按钮的类型
	 * 
	 *  "error" | "warn" | "primary" | "success" | "default"
	 */
	type?: string;
}
```