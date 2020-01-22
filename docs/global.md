# 其他公共

## share

> 通知宿主执行分享操作

* H5端调用如下

```js
// 一般调用
JSApi.share({
	title:"标题",
	desc:"描述",
	url:"链接地址",
	iconUrl:"显示的图标url",
	iconBase64:"显示的图标对应的base64串",
	wxUrl:"专门用于启动微信授权回调的分享地址",
	scope:["wx","wxMoment"],
	extra:{}
});

// 带回调的调用
JSApi.share({
	title:"标题",
	desc:"描述",
	url:"链接地址",
	iconUrl:"显示的图标url",
	iconBase64:"显示的图标对应的base64串",
	wxUrl:"专门用于启动微信授权回调的分享地址",
	scope:["wx","wxMoment"],
	extra:{}
},function(sharedResult){
	/**
	 * do somethine
	 */
});
```

* App端处理逻辑

	* 接受到`action`=`share`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid,sharedResult对应的json字符串)`

* App端接收到的对象数据结构如下

```js
{
	/**
	 * 分享标题
	 */
	title: string;
	/**
	 * 分享链接的描述
	 */
	desc?: string;
	/**
	 * 待分享的链接地址
	 */
	url: string;
	/**
	 * 分享的图标链接地址
	 */
	iconUrl?: string;
	/**
	 * 分享的图标对应的base64字符串
	 */
	iconBase64?: string;
	/**
	 * 专门用于启动微信授权回调的分享地址
	 */
	wxUrl?: string;
	/**
	 * 可能出现的值如下:
	 * 
	 *  wx:微信
	 *  wxMoment: 微信朋友圈
	 *  qq: QQ,
	 *  qZone: QQ空间
	 *  weibo: 微博
	 *  dingtalk: 钉钉
	 *  copyLink: 复制链接
	 * 
	 * 例如: ["wx","wxMoment",....]
	 * 
	 */
	scopes: string[];
	/**
	 * 针对个性化业务的扩展使用
	 */
	extra?: any;
}
```

* App端通知H5的`sharedResult`对象数据结构如下

```js
{
	/**
	 * 分享是否成功
	 *
	 * @type {boolean}
	 */
	status: boolean;
	/**
	 * 可能出现的值如下:
	 * 
	 *  wx:微信
	 *  wxMoment: 微信朋友圈
	 *  qq: QQ,
	 *  qZone: QQ空间
	 *  weibo: 微博
	 *  dingtalk: 钉钉
	 *  copyLink: 复制链接
	 * 
	 */
	scope: string;
	/**
	 * 接收到此分享信息的接口者标识
	 *
	 * @type {string}
	 */
	reciever?: string;
}
```

## sharePrepare

> 通知宿主提前准备待分享的内容

具体的调用形式同[share](#share),只不过sharePrepare不需要回调;


## shared (->H5)

> 宿主主动通知H5分享结果

* 出现场景

	* 用户自己主动点击右上角的分享按钮

* App端调用如下

```js
JSApi.invokeH5("shared",sharedResult);
```

* H5端接收如下

```js
JSApi.onShared({
	success(sharedResult){

	},
	error(err){

	}
})
```

## softInputOpen

> 通知宿主去主动开启软键盘

* H5端调用如下

```js
JSApi.softInputOpen();
JSApi.softInputOpen(function(){
	/**
	 * do something
	 */
});
```

* App端处理逻辑

	* 接受到`action`=`softInputOpen`的操作指令
	* 判断是否接收到H5传递的callbackid,并缓存下来
	* 执行原生代码的处理
	* 如果存在callbackid,则执行`JSApi.invokeH5(callbackid,sharedResult对应的json字符串)`