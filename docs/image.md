# 图像类

## image.choose

> 通知宿主打开图片选择界面

* H5调用如下:

```js
JSApi.image.choose({
	count:9,
	sizeType:["original"],
	sourceType:["album","camera"],
	extra:{}
},function(chooseImgs:string[]){
	/**
	 * do something
	 */
})
```

* App端处理逻辑

	* 接受到`action`=`image.choose`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 调用`JSApi.invokeH5(callbackid,'["imgurl1","imgurl2"]')`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 选择图片的数量,默认1，最大9
	 */
	count: number;
	/**
	 * 指定是原图还是压缩图，默认: ["original","compressed"]
	 */
	sizeType: string[];
	/**
	 * 指定来源是相册还是相机，默认: ["album","camera"]
	 *
	 */
	sourceType: string[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```


## image.preview

> 通知宿主开启图片预览功能

* H5端调用如下

```js
JSApi.image.preview({
	current:"http://xxxxxx.png",
	currentIndex:0,
	urls:["http://1.png","http://xxx2.png",...],
	titles:["图片1","图片2","图片3"],
	extra:{}
});
```

* App端处理逻辑

	* 接受到`action`=`image.preview`的操作指令
	* 执行原生代码的处理

* App端接收到的对象数据结构如下:

```js
{
	/**
	 * 当前展示的图片地址
	 */
	current: string;
	/**
	 * 当前图片对应的索引
	 */
	currentIndex: number;
	/**
	 * 需要预览的图片链接列表
	 */
	urls: string[];
	/**
	 * 图标预览的标题
	 */
	titles?: string[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

## image.save

> 通知宿主保存图片至本地

* H5端调用如下

```js
// 传递图片base64串
JSApi.image.save("base64:xxxxxx");

// 传递图片url
JSApi.image.save("http://xx1.png");

// 带回调的保存
JSApi.image.save("http://xxx1.png",function(isOk){
	/**
	 * isOk: true=保存成功 false=保存失败
	 */
})

```

* App端处理逻辑

	* 接受到`action`=`image.save`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 调用`JSApi.invokeH5(callbackid,true|false)`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 待保存的图片地址或其对应的base64串
	 */
	imgUrlOrBase64:string;
}
```