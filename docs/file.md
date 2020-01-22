# 文件类

## file.choose

> 通知宿主开启文件选择

* H5端调用如下

```js
JSApi.file.choose({
	count:9,
	allowTypes:"*",
	shouldUpload:true,
	extra:{}
},function(files){
	/**
	 * 文件选择完成后的回调
	 */
});
```

* App端处理逻辑如下:

	* 接受到`action`=`file.choose`的操作指令
	* 接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 执行`JSApi.invokeH5(callbackid,"文件对象数组的json字符串")`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 选择文件的数量,默认1
	 */
	count: number;
	/**
	 * 允许选择的文件类型,默认"*"
	 * 
	 *  其他选择"ppt" | "pptx" | "doc" | "docx" | "xls" | "xlsx" | "xlsm" | "txt" | "pdf" | "zip" | "7z" | "rar"
	 */
	allowTypes: string | string[];
	/**
	 * 是否需要自动上传, 默认true
	 */
	shouldUpload: boolean;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

* App端调用H5时所传递文件对象数据结构如下

```js
{
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件大小,单位:KB
	 */
	size: number;
	/**
	 * 文件路径
	 */
	filePath: string;
	/**
	 * 文件类别标签
	 */
	tag?: string;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

## file.preview

> 通知宿主去开启文件预览功能

* H5端调用如下

```js
// 一般的文件预览
JSApi.file.preview({
	path:"http://xxxxx/文件名称.doc",
	name:"文件名称",
	ext:"doc",
	size: 100,
	extra:{}
});

// 带回调的文件预览
JSApi.file.preview({
	path:"http://xxxxx/文件名称.doc",
	name:"文件名称",
	ext:"doc",
	size: 100,
	extra:{}
},function(feedback){
	/**
	 * 阅读反馈
	 */
});
```

* App端处理逻辑

	* 接受到`action`=`file.choose`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid,feedbackInfo对应的json字符串 || "")`

* App端接收到的数据结构定义

```js
{	
	/**
	 * 文件路径
	 */
	path: string;
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件后缀
	 */
	ext?: string;
	/**
	 * 文件大小,单位:KB
	 */
	size?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

* App端返回给H5的`feedbackInfo`对象数据结构

```js
{
	/**
	 * 阅读进度
	 */
	progress?:string;
	/**
	 * 阅读到的页数
	 */
	pageNo?:number;
}
```

## file.download

> 通知宿主开启文件下载功能

* H5调用如下

```js
// 一般调用
JSApi.file.download({
	url:"http://xxxx/p.doc",
	name: "p";
	size: "100" ;
	ext: "doc";
	extra: {};
});

// 带回调的调用
JSApi.file.download({
	url:"http://xxxx/p.doc",
	name: "p";
	size: "100" ;
	ext: "doc";
	extra: {};
},function(downloadFileInfo){
	/**
	 * do something 
	 */
});
```

* App端处理逻辑

	* 接受到`action`=`file.download`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid,downloadFileInfo对应的json字符串)`


* App端接收到的数据结构定义

```js
{	
	/**
	 * 文件路径
	 */
	url: string;
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件后缀
	 */
	ext?: string;
	/**
	 * 文件大小,单位:KB
	 */
	size?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

* App端返回给H5的`downloadFileInfo`对象数据结构

```js
{
	/**
	 * 文件名称
	 */
	name: string;
	/**
	 * 文件后缀
	 */
	ext?: string;
	/**
	 * 文件大小,单位:KB
	 */
	size?: number;
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```